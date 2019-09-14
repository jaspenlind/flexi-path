import { Dirent, readdirSync } from "fs";

import { PathType } from "../../../types";
import { exists, type } from ".";
/**
 * @ignore
 */
const readDir = (path: string): Dirent[] =>
  (exists(path) &&
    type(path) === PathType.Directory &&
    readdirSync(path, { withFileTypes: true })) ||
  [];

export default readDir;
