import path from "./flexiPath";
import { isRoot, root, empty, concat, exists, isEmpty } from "./path";
import resolve from "./resolve";

export * from "./types";
export * from "./subDirectories";
export * from "./files";
export * from "./parent";
export * from "./path";

/**
 * flexi-path
 */
export default {
  /**
   * creates a new path
   *
   * @example
   * import flexi from "flexi";
   *
   * const path = flexi.path("any path");
   *
   */
  path,
  /**
   * Represents an empty `path`
   */
  empty: () => path(empty),
  /**
   * `boolan` value indicatinf if the `path`is empty
   */
  isEmpty,
  /**
   * A `path` representing the `root`
   */
  root: () => path(root),
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
