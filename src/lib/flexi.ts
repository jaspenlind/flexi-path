import { Flexi, Path } from "../types";
import meta, { exists, isEmpty, isRoot } from "./meta";
import path, { concat, empty, root } from "./path";
import pathString from "./pathString";

const flexi: Flexi = {
  concat: (current: Path, ...paths: Path[]) =>
    concat(pathString(current), ...paths.map(x => pathString(x))),
  empty,
  exists,
  isEmpty,
  isRoot,
  meta,
  path,
  root
};

export default flexi;
