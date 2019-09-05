import flexi from "../src";

describe("path", () => {
  describe("flatten", () => {
    it("can flatten path", () => {
      const path = flexi.path("first").append("second");

      const [first, second] = path.flatten();

      expect(first.path).toBe("first");
      expect(second.path).toBe("second");
    });

    it("should be empty when path is empty", () => {
      expect(flexi.empty().flatten()).toBeEmpty();
    });
  });
});
