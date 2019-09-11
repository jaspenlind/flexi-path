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
    condition: (current: T) => boolean,
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

/**
 * Interface describing metadata for a `path`
 * @category path
 */
export interface PathMeta extends ParsedPath {
  /**
   * The normalized `string` representation of the `path`
   */
  path: string;
  /**
   * `boolean` value indicating if the `path` is [[root]] path
   */
  isRoot(): boolean;

  /**
   * `boolean` value indicating if the `path` has a [[root]]
   */
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
   * Checks if this `path` equals another `path`
   * @param other the `path` to compare with
   * @param options options
   */
  equals(other: Path, options?: { ignoreFileExtension?: boolean }): boolean;
  /**
   * `boolean` value indicating if the `path`is [[empty]]
   */
  isEmpty(): boolean;
  /**
   * [[PathType]] enum. Possible values: [[Directory]] | [[File]] | [[Unknown]].
   */
  type(): PathType;

  /**
   * The `depth` of this `path`
   */
  depth: number;
}
/**
 * A flexible `path` builder and walker
 * @category path
 */
export interface FlexiPath extends PathMeta {
  /**
   * The `parent` directory of the `path`
   */
  parent: ParentQuery;

  /**
   * The [[subDrirectories]] and [[files]] for a given `path`
   */
  children: ChildQuery;

  /**
   * The subdirectories of the `path` and a `path` builder
   */
  subDirectories: SubDirectoryQuery;

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
   * The files in the current `path`
   */
  files: FileQuery;

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
  write(): FlexiPath;
}

/**
 * Options defining how the [[walker]] should walk
 * @category walker
 */
export interface WalkOptions {
  until?: WalkUntil;
  onWalk?: Walking;
}

/**
 * Represents the current state when navigating a `path`
 * @category walker
 */
export enum WalkedState {
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
 * a `string`, `string[]` or a `FlexiPath` with or without a `baseBath` representing a file path or any arbitrary path
 * @category path
 */
export type Path = string | string[] | PathWithBasePath | PathMeta | FlexiPath;

/**
 * Enumeration of different types that can be a `Path`
 * @category path
 */
export enum PathKind {
  Unknown = 0,
  String = 1,
  Array = 2,
  PathWithBasePath = 3,
  PathMeta = 4,
  FlexiPath = 5
}

/**
 * Path visitor
 * @category path
 */
export interface PathVistor<T> {
  visit(path: Path): T;
}

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
export type WalkUntil = (current: PathMeta) => boolean;

/**
 * @category walker
 */
export type Walking = (current: { path: PathMeta; state: WalkedState }) => void;

/**
 * A `Walker` walked `path`
 * @category walker
 */
export interface WalkedPathResult<T> {
  /**
   * The `path` the `Walker` walked
   */
  result: T;

  /**
   * Then `diff` or `remainder` of the `path` that wasn't `walked`
   */
  diff: T;
}
/**
 * Result of a walked `path``
 * @category walker
 */
export type BackwardsWalkedPath = WalkedPathResult<FlexiPath>;
