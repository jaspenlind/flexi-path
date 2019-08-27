import shell from "shelljs";
import { join } from "path";

export const testDir = join(__dirname, "flex.test-data");

export const testFile = join(testDir, "testfile.js");

beforeEach(() => {
  shell.rm("-rf", testDir);
  shell.mkdir(testDir);
  shell.touch(testFile);
});

afterEach(() => {
  shell.rm("-rf", testDir);
});

export const createFile = (relativePath: string, fileName: string): string => {
  const filePath = join(testDir, relativePath, fileName);

  shell.touch(filePath);

  return fileName;
};

export const createDirectory = (relativePath: string): string => {
  const directoryPath = join(testDir, relativePath);

  shell.mkdir(directoryPath);

  return directoryPath;
};

export default {
  testDir,
  testFile,
  createFile,
  createDirectory
};
