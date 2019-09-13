import { Walking, WalkUntil } from ".";

/**
 * Options defining how the [[walker]] should walk
 * @category walker
 */
export interface WalkOptions {
  until?: WalkUntil;
  onWalk?: Walking;
}
