import { normalize } from "path";
import flexi from "../src";

describe("path", () => {
  describe("prepend", () => {
    it("should be original path if no paths to prepend", () => {
      const path = flexi.path("path");

      const result = path.prepend();

      expect(result).toHaveMatchingMembersOf(path);
    });

    it("should be empty when all paths are empty", () => {
      expect(
        flexi
          .empty()
          .prepend(flexi.empty())
          .isEmpty()
      ).toBe(true);
    });

    it("should prepend paths", () => {
      const path = flexi
        .path("some")
        .prepend("reverse")
        .prepend(flexi.path("path"));

      expect(path.path).toBe(normalize("path/reverse/some"));
    });
  });
});
