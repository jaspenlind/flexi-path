import { ParsedPath } from "path";
import { Path, PathType } from ".";

/**
 * Interface describing metadata for a `path`
 * @category path
 */
export interface PathMeta extends ParsedPath {
  /**
   * The `depth` of this `path`
   */
  depth: number;
  /**
   * The normalized `string` representation of the `path`
   */
  path: string;

  segments: string[];

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
}
