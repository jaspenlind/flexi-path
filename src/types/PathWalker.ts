import { FlexiPath, WalkOptions } from ".";

/**
 * @category walker
 */
export interface PathWalker {
  forward: (options?: WalkOptions) => FlexiPath[];
  back: (options?: WalkOptions) => FlexiPath;
}
