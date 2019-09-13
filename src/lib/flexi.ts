import { Flexi } from "../types";
import meta, { exists, isEmpty, isRoot } from "./meta";
import path, { concat, empty, root } from "./path";

const flexi: Flexi = {
  concat,
  empty,
  exists,
  isEmpty,
  isRoot,
  meta,
  path,
  root
};

export default flexi;
