import { FlexiPath, WalkOptions } from ".";

export interface PathWalker {
  forward: (options?: WalkOptions) => FlexiPath[];
  back: (options?: WalkOptions) => FlexiPath;
}
