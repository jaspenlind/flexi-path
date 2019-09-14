import { FlexiPath } from ".";

/**
 * Result of a walked `path`
 * @category walker
 */
export interface WalkedPath<T> {
  /**
   * The `path` the `Walker` walked
   */
  result: T;

  /**
   * Then `diff` or `remainder` of the `path` that wasn't `walked`
   */
  diff: T;
}
