import { writeFileSync } from "fs";
import shell from "shelljs";

import { flexi } from "..";
import { FlexiPath, PathType } from "../../types";
import { exists, parent, type } from ".";
import { create, WriteOptions } from "../../models/writeOptions";

/**
 * @ignore
 */
const createDirectory = (path: string): void => {
  if (!exists(path)) {
    shell.mkdir("-p", path);
  }
};

const createFile = (path: string, options: WriteOptions, content?: string | NodeJS.ArrayBufferView): void => {
  const directory = parent(path)();

  if (!directory) {
    return;
  }

  createDirectory(directory.path);

  if (content) {
    writeFileSync(path, content, { encoding: options.encoding });
  } else {
    shell.touch(path);
  }
};

/**
 * @ignore
 */
const ensureValidType = (pathType: PathType): void => {
  if (pathType === PathType.Unknown) {
    throw new Error("Path is not valid or type cannot be determined");
  }
};

/**
 * @ignore
 */
const ensureNotExists = (path: string, options: WriteOptions): void => {
  if (!options.overwrite && exists(path)) {
    throw new Error("Path already exists");
  }
};

/**
 * Writes the current `path` to disk if possible
 * @category path
 */
const write = (
  path: string,
  // any is a support type of writeFileSync
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: string | NodeJS.ArrayBufferView,
  options?: Partial<WriteOptions>
): FlexiPath => {
  const parsedType = type(path);
  const allOptions = create(options);

  ensureValidType(parsedType);
  ensureNotExists(path, allOptions);

  if (parsedType === PathType.Directory) {
    createDirectory(path);
  } else {
    createFile(path, allOptions, content);
  }

  return flexi.path(path);
};

export default write;
