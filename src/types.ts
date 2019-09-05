import { ParsedPath } from "path";

/**
 * `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
 * on disk is `Unknown`
 * @category path
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
 * @category path
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
 * @category path
 */
export interface ParentQuery {
  /**
   * Returns the `parent` `numberOfLevels` levels up
   * @category path
   */
  (numberOfLevels: number): FlexiPath;
  (until: (current: FlexiPath) => boolean): FlexiPath;

  /**
   * Returns the closest `parent` of the `path`
   */
  (): FlexiPath;
}

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
   * Walks the `path` until a [[predicate|condition]] is met
   */
  resolve: (path: Path, options: ResolveOptions) => FlexiPath;
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
}

/**
 * A flexible `path` builder and walker
 * @category path
 */
export interface FlexiPath extends ParsedPath {
  /**
   * The normalized `string` representation of the `path`
   * */
  path: string;
  /**
   * `boolean` value indicating if the `path` is [[root]] path
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
   * `boolean` value indicating if the `path`is [[empty]]
   */
  isEmpty(): boolean;
  /**
   * [[PathType]] enum. Possible values: [[Directory]] | [[File]] | [[Unknown]].
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
   * ```typescript
   * const first = flexi.path("some/common/and/unique/paths");
   * const second = flexi.path("some/common/with/other/paths");
   * const diff = first.diff(second);
   * //==> [ "and/unique/paths", "with/other/paths" ]
   * ```
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
   * Reverses a `path`
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

  /**
   * The `depth` of this `path`
   */
  depth(): number;
}

/**
 * Represents the current state when navigating a `path`
 * @category resolver
 */
export enum NavigationState {
  /**
   * Default state
   * @category walker
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
 * @category resolver
 */
export interface ResolveOptions {
  /**
   * Condition that has to be met to indicate the `path` is a match
   * @param current The current level of the walked `path`
   */
  predicate?: (current: FlexiPath, state: NavigationState) => boolean;
  /**
   * Called on each level walking a `path`
   * @param current The current level of the walked `path`
   */
  onNavigate?(current: FlexiPath, state: NavigationState): NavigationResult;
}

/**
 * @category resolver
 */
export interface PathExistsOptions {
  ignoreFileExtensions?: boolean;
}

/**
 * The result of a `ResolveOptions`.`onNavigate`
 * @category resolver
 */
export interface NavigationResult {
  /**
   * The `NavigationState`
   */
  state: NavigationState;
}

/**
 * a `string`, `string[]` or a `FlexiPath` with or without a `baseBath` representing a file path or any arbitrary path
 * @category path
 */
export type Path = string | string[] | FlexiPath | PathWithBasePath;

/**
 * A `path` with a `basePath`
 * @category path
 */
export interface PathWithBasePath {
  basePath: Path;
  path: Path;
}

/**
 * `Walker` predicate
 * @category walker
 * @param current The current `walked` `path`
 * @returns `boolean` value indicating if walking should continue or not
 */
export type WalkUntil = (current: FlexiPath) => boolean;

/**
 * A `Walker` walked `path`
 * @category walker
 */
export interface WalkedPath {
  /**
   * The `path` the `Walker` walked
   */
  path: FlexiPath;
  /**
   * Then `diff` or `remainder` of the `path` that wasn't `walked`
   */
  diff: FlexiPath;
}
