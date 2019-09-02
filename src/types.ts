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
  (numberOfLevels: number): FlexiPath;
  (until: (current: FlexiPath) => boolean): FlexiPath;

  /**
   * Returns the closest `parent` of the `path`
   */
  (): FlexiPath;
}

/**
 * A flexible `path` builder and walker
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

  hasRoot(): boolean;

  /**
   * `boolean` value representing if the `path` can be created on the disk
   */
  isValid(): boolean;

  /**
   * `boolean` value indicating if the `path` exists or not
   */
  exists(): boolean;
  /**
   * `boolan` value indicatinf if the `path`is empty
   */
  isEmpty(): boolean;
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

  /**
   * Prepends the `path`s to the path
   * @param path The `path` to prepend
   */
  prepend(...paths: Path[]): FlexiPath;

  /**
   * Appends  `path`s to the path
   * @param path The `path` to append
   */
  append(...paths: Path[]): FlexiPath;

  /**
   * Get the diff for two paths
   * @example
   * const first = flexi.path("some/common/and/unique/paths");
   * const second = flexi.path("some/common/with/other/paths");
   * const diff = first.diff(second);
   * //==> [ "and/unique/paths", "with/other/paths" ]
   * @param path The `path` to diff against
   */
  diff(path: Path): [FlexiPath, FlexiPath];

  /**
   * Flattens a `path`
   * @param path The `path` to `flattern`
   * @returns An array with the flatterned `path`
   */
  flatten(): FlexiPath[];

  /**
   * Reverses the `path`
   */
  reverse(): FlexiPath;

  /**
   * Cuts a path
   * @param count Number of levels to cut
   * @returns The cutted `path`
   */
  cut(count: number): FlexiPath;

  /**
   * Intersects paths
   * @param paths The `paths` to `intersect` with
   * @returns The intersected part of the `path`
   */
  intersect(...paths: Path[]): FlexiPath;

  /**
   * Excludes `paths`from a `path`
   * @param paths The `paths`to exclude
   * @returns The `path` except for the `paths` that intersects
   */
  except(...paths: Path[]): FlexiPath;

  /**
   * Writes the current `path` to disk if possible
   */
  write(): void;
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
  predicate?: (current: FlexiPath, state: NavigationState) => boolean;
  /**
   * Callback function for each level navigated in the `path`
   * @param current The current level of the navigated `path`
   */
  onNavigate?(current: FlexiPath, state: NavigationState): NavigationResult;
}

export interface PathExistsOptions {
  ignoreFileExtensions?: boolean;
}

/**
 * The result of a `ResolveOptions`.`onNavigate`
 */
export interface NavigationResult {
  /**
   * The `NavigationState`
   */
  state: NavigationState;
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
export type Path = string | string[] | FlexiPath | PathWithBasePath;

export interface PathWithBasePath {
  basePath: Path;
  path: Path;
}

export type WalkUntil = (current: FlexiPath) => boolean;

export interface WalkedPath {
  path: FlexiPath;
  diff: FlexiPath;
}
