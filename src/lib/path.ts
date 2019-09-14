import { FlexiPath, Path, PathKind, PathMeta } from "..";
import children from "./children";
import concat from "./concat";
import cut from "./cut";
import diff from "./diff";
import except from "./except";
import files from "./files";
import flatten from "./flatten";
import intersect from "./intersect";
import meta, { constants } from "./meta";
import parent from "./parent";
import pathKind from "./pathKind";
import pathString from "./pathString";
import prepend from "./prepend";
import reverse from "./reverse";
import subDirectories from "./subDirectories";
import write from "./write";

export { default as write } from "./write";
export { default as type } from "./type";
export { default as concat } from "./concat";
export { default as prepend } from "./prepend";
export { default as flatten } from "./flatten";
export { default as reverse } from "./reverse";
export { default as intersect } from "./intersect";
export { default as except } from "./except";

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

  const api = {
    append: (...paths: Path[]) =>
      concat(pathMeta.path, ...paths.map(x => pathString(x))),
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
  };

  return Object.freeze({ ...api, ...pathMeta });
};

let emptyPath: FlexiPath;
let rootPath: FlexiPath;

export const empty = () => {
  if (emptyPath === undefined) {
    emptyPath = path(constants.empty);
  }
  return emptyPath;
};

export const root = () => {
  if (rootPath === undefined) {
    rootPath = path(constants.root);
  }

  return rootPath;
};

export default path;
