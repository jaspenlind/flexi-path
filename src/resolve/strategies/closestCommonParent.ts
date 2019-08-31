import flexi, { FlexiPath, ResolveOptions } from "../..";
import { equals } from ".";

const resolve = (path: FlexiPath): ResolveOptions => {
  let parent: FlexiPath | null;
  const predicate = (current: FlexiPath) => {
    if (parent === undefined) {
      parent = path;
    } else {
      parent = parent && parent.parent();
    }

    return (parent && flexi.resolve(parent, equals(current))) !== null;
  };

  return {
    predicate
  };
};

export const closestCommonParent = (path: FlexiPath) => ({
  resolve: () => resolve(path)
});

export default closestCommonParent;
