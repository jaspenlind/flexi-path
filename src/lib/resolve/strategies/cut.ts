import { FlexiPath, ResolveOptions } from "../../..";

export const cut = (count: number): ResolveOptions => {
  let currentCount = 0;

  const predicate = (current: FlexiPath): boolean => {
    const done =
      current.isEmpty() || current.parent().isEmpty() || currentCount >= count;

    currentCount += 1;

    return done;
  };

  return { predicate };
};

export default cut;
