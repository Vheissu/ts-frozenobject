/**
 * @author Dwayne Charrington <dwaynecharrington@gmail.com>
 * 10 Jan 2026
 * FrozenObject<T>
 */

type FrozenArray<T extends readonly any[]> = number extends T['length']
  ? Array<FrozenObject<T[number]>>
  : { [K in keyof T]: FrozenObject<T[K]> };

export type FrozenObject<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly any[]
    ? FrozenArray<T>
    : T extends object
      ? { readonly [K in keyof T]: FrozenObject<T[K]> }
      : T;
