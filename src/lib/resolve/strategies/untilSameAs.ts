import { FlexiPath, PathMeta, ResolveOptions } from "../../..";
import walker from "../../walker";

/**
 * Walks two `paths` until they are same
 * @category resolver
 * @param path The `path` to compare with
 */
const untilSameAs = (path: FlexiPath): ResolveOptions => {
  return {
    predicate: (current: PathMeta) => {
      const walked = walker.walkBack(path, {
        until: (other: PathMeta) => {
          return current.path === other.path;
        }
      });

      return !walked.result.isEmpty() && !walked.result.isRoot();
    }
  };
};

export default untilSameAs;
