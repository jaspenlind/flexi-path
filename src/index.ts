import flexiPath from "./flexiPath";
import { isRoot, root } from "./path";
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
  path: flexiPath,
  /**
   * A `path` representing the `root`
   */
  root: () => flexiPath(root),
  /**
   * Indicates if the `path` is a root path
   */
  isRoot,
  /**
   * Navigates the `path` until a condition is met
   */
  resolve
};
