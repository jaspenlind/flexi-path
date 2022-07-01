import { flexi } from "../../..";
import { PathMeta, WalkUntil } from "../../../types";

/**
 * @ignore
 */
const getFileWithoutExtension = (path: PathMeta): PathMeta => {
  const parent = flexi.path(path).parent();

  return (parent.exists() && parent.files().find((file) => file.name === path.name)) || flexi.empty();
};
/**
 * @category walker
 */
export const exists = (options?: { ignoreFileExtensions?: boolean }): WalkUntil => {
  const ignoreFileExtensions = (options && options.ignoreFileExtensions) || false;

  return (current) => {
    let pathExists = current.exists();

    if (!pathExists && ignoreFileExtensions) {
      pathExists = getFileWithoutExtension(current).exists();
    }

    return pathExists;
  };
};
