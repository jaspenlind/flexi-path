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
