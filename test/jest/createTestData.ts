import { join } from "path";
import shell from "shelljs";

export const testDir = join(__dirname, "flex-test-data");

beforeAll(() => {
  try {
    shell.rm("-rf", testDir);
    shell.mkdir(testDir);
  } catch {
    // do nothing
  }
});

export const createFile = (fileName: string, relativePath = ""): string => {
  const filePath = join(testDir, relativePath, fileName);

  shell.touch(filePath);

  return filePath;
};

export const createDirectory = (relativePath: string): string => {
  const directoryPath = join(testDir, relativePath);

  shell.mkdir("-p", directoryPath);

  return directoryPath;
};

export default {
  createDirectory,
  createFile,
  testDir
};
