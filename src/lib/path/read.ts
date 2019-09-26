import { readFileSync } from "fs";

import { PathMeta, PathType, TextTransform } from "../../types";

/**
 * @category path
 */
const read = (
  path: PathMeta,
  {
    encoding = "utf8",
    transform = TextTransform.Plain
  }: { encoding?: string; transform?: TextTransform } = {}
): any => {
  if (path.type() !== PathType.File) {
    return "";
  }
  const content = readFileSync(path.path, encoding);

  if (transform === TextTransform.JSON) {
    return JSON.parse(content);
  }
  return content;
};

export default read;
