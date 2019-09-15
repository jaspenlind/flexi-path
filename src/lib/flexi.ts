import { Flexi, Path } from "../types";
import path, { concat, empty, exists, isEmpty, isRoot, root } from "./path";
import { pathString } from "./path/parse";
import walk from "./walker";

/** @category path */
const flexi: Flexi = {
  concat: (current: Path, ...paths: Path[]) =>
    concat(pathString(current), ...paths.map(x => pathString(x))),
  empty,
  exists,
  isEmpty,
  isRoot,
  path,
  root,
  walk
};

export default flexi;
