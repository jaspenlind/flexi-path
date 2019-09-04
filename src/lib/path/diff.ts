import { Path, FlexiPath } from "../..";
import { parse, resolver } from ".";

import { untilSameAs } from "./resolve/strategies";
/**
 * Get the diff for two paths
 * @category path
 * @param path The first `path` to diff
 * @param other The first `path` to diff
 * @returns `diff` of the paths
 */
const diff = (path: Path, other: Path): [FlexiPath, FlexiPath] => {
  return [
    resolver.diff(path, untilSameAs(parse(other))),
    resolver.diff(other, untilSameAs(parse(path)))
  ];
};

export default diff;
