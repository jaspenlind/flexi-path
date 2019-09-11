import { FlexiPath, Path } from "..";
import children from "./children";
import concat from "./concat";
import cut from "./cut";
import diff from "./diff";
import except from "./except";
import files from "./files";
import flatten from "./flatten";
import intersect from "./intersect";
import meta from "./meta";
import parent from "./parent";
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
  const api = {
    append: (...paths: Path[]) => concat(current, ...paths),
    children: children(current),
    cut: (count: number) => cut(current, count),
    diff: (other: Path) => diff(current, other),
    except: (...paths: Path[]) => except(current, ...paths),
    files: files(current),
    flatten: () => flatten(current),
    intersect: (...paths: Path[]) => intersect(current, ...paths),
    parent: parent(current),
    prepend: (...paths: Path[]) => prepend(current, ...paths),
    reverse: () => reverse(current),
    subDirectories: subDirectories(current),
    write: () => write(current)
  };

  return Object.freeze({ ...api, ...meta(current) });
};

export default path;
