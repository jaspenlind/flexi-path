import { flexi } from "../..";
import { PathType, WalkUntil } from "../../../types";

/**
 * @category walker
 */
const exists = (options?: { ignoreFileExtensions?: boolean }): WalkUntil => {
  const ignoreFileExtensions =
    (options && options.ignoreFileExtensions) || false;

  return x => {
    const parsed = flexi.path(x.path);
    const parent = parsed.parent();

    if (
      ignoreFileExtensions &&
      !parsed.exists() &&
      parent.exists() &&
      parsed.type() === PathType.File
    ) {
      return (
        parent.files().find(z => z.name === parsed.name) || flexi.empty()
      ).exists();
    }

    return parsed.exists();
  };
};

export default exists;
