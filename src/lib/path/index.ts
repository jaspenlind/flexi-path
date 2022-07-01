import { FlexiPath, Path, PathKind, PathMeta, PathWalker, ReadOptions, WriteOptions, WalkOptions } from "../../types";
import walker from "../walker";
import { append } from "./append";
import { children } from "./children";
import { cut } from "./cut";
import { diff } from "./diff";
import { except } from "./except";
import { files } from "./files";
import { flatten } from "./flatten";
import { intersect } from "./intersect";
import meta from "./meta";
import { parent } from "./parent";
import { constants, pathKind, pathString } from "./parse";
import { pop } from "./pop";
import { prepend } from "./prepend";
import { read } from "./read";
import { reverse } from "./reverse";
import { subDirectories } from "./subDirectories";
import { write } from "./write";

export { append } from "./append";
export { children } from "./children";
export { concat } from "./concat";
export { cut } from "./cut";
export { files } from "./files";
export { flatten } from "./flatten";
export { intersect } from "./intersect";
export { parent } from "./parent";
export { default as meta } from "./meta";
export { pop } from "./pop";
export { prepend } from "./prepend";
export { constants, parse } from "./parse";
export { reverse } from "./reverse";
export { subDirectories } from "./subDirectories";
export { write } from "./write";

/**
 * @ignore
 */
const pathWalker = (path: Path): PathWalker => ({
  back: (options?: WalkOptions) => walker.back(path, options).result,
  forward: (options?: WalkOptions) => walker.forward(path, options).result
});

/**
 * Creates a new `path`
 * @category path
 * @param current A `string` representation of a valid file path or any arbitrary path
 */
const path = (current: Path): FlexiPath => {
  const kind = pathKind(current);
  const pathMeta = kind === PathKind.PathMeta || kind === PathKind.FlexiPath ? (current as PathMeta) : meta(current);

  const readWrapper = (options?: Partial<ReadOptions>) => read(pathMeta, options);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeWrapper = (content: any, options?: Partial<WriteOptions>) => write(pathMeta.path, content, options);

  return Object.freeze({
    ...pathMeta,
    ...{
      append: (...paths: Path[]) => append(pathMeta.path, ...paths.map((x) => pathString(x))),
      children: children(pathMeta.path),
      cut: (count: number) => cut(pathMeta.path, count),
      diff: (other: Path) => diff(current, other),
      except: (...paths: Path[]) => except(pathMeta.path, ...paths.map((x) => pathString(x))),
      files: files(pathMeta.path),
      flatten: () => flatten(pathMeta.path),
      intersect: (...paths: Path[]) => intersect(pathMeta.path, ...paths.map((x) => pathString(x))),
      parent: parent(pathMeta.path),
      pop: () => pop(pathMeta.path),
      prepend: (...paths: Path[]) => prepend(pathMeta.path, ...paths.map((x) => pathString(x))),
      read: readWrapper,
      reverse: () => reverse(pathMeta.path),
      subDirectories: subDirectories(pathMeta.path),
      walk: () => pathWalker(pathMeta.path),
      write: writeWrapper
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
export const empty = (): FlexiPath => {
  if (typeof emptyPath === "undefined") {
    emptyPath = path(constants.empty);
  }
  return emptyPath;
};

/**
 * Represents a root `path`
 * @category path
 */
export const root = (): FlexiPath => {
  if (typeof rootPath === "undefined") {
    rootPath = path(constants.root);
  }

  return rootPath;
};

export default path;
