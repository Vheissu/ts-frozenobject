import type { FrozenObject } from '../src/index';

type Sample = {
  a: number;
  nested: {
    b: string;
    c: {
      d: boolean;
    };
  };
  arr: { x: number }[];
  tuple: [number, { y: string }];
  optional?: {
    z: number;
  };
  fn: () => void;
};

const frozen: FrozenObject<Sample> = {
  a: 1,
  nested: { b: 'x', c: { d: true } },
  arr: [{ x: 1 }],
  tuple: [1, { y: 'y' }],
  fn: () => {},
};

// Deep readonly checks
// @ts-expect-error - top-level property assignment should be rejected
frozen.a = 2;
// @ts-expect-error - reassigning object property should be rejected
frozen.arr = [];
// @ts-expect-error - nested property assignment should be rejected
frozen.nested.b = 'y';
// @ts-expect-error - deeply nested property assignment should be rejected
frozen.nested.c.d = false;
// @ts-expect-error - array element property assignment should be rejected
frozen.arr[0].x = 2;
// @ts-expect-error - tuple element property assignment should be rejected
frozen.tuple[1].y = 'z';
if (frozen.optional) {
  // @ts-expect-error - optional nested property assignment should be rejected
  frozen.optional.z = 2;
}

function mutate(sample: Sample) {
  sample.a = 3;
  sample.nested.b = 'b';
  sample.nested.c.d = false;
  sample.arr[0].x = 4;
  sample.tuple[1].y = 't';
}

// Assignable to mutable Sample and usable in existing mutable code
mutate(frozen);
const mutable: Sample = frozen;

// Ensure functions remain callable
frozen.fn();
