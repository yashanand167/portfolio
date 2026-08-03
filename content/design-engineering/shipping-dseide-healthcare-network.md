---
title: "From 0 to Launch: Shipping a Healthcare Network Under Startup Velocity"
description: How we designed and shipped Dseide's core React Native mobile app and web dashboards.
date: 2026-06-05
category: design-engineering
tags:
  - engineering
  - react native
  - startup
  - dseide
published: true
cover:
---

At early-stage startups, velocity is the ultimate metric. When we set out to build Dseide, a dedicated professional network and communication tool for healthcare practitioners, we faced a major constraint: ship the entire mobile MVP and web platform in 12 weeks or miss our market window.

As a core design engineer on the team, I took complete design-to-code ownership. I designed the flows in Figma and translated them directly into production React Native and Web code.

Here is how we bypassed the typical handoff friction, made pragmatic compromises for speed, and shipped the product on time.

---

## 1. Defining the Core and Bypassing OCR Complexity (The MVP Mindset)

Generalized professional networks like LinkedIn or messaging tools like WhatsApp fail medical doctors due to clinical noise, a lack of credentials verification, and unstructured communication. We needed a verified space for doctors, clinics, and pharmacies.

We identified a major bottleneck: credential verification. The initial plan was to build an AI-based OCR engine to scan and verify doctor certificates automatically.

- **The Tradeoff:** Building and testing a legally compliant, high-accuracy OCR system would take at least 6 to 8 weeks.
- **The Pragmatic Decision:** We launched with a manual verification queue. I built an admin dashboard in React in 2 days. When a doctor uploads their registration certificate, our admin team verifies it manually.

This simple compromise saved us over a month of development time, allowing us to launch the core product and verify our first 500 users manually while we validated market demand.

---

## 2. Competitive Deconstruction & Quick Wireframing

Rather than starting from scratch, we analyzed existing community platforms (Nas.IO, Circle, Luma) to understand standard interaction patterns. We spent 7 days listing down gaps—specifically, the lack of secure clinical sharing and the integration of medical events.

We moved directly from competitive notes into rapid wireframing, focusing on onboarding and discovery flows.

By prioritizing low-fidelity sketches first, we aligned on the user flow with medical practitioners and clinicians before writing code, catching potential UX friction points early.

---

## 3. The Design-to-Code Advantage: A Component-Driven Workflow

Static designs often look great but break under engineering constraints. To move fast, I established a strict, unified Design Token System in Figma using an 8px grid.

Because I was writing both the designs and the frontend code:

- Components in Figma mapped 1:1 to React Native / Tailwind CSS styles.
- Colors were bound to semantic CSS tokens, making light/dark mode and brand changes instant.
- Every state (default, active, disabled, loading skeletons) was modeled from day one, eliminating the need for developer back-and-forth.

---

## 4. Technical Architecture: Moving Swiftly in React Native (Expo)

We had to support both iOS and Android. Writing native Swift and Kotlin code was out of the question for a 12-week timeline. We selected React Native with Expo to compile a single cross-platform codebase.

To maintain maximum velocity:

- **Client Caching:** Instead of over-engineering a complex offline-sync SQLite store, we used TanStack Query (React Query) for API caching. This handled state synchronization, refetching on reconnect, and caching automatically with zero boilerplate.
- **State Management:** We kept the state clean and lightweight using Zustand instead of Redux, reducing state boilerplate by 70%.
- **Axios & REST:** Built a unified Axios client instance with automatic JWT header injection and response interceptors to handle session expiry smoothly.

---

## 5. Features I Took Complete Ownership Of

### Profile Section

Doctors are highly protective of their credentials and professional identity. I designed and coded the verified Profile section to highlight their clinical departments, affiliations, and verified badge prominently.

### Verified Community Creation Flow

To keep the clinical community high-signal, community creators submit their proposal to the admin queue. Once approved by the admin dashboard, the creator is guided through a fast terms-and-outcomes setup flow. I built both the Figma flow and the React state machine for this setup wizard.

---

## Startup Learnings: Act as a Force Multiplier

Working in a high-velocity startup taught me how design-engineering acts as a force multiplier. When the person designing the interfaces is the one coding them:

- Feedback loops are collapsed from days to minutes.
- Static screens are animated with hardware-accelerated, performance-optimized code (using Framer Motion/React Native Animated APIs) that doesn't trigger layout shifts.
- You avoid the anti-pattern of over-engineering features before checking if users actually want them.

Startup development isn't about writing the most complex code; it's about shipping the most impactful solution as fast as possible.
