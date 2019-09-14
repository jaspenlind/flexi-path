import { normalize } from "path";

import flexi from "../../src";
import testData from "../jest/createTestData";

describe("path", () => {
  describe("append", () => {
    it("can append path to existing path", () => {
      const existingPath = flexi.path(testData.testDir);

      const appendedPath = existingPath.append("appended/path");

      expect(appendedPath.path).toBe(
        normalize(`${existingPath.path}/appended/path`)
      );
    });

    it("can append multiple paths to an existing path", () => {
      const existingPath = flexi.path("existing path");

      const first = "first";
      const second = flexi.path("second");
      const third = { basePath: "base", path: flexi.path("third") };

      const result = existingPath.append(first, second, third);

      expect(result.path).toBe(
        normalize("existing path/first/second/base/third")
      );
    });

    it("can handle empty append", () => {
      const existingPath = flexi.path("existing path");

      const result = existingPath.append();

      expect(result.path).toBe(existingPath.path);
    });
  });
});
