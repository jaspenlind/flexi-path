import { path } from "../src";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("stats", () => {
    it("should return stats when path exists", () => {
      expect(path(testData.testDir).stats()).not.toBeNull();
    });

    it("should return null when path is invalid", () => {
      expect(path("invalid").stats()).toBeNull();
    });
  });
});
