import flexi, { FlexiPath, Path } from "..";
import { cut as cutStrategy } from "./resolve/strategies";

/**
 * Cuts a path
 * @category path
 * @param count Number of levels to cut
 * @returns The cutted `path`
 */
const cut = (path: Path, count: number): FlexiPath => {
  return flexi.resolve(path, cutStrategy(count)) || flexi.empty();
};

export default cut;
