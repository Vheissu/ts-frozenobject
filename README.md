# FrozenObject

A TypeScript utility type that provides deep readonly protection while remaining assignable to mutable types.

## Installation

```bash
npm install
```

## Usage

```typescript
import type { FrozenObject } from './src/index';

type User = {
  name: string;
  profile: {
    age: number;
    settings: { theme: string };
  };
  tags: { label: string }[];
};

const user: FrozenObject<User> = {
  name: 'Alice',
  profile: { age: 30, settings: { theme: 'dark' } },
  tags: [{ label: 'admin' }],
};

// Compile-time errors - all properties are deeply readonly
user.name = 'Bob';                    // Error
user.profile.age = 31;                // Error
user.profile.settings.theme = 'light'; // Error
user.tags[0].label = 'user';          // Error

// But it still works with existing code expecting mutable types
function updateUser(u: User) {
  u.name = 'Updated';
}
updateUser(user);  // No error - FrozenObject<User> is assignable to User
```

## Requirements

`FrozenObject<T>` satisfies the following constraints:

- All properties of `T` must be deeply readonly.
  - Any attempt to reassign a property at any nesting level should be a compile-time error.
- The same `FrozenObject<T>` type must also allow:
  - Reassigning any property of `T` (even deeply nested) without a compile-time error when used in existing code that expects a mutable `T`.
- The type must be a single, consistent type.
  - No function overloads, unions, or conditional branches at the call site to "switch" between mutable and immutable views.

## Design Notes

Arrays and tuples remain mutable at the container level (e.g., `push`, `pop`, element reassignment) while their element *properties* are frozen. This is a deliberate trade-off: TypeScript's `ReadonlyArray` is not assignable to mutable `Array`, so keeping containers mutable is necessary to satisfy backward compatibility with mutable `T`.

## Project Structure

```
src/index.ts              # FrozenObject<T> type definition
tests/compile-time.ts     # Type-level test assertions using @ts-expect-error
tests/frozenObject.test.js # Jest runner for compile-time checks
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (includes compile-time type checks) |
| `npm run typecheck` | Run type checks directly via `tsc` |
| `npm run build` | Compile TypeScript to JavaScript |
