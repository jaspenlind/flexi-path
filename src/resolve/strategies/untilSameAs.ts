import { FlexiPath, walker } from "../..";

export const untilSameAs = (path: FlexiPath) => {
  return {
    predicate: (current: FlexiPath) => {
      const walked = walker.walk(path, (other: FlexiPath) => {
        return current.path === other.path;
      });

      return !walked.path.isEmpty() && !walked.path.isRoot();
    }
  };
};

export default untilSameAs;
