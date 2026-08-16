---
title: Learning how react actually works
description: Documenting my own learnings on render, reconciliation, and what React is really doing under the UI.
date: 2026-08-16
category: design-engineering
tags:
  - react
  - frontend
  - engineering
  - learning
published: true
cover:
---

I have shipped a lot of React without fully understanding React.

That gap shows up in subtle ways. Unnecessary re-renders. Effects that fire too often. State that feels harder than it should. For a while I treated those as "React quirks." They were not quirks. They were me missing the model.

This post is me documenting how React actually works, in the way I wish someone had explained it earlier and getting the grasp of it on whole browser level

## React Components, elements and component instances
There is a difference between React components, and elements and component instances
Let's take a simple component for instance

```react-chart
component-tree
```

```jsx
const App = () => {
  return (
    <div>
      App Component
    </div>
  )
}
```

For us it's just a regular react component which returns some React elements using JSX.

But for React the return value is an object

```jsx
{
  "$$typeof": Symbol(react.element),
  key: null,
  props: {children: "App Component"},
  ref: null,
  type: "div"
}
```

## Under the hood: how JSX becomes that object

JSX is not something the browser understands. Before your code runs, a compiler (Babel, SWC, TypeScript) rewrites it. Point by point, this is what happens:

1. **You write JSX**
   The syntax looks like HTML inside JavaScript, but it is still just source code at this stage.

```jsx
const App = () => {
  return (
    <div>
      App Component
    </div>
  );
};
```

2. **The compiler rewrites JSX into function calls**
   Historically that call was `React.createElement`. With the modern JSX transform it may become `_jsx` / `_jsxs` from `react/jsx-runtime`, but the idea is the same: tags become function calls.

```jsx
const App = () => {
  return React.createElement(
    "div",
    null,
    "App Component"
  );
};
```

3. **`createElement` does not create a DOM node**
   It builds a plain React element object — a description of what should appear on screen. No `<div>` is painted yet.

4. **The arguments map cleanly**
   - First argument → `type` (`"div"`, or a component function/class)
   - Second argument → props object (`null` if there are no props)
   - Remaining arguments → `children` (merged into `props.children`)

5. **Nested JSX becomes nested `createElement` calls**
   Children that are themselves JSX get transformed the same way, so the tree of tags becomes a tree of element objects.

```jsx
// JSX
<button className="primary">
  <span>Save</span>
</button>

// After transform
React.createElement(
  "button",
  { className: "primary" },
  React.createElement("span", null, "Save")
);
```

6. **Components are just another `type`**
   If the tag starts with a capital letter, `type` is the component itself, not a string tag name.

```jsx
<App />
// → React.createElement(App, null)
```

7. **That object is what React reconciles against**
   On render, React compares these element objects with the previous tree and only then updates the real DOM where something actually changed.

So the mental model I keep:

- JSX → compiler → `createElement` / `_jsx`
- `createElement` → React element object
- React element object → description, not DOM
- React later → reconcile + commit → real DOM updates

Not only does React call our components for us, it also manages the component instances

## Reconciliation

All React does is create a tree of elements

This is a fast process because React elements are just JavaScript Objects

This all happens when we call the render() method

```react-chart
state-update
```

### Virtual DOM vs real DOM

There are two trees in play:

1. **Virtual DOM (React element tree)** — a lightweight JavaScript description of the UI
2. **Real DOM** — the actual browser nodes that get painted on screen

```text
Virtual DOM (JS objects)          Real DOM (browser)
─────────────────────────         ──────────────────
div                               <div>
├─ h1 "Hello"                     │  <h1>Hello</h1>
└─ button "Click"                 │  <button>Click</button>
                                  └─
```

Updating the real DOM is expensive. Every change can force the browser to:

- recalculate layout (reflow)
- repaint pixels
- composite layers again

Throwing away the whole UI and rebuilding it from scratch on every state change would make apps feel slow. So React keeps a virtual tree, diffs it, and touches the real DOM only where needed.

### Why React does not rebuild the whole tree

When state changes, React does **not** mean "delete every node and create them again."

It means:

1. Render a new virtual tree from your components
2. Diff it against the previous virtual tree (reconciliation)
3. Compute a small set of DOM operations
4. Commit those operations to the real DOM
5. Let the browser respond with layout + paint only for what changed

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Before click / after click, the trees look like this:

```text
Previous tree                     Next tree
───────────────                   ─────────────
div                               div
├─ h1 "Counter"                   ├─ h1 "Counter"   ← same
├─ p "0"                          ├─ p "1"          ← text changed
└─ button "Increment"             └─ button "Increment" ← same
```

Reconciliation result is one small operation, not a full rebuild:

```text
DOM operations
──────────────
update text in <p>: "0" → "1"
```

What React does **not** do here:

- recreate the `<div>`
- recreate the `<h1>`
- recreate the `<button>`
- remount the whole `Counter` instance from zero

### How reconciliation decides what to keep

Point by point:

1. **Same `type` at the same position** → reuse the existing DOM node / component instance, update props if needed
2. **Different `type`** → tear down the old subtree, create a new one
3. **Lists use `key` as identity** → move / update / insert / remove items surgically instead of reshuffling blindly

```jsx
// Same type → update in place
<p>{count}</p>   // 0 → 1  (keep the <p>, change text)

// Different type → replace
<p>{count}</p>   →   <span>{count}</span>  (destroy <p>, create <span>)
```

```text
List with keys
──────────────
[ key: "a" ] Item A
[ key: "b" ] Item B
[ key: "c" ] Item C

After reorder to c, a, b
React moves nodes by key.
It does not recreate A, B, and C from scratch.
```

### How the browser responds

After React commits those small DOM updates, the browser takes over:

1. **Style calculation** — figure out computed styles for affected nodes
2. **Layout / reflow** — calculate geometry if size/position may have changed
3. **Paint** — draw pixels for dirty regions
4. **Composite** — assemble layers onto the screen

```text
State update
    ↓
React render (new virtual tree)
    ↓
Reconcile (diff old vs new)
    ↓
Commit (small real DOM ops)
    ↓
Browser layout / paint / composite
```

That is why React feels fast when used well: most of the work stays in cheap JavaScript object comparisons, and the browser only does expensive layout/paint work for the nodes that actually changed.

## Diffing algorithm

Reconciliation is powered by React's diffing algorithm. It is not a perfect tree-to-tree diff of every node. That would be too slow. React uses a few heuristics instead.

```react-chart
reconcile
```

### 1. Elements of different types produce different trees

If the element `type` changes at the same position, React assumes the old subtree is no longer useful.

Point by point:

1. Compare the element at this position in the old tree vs the new tree
2. If `type` is different, destroy the old subtree completely
3. Build a fresh subtree for the new type
4. Old DOM nodes, state, and effects under that branch are gone

```jsx
// Old
<div>
  <Counter />
</div>

// New
<span>
  <Counter />
</span>
```

```text
Old tree                         New tree
────────                         ────────
div                              span
└─ Counter                       └─ Counter

Diff result
───────────
type changed: div → span
→ tear down whole old subtree
→ create brand new subtree
→ Counter remounts (state resets)
```

More examples of "different type → different tree":

```jsx
// Example A: host tag change
<article>...</article>  →  <section>...</section>
// full replace

// Example B: host → component
<div />  →  <Card />
// full replace

// Example C: component → different component
<LoginForm />  →  <SignupForm />
// full replace, LoginForm state is lost

// Example D: same component type → update in place
<Profile user={a} />  →  <Profile user={b} />
// reuse instance, just update props
```

Same type is what keeps things stable:

```jsx
// Kept and updated
<p className="muted">Hi</p>  →  <p className="loud">Hi</p>
// same type "p" → keep DOM node, update className
```

### 2. Lists that change need a unique `key`

When children are a list that can reorder, insert, or delete, React needs identity. Without a stable key, it matches children by index and does extra work — or worse, mixes up state.

Rule I keep: if a list often changes, every child should get a unique, stable `key` prop that identifies that item across renders.

#### Unoptimized: `key={index}`

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <div key={index}>
          <input defaultValue={todo.text} />
        </div>
      ))}
    </ul>
  );
}
```

Why this is bad when the list mutates:

```text
Before delete of first item
───────────────────────────
index 0 → "Buy milk"   (input state: focused / typed text)
index 1 → "Read docs"
index 2 → "Ship PR"

After deleting "Buy milk"
────────────────────────
index 0 → "Read docs"  ← React reuses old index-0 DOM
index 1 → "Ship PR"    ← React reuses old index-1 DOM

Result
──────
The input that used to belong to "Buy milk"
now shows up on "Read docs".
State sticks to the wrong row.
```

More unoptimized patterns that behave like index keys:

```jsx
// Still positional identity
{items.map((item, i) => (
  <Row key={i} item={item} />
))}

// Random keys remount every render
{items.map((item) => (
  <Row key={Math.random()} item={item} />
))}

// Unstable derived keys
{items.map((item) => (
  <Row key={item.name + Date.now()} item={item} />
))}
```

#### Optimized: `key={item.id}`

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input defaultValue={todo.text} />
        </div>
      ))}
    </ul>
  );
}
```

```text
Before delete of id: "a"
───────────────────────
key "a" → "Buy milk"
key "b" → "Read docs"
key "c" → "Ship PR"

After deleting id: "a"
─────────────────────
key "b" → "Read docs"  ← moved / kept correctly
key "c" → "Ship PR"    ← moved / kept correctly

Result
──────
React removes only the "a" node.
"b" and "c" keep their DOM and local state.
```

More optimized examples:

```jsx
// Stable database / API id
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}

// Stable uuid created when the item is born
{notes.map((note) => (
  <NoteEditor key={note.uuid} note={note} />
))}

// Stable slug when it never changes for that entity
{posts.map((post) => (
  <PostRow key={post.slug} post={post} />
))}

// Reorder-safe list
{tasks
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((task) => (
    <TaskRow key={task.id} task={task} />
  ))}
```

Insert / reorder with good keys:

```text
Insert "d" at the top
─────────────────────
Old: a b c
New: d a b c

With key={id}
→ create "d"
→ move a, b, c
→ no remount of a/b/c

With key={index}
→ index 0 becomes d (reuses old a node) ❌
→ index 1 becomes a (reuses old b node) ❌
→ index 2 becomes b (reuses old c node) ❌
→ index 3 creates c
→ messy updates, wrong state pairing
```

### Diffing cheat sheet

1. Different element types → different trees → tear down and rebuild
2. Same type → reuse node / instance → update props
3. Changing lists → give each child a unique stable `key`
4. Prefer `key={item.id}` over `key={index}`
5. Never use `Math.random()` as a key
6. Keys only need to be unique among siblings, not globally

## Rendering

Rendering is where everything above finally becomes a running UI. This is the last piece of the model for me.

```react-chart
dom-update
```

### What "render" actually means

A render is React calling your component function and getting a tree of elements back.

It is **not** the same thing as the browser painting the screen.

```jsx
function App() {
  console.log("App rendered");
  return <Profile name="Yash" />;
}
```

When React renders `App`:

1. it calls `App()`
2. `App` returns element objects
3. React walks children and may call more components
4. it builds / updates the virtual tree
5. later it commits changes to the real DOM

```text
Render phase (calculate)          Commit phase (apply)
────────────────────────          ────────────────────
call components                   update real DOM
build element tree                run layout effects / effects
diff with previous tree           browser layout / paint
```

### Initial render

The first time React mounts your app:

```jsx
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

```text
1. Create root on a real DOM container
2. Render <App /> → element tree
3. Create real DOM nodes from that tree
4. Insert them into the page
5. Browser paints the first frame
```

There is no previous tree yet, so almost everything is a create operation.

### Re-render

A re-render happens when React needs a fresh description of UI because something changed.

Common triggers:

1. **State update** in that component — `setState` / `useState` setter
2. **Props change** from a parent that re-rendered
3. **Context value change** for consumers of that context
4. **Parent re-render** — by default children re-render when parents do, even if props look the same by value shape

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Bump</button>
      <Child label="static" />
    </div>
  );
}

function Child({ label }) {
  console.log("Child rendered");
  return <p>{label}</p>;
}
```

```text
Click "Bump"
────────────
Parent re-renders   ← state changed
Child re-renders    ← parent re-rendered (default behavior)
DOM update          ← only the button / count-related nodes if anything visible changed
```

Important: Child re-rendering does not automatically mean Child's DOM was rebuilt. Reconciliation may still decide "nothing changed here."

### Render is recursive down the tree

React starts at the component that updated, then works downward.

```text
App
├─ Header
├─ Feed
│  ├─ Post
│  └─ Post
└─ Footer
```

If `Feed` state changes:

```text
App        → may not re-render
Header     → may not re-render
Feed       → re-renders
  Post     → re-renders (as Feed children)
  Post     → re-renders
Footer     → may not re-render
```

That is why lifting state carefully matters. Wider state means wider render fan-out.

### Batching

React often batches multiple updates into one render.

```jsx
function handleClick() {
  setCount((c) => c + 1);
  setOpen(true);
  setError(null);
  // usually one re-render, not three
}
```

```text
Updates queued
──────────────
count + 1
open = true
error = null
        ↓
One render with all three snapshots applied
```

This keeps the UI consistent and avoids extra browser work.

### Render vs commit vs browser paint

Putting the full pipeline together:

```text
Event / state update
        ↓
Render phase
  - call components
  - create new virtual tree
  - diff against previous tree
        ↓
Commit phase
  - apply minimal real DOM operations
  - attach listeners / refs
  - schedule effects
        ↓
Browser
  - style
  - layout
  - paint
  - composite
```

Example with code and trees:

```jsx
function Search() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Results for: {query}</p>
    </div>
  );
}
```

```text
Type "a"
────────
Previous virtual tree          Next virtual tree
div                            div
├─ input value=""              ├─ input value="a"   ← prop changed
└─ p "Results for: "           └─ p "Results for: a" ← text changed

Commit
──────
update input value
update p text

Browser
───────
reflow/paint only what those updates require
```

### What I optimize around now

1. Keep render functions pure — same props/state should describe the same UI
2. Do not fear renders; fear expensive work during render and unnecessary DOM thrash
3. Move heavy sync work out of the render path when possible
4. Use keys well so reconciliation stays surgical
5. Remember: re-render ≠ full DOM rebuild
6. Remember: commit is when the real world changes; render is just calculation

That closes the loop for me:

- JSX becomes elements
- elements become trees
- trees get diffed
- diffs become small DOM operations
- the browser paints the result

Rendering is the process that drives all of it.

```text
I must say that the way React is built, Facebook devs really are magicians.
```
