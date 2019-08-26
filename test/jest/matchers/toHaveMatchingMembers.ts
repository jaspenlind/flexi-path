import matchers from "expect/build/matchers";

const matchable = <T extends Record<string, any>>(obj: T, mock: any): T => {
  const copy = { ...obj };
  Reflect.ownKeys(copy)
    .filter(key => typeof Reflect.get(copy, key) === "function")
    .forEach(key => Reflect.set(copy, key, mock));
  return copy;
};

const toHaveMatchingMembers = (received: any, expected: any) => {
  const mock = jest.fn();

  const receivedAsMatchable = matchable(received, mock);
  const expectedAsMatchable = matchable(expected, mock);

  return matchers.toMatchObject(receivedAsMatchable, expectedAsMatchable);
};

export default {
  toHaveMatchingMembers
};
