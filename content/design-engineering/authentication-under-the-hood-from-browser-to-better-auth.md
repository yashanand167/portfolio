---
title: "Authentication Under the Hood: From Browser to Better Auth"
description: "What actually happens when you log in, how browsers maintain identity, and what an authentication library really abstracts away."
date: 2026-08-27
category: design-engineering
tags:
  - authentication
  - web development
  - security
  - better-auth
  - system design
published: true
cover:
---

When I first started building web applications, authentication felt like a UI problem. I would build a form with an email input, a password input, and a submit button. When a user clicked "Log in", I assumed the magic happened somewhere behind that button.

As I built more complex projects, like Folio OS, I realized I didn't fully understand what was happening under the hood. What actually happens when a credential is sent over the network? How does a browser stay logged in across page reloads? Why doesn't the server forget who I am between requests? And when I eventually pulled in an authentication library like Better Auth, what was it actually doing for me?

Rather than treating authentication as a black box or blindly relying on external APIs, I wanted to trace the entire lifecycle from first principles—starting at the browser level and ending at the abstractions provided by modern tools.

---

## 1. The Login Button Is Just the Beginning

When a user opens a login form and clicks "Log in", nothing magical happens at the network boundary. The browser collects the text inside the input fields and formats it into a standard HTTP POST request.

```http
POST /api/auth/sign-in HTTP/1.1
Host: folio-os.dev
Content-Type: application/json
Content-Length: 54

{
  "email": "yash@example.com",
  "password": "supersecretpassword"
}
```

At its core, authentication begins as an ordinary payload sent over an encrypted HTTPS connection. The high-level journey of that initial login attempt looks like this:

```
Browser
   │
   ▼
HTTPS Request  (POST /api/auth/sign-in)
   │
   ▼
Server
   │
   ▼
Credential Verification  (Find user & check password hash)
   │
   ▼
Session Creation  (Generate random session ID in database)
   │
   ▼
Cookie Header  (Set-Cookie: session=abc123...)
   │
   ▼
Browser  (Stores cookie in jar for subsequent requests)
```

Before reaching for any auth framework, it is important to realize that every authentication system on the web boils down to this fundamental handshake.

---

## 2. HTTP Doesn’t Remember Me

To understand why web authentication requires work, we have to look at how HTTP operates.

HTTP is stateless. By default, every request sent from a client to a server is executed in complete isolation. The protocol has no native memory of previous requests or established connections.

```
Request 1  ──►  GET /dashboard      ──►  Server (Who is this?)
Request 2  ──►  GET /api/portfolio  ──►  Server (Who is this?)
Request 3  ──►  GET /settings       ──►  Server (Who is this?)
```

If you send a POST request with your email and password, the server might verify your credentials and respond with a `200 OK`. But one second later, when your browser makes a GET request for `/api/portfolio`, the server has already forgotten who sent the previous request.

TCP connections can close, IP addresses can change, and multiple users can make requests behind the same NAT router or VPN. The server cannot rely on network transport metadata to identify users.

For an application to recognize a returning user, the client must attach some proof of identity to every single subsequent HTTP request. The question then becomes: *How does the browser store and attach that proof automatically?*

---

## 3. What Is a Cookie Actually?

Browsers provide several client-side storage mechanisms, including `localStorage`, `sessionStorage`, and IndexedDB. But for authenticating standard HTTP requests, cookies remain the primary mechanism.

A cookie is not a security cipher or an authentication mechanism by itself. It is simply a key-value storage mechanism managed directly by the browser network engine, populated by the server via an HTTP response header.

When a server successfully verifies credentials, it returns an HTTP response containing a `Set-Cookie` header:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session_token=abc123xyz789; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=604800

{
  "success": true
}
```

When the browser receives this response, its internal network layer parses the `Set-Cookie` directive and stores the pair in its internal "cookie jar". 

From that moment on, whenever the browser makes a request to a matching domain and path, it automatically includes the stored value in the request's `Cookie` header:

```http
GET /api/portfolio HTTP/1.1
Host: folio-os.dev
Cookie: session_token=abc123xyz789
```

Here is how that lifecycle operates end-to-end:

```
Server Response
   │  Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
   ▼
Browser Cookie Storage (Cookie Jar)
   │  [Stored under domain: folio-os.dev]
   ▼
Future HTTP Request
   │  Automatic attachment
   ▼
Request Header
   │  Cookie: session=abc123
   ▼
Server Application
```

### Understanding Cookie Directives

The security of cookie-based identification depends entirely on the flags attached during creation:

- **`HttpOnly`**: Blocks client-side JavaScript from accessing the cookie via `document.cookie`. If an attacker executes a Cross-Site Scripting (XSS) payload on your page, they cannot read or exfiltrate an `HttpOnly` session cookie.
- **`Secure`**: Instructs the browser to send the cookie exclusively over encrypted HTTPS connections, preventing plaintext exposure on unencrypted networks.
- **`SameSite=Lax` / `Strict`**: Controls whether the cookie is attached during cross-site requests. `Lax` prevents the cookie from being sent on cross-origin POST requests (such as form submissions from malicious sites), serving as a defense against Cross-Site Request Forgery (CSRF).
- **`Path` & `Domain`**: Restrict the URL scope where the browser will attach the cookie.
- **`Max-Age` / `Expires`**: Dictate when the browser must purge the cookie from storage.

Cookies do not know what a "user" is. They are just automated key-value transporters.

---

## 4. Where Does the Password Go?

When a user creates an account or submits their password during sign-in, the plaintext password must never be stored directly in a database. If a database export or leak occurs, plaintext passwords compromise every account across the platform (and any other service where users reused that password).

Instead, servers use a one-way password hashing algorithm.

```
Plaintext Password ("supersecretpassword")
   │
   ▼
Password Hashing Algorithm (e.g., Argon2id + Salt)
   │
   ▼
Password Hash ("$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$...")
   │
   ▼
Database Storage
```

### Hashing vs. Encryption

It is important to clarify the distinction between encryption and hashing:

- **Encryption** is a two-way mathematical operation. Given a ciphertext and a secret key, you can decrypt the payload back into its original plaintext.
- **Hashing** is a one-way transformation. It maps an arbitrary string of bytes to a fixed-length fingerprint. It is mathematically impractical to reverse a cryptographic hash back into its input.

When a user logs in later, the application does not "decrypt" the stored hash. Instead, it takes the incoming plaintext password, runs it through the same hashing algorithm using the stored salt, and compares the resulting hash against the stored hash:

```
Submitted Password ("supersecretpassword")
       │
       ▼
Run through Hashing Algorithm (with stored Salt)
       │
       ▼
New Hash Calculation
       │
       ▼
Compare with Database Hash ──► Match? ──► [Allow / Deny]
```

Modern password hashing algorithms like **Argon2id** and **bcrypt** are intentionally designed to be computationally expensive. They incorporate memory hardness and configurable work factors to slow down brute-force and rainbow table attacks.

---

## 5. Sessions: How the Server Remembers Me

Once the server verifies that a password matches its stored hash, it needs a way to remember that verification across future requests. This is where server-side sessions come in.

A session is an association stored on the server that connects a random, unpredictable identifier to a specific user account.

```
Random Session Identifier (Stored in Cookie):
"abc123xyz789"

Server Session Record (Stored in Database/Redis):
┌─────────────────────────────────────────────────────────────┐
│ Session ID: abc123xyz789                                    │
│ User ID:    usr_98765                                       │
│ Created:    2026-08-27T18:00:00Z                            │
│ Expires:    2026-09-03T18:00:00Z                            │
│ IP / Agent: 192.168.1.1 / Mozilla (Macintosh)                │
└─────────────────────────────────────────────────────────────┘
```

When the client sends a request containing the session cookie:

```http
GET /api/profile HTTP/1.1
Host: folio-os.dev
Cookie: session_token=abc123xyz789
```

The server follows a lookup chain:

```
Cookie Received (session_token=abc123xyz789)
   │
   ▼
Extract Session ID
   │
   ▼
Query Session Store / Database
   │
   ▼
Validate Expiration Date & Active Status
   │
   ▼
Retrieve Associated User Record (usr_98765)
   │
   ▼
Attach User Object to Application Context
```

The session ID stored in the browser cookie acts as a reference token. It carries no user data itself; it simply points to a stateful record controlled entirely by the server.

---

## 6. What Happens on Every Authenticated Request?

To see how these concepts unite, let's trace a single authenticated HTTP request end-to-end when a user loads their portfolio inside Folio OS.

```
User clicks "View Portfolio"
   │
   ▼
Browser constructs HTTP Request:
GET /api/portfolio HTTP/1.1
Host: folio-os.dev
Cookie: session_token=abc123xyz789
   │
   ▼
Network Transmission (TLS / HTTPS Encrypted)
   │
   ▼
Application Server / Middleware receives request
   │
   ▼
1. Extract cookie header ("session_token=abc123xyz789")
   │
   ▼
2. Query Session Table in Database
   └── Found session record for user_123
   └── Check if expiresAt > current_time (Valid)
   │
   ▼
3. Query User Table in Database
   └── Fetch user profile (id: user_123, email: yash@example.com)
   │
   ▼
4. Pass Context to API Handler
   └── req.user = { id: "user_123", email: "yash@example.com" }
   │
   ▼
5. Perform Authorization & Data Fetching
   └── SELECT * FROM portfolios WHERE user_id = 'user_123'
   │
   ▼
6. Format JSON Response & Send to Browser
```

Every single link in this chain must execute cleanly. If the cookie is missing, the session is expired, or the user record is soft-deleted, the chain halts and returns an HTTP status code (such as `401 Unauthorized`).

---

## 7. Authentication vs. Authorization

It is common to conflate authentication and authorization, but they address two entirely separate questions:

- **Authentication**: *Who are you?* (Verifying identity via credentials and sessions).
- **Authorization**: *Are you allowed to perform this specific action on this specific resource?*

Just because a request passes authentication does not mean it should succeed.

Consider a multi-tenant portfolio system like Folio OS:

```typescript
// Example Authorization Check in an API Handler
export async function GET(request: Request, { params }: { params: { portfolioId: string } }) {
  // 1. AUTHENTICATION: Who is making this request?
  const session = await getSession(request);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. AUTHORIZATION: Does user_123 own portfolio_456?
  const portfolio = await db.portfolio.findUnique({
    where: { id: params.portfolioId }
  });

  if (!portfolio || portfolio.userId !== session.user.id) {
    // Authenticated, but not authorized to access this resource
    return new Response("Forbidden", { status: 403 });
  }

  return Response.json(portfolio);
}
```

 Authentication confirms identity (`session.user.id === "user_123"`). Authorization enforces business logic and access control rules.

---

## 8. What If I Built Authentication Myself?

If you decide to hand-roll an authentication system without using a library, the scope of responsibilities expands rapidly beyond a simple login handler.

Here is what you have to personally write, test, and maintain:

1. **User Sign-up & Password Storage**: Input sanitization, password strength validation, salt generation, and Argon2id/bcrypt parameter tuning.
2. **Credential Verification**: Preventing timing attacks during hash comparisons (using constant-time comparison algorithms).
3. **Session Management Engine**: Generating cryptographically secure random session tokens (e.g., using `crypto.getRandomValues`), storing session records, and handling expiration sweeps.
4. **Cookie Serialization**: Correctly building header strings with `HttpOnly`, `Secure`, `SameSite`, and `Domain` options across environments.
5. **Session Revocation**: Supporting "Log out of all devices" by invalidating session records across database clusters.
6. **Password Reset Flows**: Generating short-lived, single-use reset tokens, sending emails, and invalidating existing sessions upon password changes.
7. **Email Verification**: Managing verification tokens and state flags.
8. **Rate Limiting & Abuse Prevention**: Throttling failed sign-in attempts per IP and account to block brute-force scripts.
9. **OAuth 2.0 / OIDC Integration**: Handling state parameters, PKCE code verifiers, redirect URIs, and provider token exchanges.

Building authentication yourself isn't impossible, but security-sensitive infrastructure requires constant vigilance, edge-case testing, and continuous maintenance.

---

## 9. So I Used Better Auth

When building my application, I wanted a clear boundary between my business logic and the underlying security primitives. I chose **Better Auth**, an open-source TypeScript-first authentication framework.

Instead of writing custom session engines, cookie builders, and hashing pipelines, I configured Better Auth directly within my project structure:

```typescript
// lib/auth.ts - Better Auth Server Configuration
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

And exposed the handler to the framework's router:

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);
```

This configuration connects Better Auth to my PostgreSQL database via Drizzle ORM and enables email/password authentication endpoints under `/api/auth/*`.

---

## 10. What Better Auth Actually Does

Better Auth is not a black-box cloud service running on someone else's server. It is a set of TypeScript utilities running inside my own Node.js / Next.js server context.

When a client initiates a sign-in, here is the exact execution flow managed by Better Auth:

```
User Action (Submits Form)
   │
   ▼
POST /api/auth/sign-in/email
   │
   ▼
Better Auth Route Handler (app/api/auth/[...all]/route.ts)
   │
   ▼
1. Validate Incoming Payload Schema
   │
   ▼
2. Query Database for User (via Drizzle Adapter)
   │
   ▼
3. Verify Password Hash (Argon2id / bcrypt comparison)
   │
   ▼
4. Generate Secure Session Token
   │
   ▼
5. Insert Session Record into Database `session` table
   │
   ▼
6. Format & Append `Set-Cookie` Header to HTTP Response
   │
   ▼
HTTP 200 Response sent to Browser (with Cookie)
```

And when a subsequent authenticated request arrives at the server:

```
Browser Request (GET /api/portfolio)
   │
   ▼
Cookie Header parsed automatically
   │
   ▼
Better Auth `auth.api.getSession({ headers })`
   │
   ▼
Database Session Lookup & Expiry Validation
   │
   ▼
Returns Session & User Object
   │
   ▼
My Application Code executes portfolio query using validated user ID
```

Better Auth coordinates the primitives we examined earlier: HTTP POST payloads, hash verification, database session insertion, and cookie serialization.

---

## 11. What Better Auth Abstracts Away

Using a library gives security-sensitive implementation details a clear boundary. Here is how building auth manually compares to using Better Auth:

| Responsibility | Hand-Rolled Implementation | Better Auth Implementation |
| :--- | :--- | :--- |
| **Auth Endpoints** | Manually writing API route handlers for login, signup, logout, and refresh. | Handled automatically via `auth.handler`. |
| **Password Hashing** | Importing hashing libraries, managing salts, work factors, and timing safety. | Managed internally using secure hashing defaults. |
| **Session Generation** | Writing custom cryptographically secure random string generators. | Managed automatically during session creation. |
| **Cookie Formatting** | Manually constructing `Set-Cookie` header strings with environmental flags. | Configured and set automatically per environment. |
| **Session Lookup** | Writing raw SQL queries to check session expiry and retrieve user objects. | Abstracted via `auth.api.getSession()`. |
| **OAuth Integration** | Manually implementing PKCE code verifiers, state checks, and token swaps. | Enabled via provider plugins (`google`, `github`, etc.). |
| **Database Sync** | Writing custom database schemas and migration scripts for auth tables. | Provided via database adapters (Drizzle, Prisma, Kysely). |

---

## 12. What Better Auth Does NOT Abstract

While Better Auth handles low-level security mechanics, it does not make application-level product decisions. 

```
Better Auth System
    │
    ▼
"Who is this user?" (Authenticates Identity)
    │
    ▼
My Application Code
    │
    ▼
"What can this user do?" (Authorizes Access)
"How should the UI react?" (UX Design)
```

The application developer remains responsible for:

- **Route Protection Logic**: Deciding which pages and API routes require authentication.
- **Resource Authorization**: Verifying whether `user_123` has permission to edit `portfolio_456`.
- **Session Expiry UX**: Deciding whether to show an inline modal re-authentication prompt or perform a page redirect when a session expires.
- **Draft Preservation**: Saving unsaved form data or canvas state to local storage when network requests fail due to authentication timeouts.
- **Step-Up Verification**: Determining which sensitive operations (e.g., deleting an account, changing billing details) require re-entering a password or passkey.

Better Auth answers *who the user is*. Your application logic decides *what happens next*.

---

## 13. Where Does the Database Fit?

Because Better Auth runs directly within my infrastructure, session state and identity data live in my primary PostgreSQL database.

The standard entity schema consists of four core tables:

```
┌─────────────────────────────────────────────────────────┐
│ User Table                                              │
│ - id: string (Primary Key)                              │
│ - email: string (Unique)                                │
│ - name: string                                          │
│ - emailVerified: boolean                                │
│ - createdAt: timestamp                                  │
│ - updatedAt: timestamp                                  │
└────────────────────────────┬────────────────────────────┘
                             │ 1
                             │
                             │ N
┌────────────────────────────┴────────────────────────────┐
│ Session Table                                           │
│ - id: string (Primary Key)                              │
│ - userId: string (Foreign Key -> User.id)               │
│ - token: string (Unique Session Identifier)             │
│ - expiresAt: timestamp                                  │
│ - ipAddress: string                                     │
│ - userAgent: string                                     │
└─────────────────────────────────────────────────────────┘
```

Alongside `User` and `Session`, two additional tables support extended authentication flows:

- **`Account`**: Stores OAuth provider links (e.g., Google or GitHub account IDs, access tokens, and refresh tokens) associated with a user ID.
- **`Verification`**: Stores single-use tokens for email verification, magic link logins, and password reset requests.

Persisting sessions in the primary database ensures that if the application server restarts, no active user sessions are lost. It also allows immediate session revocation across all devices by executing a single `DELETE FROM session WHERE user_id = $1` query.

---

## 14. What Happens When the App Gets Bigger?

As traffic increases, you may need to scale your application horizontally by running multiple server instances behind a load balancer.

```
                  Client Request (Cookie: session=abc123)
                             │
                             ▼
                       Load Balancer
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   Server Instance A                 Server Instance B
            │                                 │
            └────────────────┬────────────────┘
                             │ (Session Verification Query)
                             ▼
                 Centralized Database / Redis
```

Because session identifiers are stored in a shared database rather than in individual server memory, any application instance can receive a request, extract the cookie, verify the session token against the shared store, and process the request. 

Understanding authentication as a combination of browser cookies and centralized session storage makes horizontal scaling straightforward.

---

## 15. The Real Value of an Authentication Library

Using an authentication library like Better Auth doesn't mean you don't need to understand authentication. It means you don't need to personally maintain every security-sensitive implementation detail.

My mental model shifted through distinct stages:

1. **Initial View**: *"I'm just adding a login form."*
2. **First-Principles View**: *"I'm actually building an identity system across HTTP, cookies, sessions, and hashes."*
3. **Engineering Pragmatism**: *"I don't need to manually implement every cryptographic and session primitive myself."*
4. **Final Realization**: *"I need to understand what the abstraction is doing underneath so I can configure and use it correctly."*

A good library doesn't eliminate complexity. It gives complexity a boundary.

---

## Conclusion

Before taking the time to explore authentication from first principles, I thought the most challenging part of authentication was building the login form.

It turns out the form is the least interesting part.

Underneath that form are HTTP transport semantics, password hashing algorithms, browser cookie policies, session storage models, database persistence, and authorization rules.

Libraries like Better Auth do not replace those underlying concepts; they coordinate them behind a clean, type-safe API. Understanding what happens underneath the abstraction allows you to use it effectively, debug issues quickly, and design better experiences for your users.
