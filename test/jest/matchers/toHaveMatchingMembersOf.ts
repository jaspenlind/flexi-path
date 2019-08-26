import { matcherHint, printReceived } from "jest-matcher-utils";
import { SyncExpectationResult } from "expect/build/types";
import matchers from "expect/build/matchers";

const failMessage = (received: any) => (): string =>
  `${matcherHint(
    ".toHaveMatchingMembersOf",
    "received",
    ""
  )} \n\nExpected value to be an object received:\n ${printReceived(received)}`;

const matchable = <T extends Record<string, any>>(obj: T, mock: any): T => {
  const copy = { ...obj };
  Reflect.ownKeys(copy)
    .filter(key => typeof Reflect.get(copy, key) === "function")
    .forEach(key => Reflect.set(copy, key, mock));
  return copy;
};

const toHaveMatchingMembersOf = (received: any, expected: any) => {
  if (typeof received !== "object" || typeof expected !== "object") {
    const result: SyncExpectationResult = {
      pass: false,
      message: failMessage(received)
    };

    return result;
  }

  const mock = jest.fn();

  const receivedAsMatchable = matchable(received, mock);
  const expectedAsMatchable = matchable(expected, mock);

  return matchers.toMatchObject(receivedAsMatchable, expectedAsMatchable);
};

export default {
  toHaveMatchingMembersOf
};
