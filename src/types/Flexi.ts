import { Path, PathMeta, FlexiPath } from ".";

/**
 * @category path
 */
export interface Flexi {
  /**
   * creates a new `path`
   * @param path A path to a file, directory or any arbitrary `path`
   * @returns The parsed `FlexiPath`
   *
   * @example
   * ```typescript
   * import flexi from "flexi";
   *
   * const path = flexi.path("any path");
   *```
   */
  path: (path: Path) => FlexiPath;

  /**
   * Concatinates multiple `paths` into a new `path`
   */
  concat: (path: Path, ...paths: Path[]) => FlexiPath;
  /**
   * `boolean` value indicating if the `path` exists or not
   */
  exists: (path: Path) => boolean;
  /**
   * Represents an empty `path`
   */
  empty: () => FlexiPath;
  /**
   * A `path` representing the `root path`
   */
  root: () => FlexiPath;
  /**
   * `boolean` value indicating if the `path` is [[empty]] or not
   */
  isEmpty: (path: Path) => boolean;
  /**
   * Indicates if the `path` is [[root]] or not
   */
  isRoot: (path: Path) => boolean;

  meta: (path: Path) => PathMeta;
}
