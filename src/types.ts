import { ParsedPath } from "path";

/**
 * `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
 * on disk is `Unknown`
 */
export enum PathType {
  /**
   * Unable to decide what kind of `path` it is
   */
  Unknown = 0,
  /**
   * The `path` is a `directory`
   */
  Directory = 1,
  /**
   * Then `path`is a `file`
   */
  File = 2
}

/**
 * Fetch or append `directory` to the current `path`
 */
export interface SubDirectoryQuery {
  /**
   * Appends a new `path` to the current `path` and returns it
   *  */
  (name: string): FlexiPath;
  /**
   * Returns the `sub directories` of the current `path` if it `exists`
   */
  (): FlexiPath[];
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath[];
}

/**
 * Returns the `parent` of the current `path` or `null` when the `path` is `root`
 */
export interface ParentQuery {
  /**
   * Returns the `parent` `numberOfLevels` levels up
   */
  (numberOfLevels: number): FlexiPath | null;
  /**
   * Returns the closest `parent` of the `path`
   */
  (): FlexiPath | null;
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath;
}

/**
 * The `flexi path`
 */
export interface FlexiPath extends ParsedPath {
  /**
   * The normalized `string` representation of the `path`
   * */
  path: string;
  /**
   * `boolean` value indicating if the `path` is a `root` path
   */
  isRoot(): boolean;
  /**
   * `boolean` value indicating if the `path` exists or not
   */
  exists(): boolean;
  /**
   * `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
   * on disk is `Unknown`
   */
  type(): PathType;
  /**
   * The `parent` directory of the `path`
   */
  parent: ParentQuery;
  /**
   * The sub directories of the `path` and a `path` builder
   */
  subDirectories: SubDirectoryQuery;
  /**
   * The files in the current `path`
   */
  files(): FlexiPath[];
}

/**
 * Represents the current state when navigating a `path`
 */
export enum NavigationState {
  /**
   * Default state
   */
  Default = 0,
  /**
   * A `path` has been found
   */
  Found = 1,
  /**
   * Resumes the navigation
   */
  Resume = 2,
  /**
   * `Skip` the current navigated level of the `path` even when it was `Found`
   */
  Skip = 3,
  /**
   * Aborts navigation
   */
  Abort = 4
}

/**
 * Options representing how a path should be resolved
 */
export interface ResolveOptions {
  /**
   * Condition that has to be met to indicate the `path` is a match
   */
  predicate: (current: FlexiPath) => boolean;
  /**
   * Callback function for each level navigated in the `path`
   * @param current The current level of the navigated `path`
   */
  onNavigate?(current: FlexiPath): NavigationResult;
}

interface IgnoreFileExtensions {
  ignoreFileExtensions?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PathExistsOptions extends IgnoreFileExtensions {}

/**
 * The result of a `ResolveOptions`.`onNavigate`
 */
export interface NavigationResult {
  /**
   * The `NavigationState`
   */
  state: NavigationState;
  /**
   * A new `path` to replace `current`path with (optional)
   */
  replace?: FlexiPath;
}

/**
 * Contract for how to `resolve` a `path`
 */
export interface PathResolverStrategy {
  /**
   * Path resolving `options`
   * @param current The current level of the navigated `path`
   */
  resolve(current: FlexiPath): ResolveOptions;
}

/**
 * A `string` or `path` representing a `path`
 */
export type Path = string | FlexiPath;
