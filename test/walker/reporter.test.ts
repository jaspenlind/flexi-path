import reporter, { WalkOptions } from "../../src/lib/walker/reporter";

describe("walker", () => {
  describe("reporter", () => {
    it("can report path", () => {
      const report = jest.fn();

      const options: WalkOptions = { onWalk: () => report() };

      const spy = jest.spyOn(options, "onWalk");

      reporter(options).report("path");

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
