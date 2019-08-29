import flexi from "../../src";
import { directoryHasPath } from "../../src/resolve/strategies";

describe("resolve", () => {
  describe("directoryHasPath", () => {
    it("should return directory matching path", () => {
      const path = flexi.path("/a/little/path/");
      const expected = flexi.path("/a/little/");

      const resolver = directoryHasPath(expected);

      const result = flexi.resolve(path, resolver);

      expect(result).toHaveMatchingMembersOf(expected);
    });
  });
});
