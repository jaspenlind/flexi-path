import { Path, Flexi, FlexiPath, ResolveOptions } from "../types";
import path, {
  isRoot,
  concat,
  exists,
  isEmpty,
  resolver,
  constants
} from "./path";

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
export const flexi: Flexi = {
  path,
  empty: () => {
    if (emptyPath === undefined) {
      emptyPath = path(constants.empty);
    }

    return emptyPath;
  },
  isEmpty,
  root: () => {
    if (rootPath === undefined) {
      rootPath = path(constants.root);
    }

    return rootPath;
  },
  isRoot,
  resolve: (current: Path, options: ResolveOptions) =>
    resolver.resolve(current, options),
  concat,
  exists
};

export default flexi;
