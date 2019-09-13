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
