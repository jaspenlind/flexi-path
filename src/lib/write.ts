import shell from "shelljs";

import { Path, PathType } from "..";
import { exists, parse, type } from "./path";

/**
 * Writes the current `path` to disk if possible
 * @category path
 */
const write = (path: Path): void => {
  const parsed = parse(path);
  const parsedType = type(parsed);

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
};

export default write;
