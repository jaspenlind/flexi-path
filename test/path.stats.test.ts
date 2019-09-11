import { stats } from "../src/lib/meta";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("stats", () => {
    it("should return stats when path exists", () => {
      expect(stats(testData.testDir)).not.toBeNull();
    });

    it("should return null when path is invalid", () => {
      expect(stats("invalid")).toBeNull();
    });
  });
});
