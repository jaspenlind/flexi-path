import { Flexi, FlexiPath } from "../types";
import meta, { constants, exists, isEmpty, isRoot } from "./meta";
import path, { concat } from "./path";
/**
 * @ignore
 */
let emptyPath: FlexiPath;
/**
 * @ignore
 */
let rootPath: FlexiPath;

/**
 * @category api
 */
const flexi: Flexi = {
  concat,
  empty: () => {
    if (emptyPath === undefined) {
      emptyPath = path(constants.empty);
    }

    return emptyPath;
  },
  exists,
  isEmpty,
  isRoot,
  meta,
  path,
  root: () => {
    if (rootPath === undefined) {
      rootPath = path(constants.root);
    }

    return rootPath;
  }
};

export default flexi;
