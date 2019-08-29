import shell from "shelljs";
import { join } from "path";

export const testDir = join(__dirname, "flex.test-data");

beforeAll(() => {
  if (shell.test("-d", testDir)) {
    shell.rm("-rf", testDir);
  }
  shell.mkdir(testDir);
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
  testDir,
  createFile,
  createDirectory
};
