import { flexiPath, isRoot, resolve, root } from "./types";

export * from "./types";

export default {
  path: flexiPath,
  root: () => flexiPath(root),
  isRoot,
  resolve
};
