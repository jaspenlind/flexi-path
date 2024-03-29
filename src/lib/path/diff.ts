import { FlexiPath, Path } from "../../types";
import walker from "../walker";
/**
 * Get the diff for two paths
 * @category path
 * @param path The first `path` to diff
 * @param other The first `path` to diff
 * @returns `diff` of the paths
 */
export const diff = (path: Path, other: Path): [FlexiPath, FlexiPath] => {
  const first = walker.back(path, { until: walker.until.sameAs(other) });
  const second = walker.back(other, { until: walker.until.sameAs(path) });

  return [first.diff, second.diff];
};
