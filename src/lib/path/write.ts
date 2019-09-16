import { writeFileSync } from "fs";
import shell from "shelljs";

import { flexi } from "..";
import { FlexiPath, PathType } from "../../types";
import { exists, parent, type } from ".";

/**
 * Writes the current `path` to disk if possible
 * @category path
 */
const write = (
  path: string,
  content?: string,
  { encoding = "utf8" }: { encoding?: string } = {}
): FlexiPath => {
  const parsedType = type(path);

  if (parsedType === PathType.Unknown) {
    throw new Error("Path is not valid or type cannot be determined");
  }

  if (exists(path)) {
    throw new Error("Path already exists");
  }

  if (parsedType === PathType.Directory) {
    shell.mkdir("-p", path);
  } else {
    const parsedParent = parent(path)();
    if (parsedParent) {
      if (!exists(parsedParent.path)) {
        shell.mkdir("-p", parsedParent.path);
      }

      if (content) {
        writeFileSync(path, content, { encoding });
      } else {
        shell.touch(path);
      }
    }
  }

  return flexi.path(path);
};

export default write;
