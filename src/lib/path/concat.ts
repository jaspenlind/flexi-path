import { join } from "path";

import { flexi } from "../..";
import { FlexiPath } from "../../types";

/**
 * Concatinates a `path` with other `paths`
 * @category path
 * @param path The `path` to concatinate
 * @param paths One or multiple `paths` to concatinate the `path` with
 */
export const concat = (path: string, ...paths: string[]): FlexiPath => {
  const result = (paths || []).reduce<string>((prev: string, current: string) => {
    return join(prev, current);
  }, path);

  return flexi.path(result);
};
