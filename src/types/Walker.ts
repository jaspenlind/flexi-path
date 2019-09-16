import { FlexiPath, Path, WalkOptions, WalkedPath } from ".";

/** @category walker */
export interface Walker {
  forward: (path: Path, options?: WalkOptions) => WalkedPath<FlexiPath[]>;
  back: (
    path: Path,
    options?: WalkOptions,
    acc?: FlexiPath
  ) => WalkedPath<FlexiPath>;
}
