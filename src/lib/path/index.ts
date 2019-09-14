import { FlexiPath, Path, PathKind, PathMeta } from "..";
import append from "./append";
import children from "./children";
import cut from "./cut";
import diff from "./diff";
import except from "./except";
import files from "./files";
import flatten from "./flatten";
import intersect from "./intersect";
import meta from "./meta";
import parent from "./parent";
import { constants, pathKind, pathString } from "./parse";
import prepend from "./prepend";
import reverse from "./reverse";
import subDirectories from "./subDirectories";
import write from "./write";

export {
  default as meta,
  depth,
  equals,
  exists,
  hasRoot,
  isEmpty,
  isRoot,
  isValid,
  readDir,
  type
} from "./meta";

export { default as append } from "./append";
export { default as children } from "./children";
export { default as concat } from "./concat";
export { default as cut } from "./cut";
export { default as files } from "./files";
export { default as flatten } from "./flatten";
export { default as intersect } from "./intersect";
export { default as parent } from "./parent";
export { default as prepend } from "./prepend";
export { constants, default as parse } from "./parse";
export { default as reverse } from "./reverse";
export { default as subDirectories } from "./subDirectories";
export { default as write } from "./write";

/**
 * Creates a new `path`
 * @category path
 * @param current A `string` representation of a valid file path or any arbitrary path
 */
export const path = (current: Path): FlexiPath => {
  const kind = pathKind(current);
  const pathMeta =
    kind === PathKind.PathMeta || kind === PathKind.FlexiPath
      ? (current as PathMeta)
      : meta(current);

  return Object.freeze({
    ...pathMeta,
    ...{
      append: (...paths: Path[]) =>
        append(pathMeta.path, ...paths.map(x => pathString(x))),
      children: children(pathMeta.path),
      cut: (count: number) => cut(pathMeta.path, count),
      diff: (other: Path) => diff(current, other),
      except: (...paths: Path[]) =>
        except(pathMeta.path, ...paths.map(x => pathString(x))),
      files: files(pathMeta.path),
      flatten: () => flatten(pathMeta.path),
      intersect: (...paths: Path[]) =>
        intersect(pathMeta.path, ...paths.map(x => pathString(x))),
      parent: parent(pathMeta.path),
      prepend: (...paths: Path[]) =>
        prepend(pathMeta.path, ...paths.map(x => pathString(x))),
      reverse: () => reverse(pathMeta.path),
      subDirectories: subDirectories(pathMeta.path),
      write: () => write(pathMeta.path)
    }
  });
};

/** @ignore */
let emptyPath: FlexiPath;
/** @ignore */
let rootPath: FlexiPath;

/**
 * Represents an empty `path`
 * @category path
 */
export const empty = () => {
  if (emptyPath === undefined) {
    emptyPath = path(constants.empty);
  }
  return emptyPath;
};

/**
 * Represents a root `path`
 * @category path
 */
export const root = () => {
  if (rootPath === undefined) {
    rootPath = path(constants.root);
  }

  return rootPath;
};

export default path;
