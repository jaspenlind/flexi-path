import { FlexiPath, ResolveOptions, PathResolverStrategy } from "../..";

const resolve = (): ResolveOptions => {
  return { predicate: (current: FlexiPath) => current.exists() };
};

export const pathExists = (): PathResolverStrategy => {
  return {
    resolve
  };
};

export default pathExists;
