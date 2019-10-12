import { readFileSync } from "fs";
import { create, ReadOptions } from "../../models/readOptions";

import { PathMeta, PathType, TextTransform } from "../../types";

/**
 * @category path
 */
const read = <T = string>(path: PathMeta, options?: Partial<ReadOptions>): T | string => {
  if (path.type() !== PathType.File) {
    return "";
  }

  const { encoding, transform } = create(options);

  const content = readFileSync(path.path, encoding);

  if (transform === TextTransform.JSON) {
    const parsed: T = JSON.parse(content);

    return parsed;
  }
  return content;
};

export default read;
