import { FlexiPath, PathMeta } from ".";

/**
 * Generic query interface
 * @category path
 */
export interface Query<T, TResult> {
  /**
   * Returns elements satisfying a `condition`
   * @param condition The `condition`to be met
   * @param options options
   */
  (
    condition?: (current: T) => boolean,
    options?: { recursive?: boolean }
  ): TResult;

  /**
   * Returns all elements
   */
  (): TResult;
}

/**
 * Returns the `parent` of a given `path` or `[[empty]]` when the `path` is `root`
 * @category path
 */
export type ParentQuery = Query<PathMeta, FlexiPath>;

/**
 * Returns the children of a given `path`
 * @category path
 */
export type ChildQuery = Query<PathMeta, FlexiPath[]>;

/**
 * Fetches subdirectories of a given `path`
 * @category path
 */
export type SubDirectoryQuery = ChildQuery;

/**
 * Fetches files of a given `path`
 * @category path
 */
export type FileQuery = ChildQuery;
