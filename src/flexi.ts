import flexiPath from "./path";
import { isRoot, root, empty, concat, exists, isEmpty } from "./lib/path";
import resolve from "./lib/resolve";
import { Flexi, FlexiPath } from "./types";

// export * from "./resolve/strategies";

let emptyPath: FlexiPath;
let rootPath: FlexiPath;

export const flexi: Flexi = {
  /**
   * creates a new `path`
   *
   * @example
   * ```typescript
   * import flexi from "flexi";
   *
   * const path = flexi.path("any path");
   *```
   */
  path: flexiPath,
  /**
   * Represents an empty `path`
   */
  empty: () => {
    if (emptyPath === undefined) {
      emptyPath = flexiPath(empty);
    }

    return emptyPath;
  },
  /**
   * `boolan` value indicatinf if the `path`is empty
   */
  isEmpty,
  /**
   * A `path` representing the `root`
   */
  root: () => {
    if (rootPath === undefined) {
      rootPath = flexiPath(root);
    }

    return rootPath;
  },
  /**
   * Indicates if the `path` is a root path
   */
  isRoot,
  /**
   * Navigates the `path` until a condition is met
   */
  resolve,
  /**
   * Concatinates multiple `path` into a new `path`
   */
  concat,
  /**
   * `boolean` value indicating if the `path` exists or not
   */
  exists
};

export default flexi;
