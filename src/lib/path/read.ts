import { readFileSync } from "fs";
import { create, ReadOptions } from "../../models/readOptions";

import { PathMeta, PathType, TextTransform } from "../../types";

/**
 * @category path
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const read = (path: PathMeta, options?: Partial<ReadOptions>): any => {
  if (path.type() !== PathType.File) {
    return "";
  }

  const { encoding, transform } = create(options);

  const content = readFileSync(path.path, { encoding });

  if (transform === TextTransform.JSON) {
    const parsed = JSON.parse(content);

    return parsed;
  }
  return content;
};

export default read;
