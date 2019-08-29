import flexiPath from "./flexiPath";
import { isRoot, root } from "./path";
import resolve from "./resolve";

export * from "./types";
export * from "./subDirectories";
export * from "./files";
export * from "./parent";
export * from "./path";

export default {
  path: flexiPath,
  root: () => flexiPath(root),
  isRoot,
  resolve
};
