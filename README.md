# frozen-object-assignment

A small TypeScript project that implements the `FrozenObject<T>` type and uses compile-time tests (via Jest + `tsc`) to prove the required behavior.

## Rules (from the assignment)

In TypeScript, design a generic type `FrozenObject<T>` that meets all of the following requirements:

- All properties of `T` must be deeply readonly.
  - Any attempt to reassign a property at any nesting level should be a compile-time error.
- The same `FrozenObject<T>` type must also allow:
  - Reassigning any property of `T` (even deeply nested) without a compile-time error when used in existing code that expects a mutable `T`.
- The type must be a single, consistent type.
  - You are not allowed to use function overloads, unions, or conditional branches at the call site to “switch” between mutable and immutable views.

## How it’s structured

- `src/index.ts`
  - Defines `FrozenObject<T>`.
  - Objects are deeply `readonly`.
  - Arrays/tuples stay mutable at the container level so the type remains assignable to a mutable `T`, but their element objects are frozen.
- `tests/compile-time.ts`
  - Pure TypeScript fixture that asserts the type rules using `@ts-expect-error`.
  - Covers deep readonly errors (top-level, nested, deep nested, array element property, tuple element property).
  - Verifies `FrozenObject<T>` is still assignable to `T` and works in existing mutable code.
- `tests/frozenObject.test.js`
  - A Jest test that runs `tsc -p tsconfig.type-tests.json --noEmit`.
  - The test passes only when the compile-time expectations in `compile-time.ts` are satisfied.

## Scripts

- `npm test` — runs Jest, which in turn runs the compile-time checks.
- `npm run typecheck` — runs the compile-time checks directly with `tsc`.
- `npm run build` — builds the TypeScript source (not that it builds anything useful for this project).
