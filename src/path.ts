import { parse, normalize } from "path";
import { FlexiPath, Path } from ".";
import files from "./lib/files";
import subDirectories from "./lib/subDirectories";
import parent from "./lib/parent";
import pathHelper from "./lib/path";
/**
 * Creates a new `flexi`.`path`
 *
 * @param current A `string` representation of a valid file path or any arbitrary path
 */
export const path = (current: Path): FlexiPath => {
  const pathAsString =
    typeof current === "string"
      ? (current as string)
      : pathHelper(current).parse().path;
  const normalizedPath = normalize(pathAsString);
  const { root, dir, ext, base, name } = parse(normalizedPath);
  const getParent = parent(normalizedPath);
  const getSubDirectories = subDirectories(normalizedPath);
  const currentPath = pathHelper(normalizedPath);

  const api: FlexiPath = {
    root,
    dir,
    ext,
    base,
    name,
    path: normalizedPath,
    isRoot: () => currentPath.isRoot(),
    hasRoot: () => currentPath.hasRoot(),
    exists: () => currentPath.exists(),
    isEmpty: () => currentPath.isEmpty(),
    isValid: () => currentPath.isValid(),
    type: () => currentPath.type(),
    parent: (query?: any): any => getParent(query),
    subDirectories: (directoryName?: any): any =>
      getSubDirectories(directoryName),
    files: () => files(normalizedPath),
    append: (...paths: Path[]) => currentPath.concat(...paths),
    prepend: (...paths: Path[]) => currentPath.prepend(...paths),
    diff: (other: Path) => currentPath.diff(other),
    reverse: () => currentPath.reverse(),
    write: () => currentPath.write(),
    flatten: () => currentPath.flatten(),
    cut: (count: number) => currentPath.cut(count),
    intersect: (...paths: Path[]) => currentPath.intersect(...paths),
    except: (...paths: Path[]) => currentPath.except(...paths),
    depth: () => currentPath.flatten().length
  };

  return api;
};

export default path;
