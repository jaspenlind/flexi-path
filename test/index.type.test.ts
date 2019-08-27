import shell from "shelljs";
import FlexiPath, { PathType } from "../src";

const testDir = `${__dirname}/index.type.test-data`;
const testFile = `${testDir}/testfile.js`;

beforeEach(() => {
  shell.rm("-rf", testDir);
  shell.mkdir(testDir);
  shell.touch(testFile);
});

afterEach(() => {
  shell.rm("-rf", testDir);
});

describe("type", () => {
  it("should be directory when path is a directory", () => {
    expect(FlexiPath(testDir).type()).toBe(PathType.Directory);
  });

  it("should be file when path is a file", () => {
    expect(FlexiPath(testFile).type()).toBe(PathType.File);
  });

  it("should be unknown when path does not exist", () => {
    expect(FlexiPath("unknown").type()).toBe(PathType.Unknown);
  });
});
