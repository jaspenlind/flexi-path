import { FlexiPath, ResolveOptions } from "../../..";

export const parentUntil = (
  condition: (current: FlexiPath) => boolean
): ResolveOptions => {
  const predicate = (current: FlexiPath) => condition(current);

  return { predicate };
};

export default parentUntil;
