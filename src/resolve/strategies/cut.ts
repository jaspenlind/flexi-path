import { FlexiPath } from "../..";

export const cut = (count: number) => {
  let currentCount = 0;

  const predicate = (current: FlexiPath) => {
    const done =
      current.isEmpty() || current.parent().isEmpty() || currentCount >= count;

    currentCount += 1;

    return done;
  };

  return { predicate };
};

export default cut;
