import { Flexi, FlexiPath, Path, ResolveOptions } from "../types";
import path, {
  concat,
  constants,
  exists,
  isEmpty,
  isRoot,
  resolver
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
  path,
  resolve: (current: Path, options: ResolveOptions) =>
    resolver.resolve(current, options),
  root: () => {
    if (rootPath === undefined) {
      rootPath = path(constants.root);
    }

    return rootPath;
  }
};

export default flexi;
