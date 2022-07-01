import { Dirent, readdirSync } from "fs";

import { PathType } from "../../../types";
import { exists, type } from ".";
/**
 * @ignore
 */
export const readDir = (path: string): Dirent[] =>
  (exists(path) && type(path) === PathType.Directory && readdirSync(path, { withFileTypes: true })) || [];
