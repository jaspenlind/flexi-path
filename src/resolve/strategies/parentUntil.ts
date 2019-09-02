import { FlexiPath } from "../..";

export const parentUntil = (condition: (current: FlexiPath) => boolean) => {
  const predicate = (current: FlexiPath) => condition(current);

  return { predicate };
};

export default parentUntil;
