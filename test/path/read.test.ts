import flexi, { TextTransform } from "../../src";
import { testDir } from "../jest/createTestData";

interface PackageJson {
  name: string;
  description: string;
}

const packageJson = flexi
  .path(__dirname)
  .parent(x => x.name === "flexi-path")
  .append("package.json");

describe("read", () => {
  it("can read file", () => {
    expect(packageJson.read()).not.toBeEmpty();
  });

  it("can read file as json", () => {
    const json: PackageJson = packageJson.read({
      transform: TextTransform.JSON
    });

    expect(json.name).toBe("flexi-path");
  });

  it("should be empty when path is dir", () => {
    expect(flexi.path(testDir).read()).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    expect(flexi.path("invalid").read()).toBeEmpty();
  });
});
