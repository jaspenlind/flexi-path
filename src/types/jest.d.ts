/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toHaveMatchingMembers(expected: any): R;
  }
}
