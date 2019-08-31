import flexi from "../src";

describe("flexi", () => {
  describe("concat", () => {
    it("can concatinate paths", () => {
      const result = flexi.concat("first", flexi.path("second"));

      expect(result.path).toBe("first/second");
    });
  });
});
