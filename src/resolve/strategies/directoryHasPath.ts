import { FlexiPath, ResolveOptions, PathResolverStrategy } from "../..";

const resolve = (path: FlexiPath): ResolveOptions => {
  return { predicate: (current: FlexiPath) => current.path === path.path };
};

export const directoryHasPath = (path: FlexiPath): PathResolverStrategy => {
  return {
    resolve: () => resolve(path)
  };
};

export default directoryHasPath;
