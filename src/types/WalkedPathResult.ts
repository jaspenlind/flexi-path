import { FlexiPath } from ".";

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
