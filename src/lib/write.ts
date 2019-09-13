import shell from "shelljs";

import flexi, { FlexiPath, Path, PathType } from "..";
import { exists } from "./meta";
import parse from "./parse";
import { type } from "./path";

/**
 * Writes the current `path` to disk if possible
 * @category path
 */
const write = (path: Path): FlexiPath => {
  const parsed = parse(path);
  const parsedType = type(parsed.path);

  if (parsedType === PathType.Unknown) {
    throw new Error("Path is not valid or type cannot be determined");
  }

  if (exists(parsed)) {
    throw new Error("Path already exists");
  }

  if (parsedType === PathType.Directory) {
    shell.mkdir("-p", parsed.path);
  } else {
    const parsedParent = parsed.parent();
    if (parsedParent) {
      if (!parsedParent.exists()) {
        shell.mkdir("-p", parsedParent.path);
      }
      shell.touch(parsed.path);
    }
  }

  return flexi.path(parsed);
};

export default write;
