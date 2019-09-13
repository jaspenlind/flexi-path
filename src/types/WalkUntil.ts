import { PathMeta } from ".";

/**
 * `Walker` predicate
 * @category walker
 * @param current The current `walked` `path`
 * @returns `boolean` value indicating if walking should continue or not
 */
export type WalkUntil = (current: PathMeta) => boolean;
