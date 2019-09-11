import flexi, { PathMeta, WalkUntil } from "../../..";

/**
 * @category walker
 */
const exists = (options?: { ignoreFileExtensions?: boolean }): WalkUntil => {
  const ignoreFileExtensions =
    (options && options.ignoreFileExtensions) || false;

  return (x: PathMeta) => {
    const parsed = flexi.path(x.path);
    const pathToCompare = ignoreFileExtensions
      ? parsed
          .parent()
          .files()
          .find(z => z.name === parsed.name) || flexi.empty()
      : parsed;

    return pathToCompare.exists();
  };
};

export default exists;
