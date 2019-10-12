import {
  ChildQuery,
  FileQuery,
  ParentQuery,
  Path,
  PathMeta,
  ReadOptions,
  SubDirectoryQuery,
  TextTransform,
  PathWalker,
  WriteOptions
} from ".";

/**
 * A flexible `path` builder and walker
 * @category path
 */
export interface FlexiPath extends PathMeta {
  /**
   * The [[subDrirectories]] and [[files]] for a given `path`
   */
  children: ChildQuery;

  /**
   * The files in the current `path`
   */
  files: FileQuery;

  /**
   * The `parent` directory of the `path`
   */
  parent: ParentQuery;

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

  read<T = string>(options?: Partial<ReadOptions>): T | string;

  /**
   * Removes the last segment from the path and returns it.
   */
  pop(): FlexiPath;

  walk(): PathWalker;
  /**
   * Writes the current `path` to disk if possible
   */
  write(content?: any, options?: Partial<WriteOptions>): FlexiPath;
}
