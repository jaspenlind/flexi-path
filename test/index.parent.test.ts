import FlexiPath from "../src";

const mockFunctions = <T extends Record<string, any>>(obj: T, mock: any): T => {
  const copy = { ...obj };
  Reflect.ownKeys(copy)
    .filter(key => typeof Reflect.get(copy, key) === "function")
    .forEach(key => Reflect.set(copy, key, mock));
  return copy;
};

describe("parent", () => {
  const path = "/directory/containing/a/file.js";
  let flex: FlexiPath;

  beforeEach(() => {
    flex = FlexiPath(path);
  });

  it("should be parent", () => {
    const mock = jest.fn();

    const expected = mockFunctions(FlexiPath("/directory/containing/a/"), mock);

    let actual = flex.parent();

    if (actual !== null) {
      actual = mockFunctions(actual, mock);
    }

    expect(actual).toMatchObject(expected);
  });
});
