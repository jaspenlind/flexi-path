import shell from "shelljs";
import FlexiPath from "../src";

const testDir = `${__dirname}/index.subDirectories.test-data`;
const testFile = `${testDir}/testfile.js`;
const subDirectory = `${testDir}/subDirectory`;

beforeEach(() => {
  shell.rm("-rf", testDir);
  shell.mkdir(testDir);
  shell.touch(testFile);
});

afterEach(() => {
  shell.rm("-rf", testDir);
});

describe("subDirectories", () => {
  it("should contain sub directory", () => {
    shell.mkdir(subDirectory);
    expect(
      FlexiPath(testDir)
        .subDirectories()
        .map(x => x.path)
    ).toContain(subDirectory);
  });

  it("should be empty when path is file", () => {
    expect(
      FlexiPath(testFile)
        .subDirectories()
        .map(x => x.path)
    ).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    expect(FlexiPath("invalid").subDirectories()).toBeEmpty();
  });
});
