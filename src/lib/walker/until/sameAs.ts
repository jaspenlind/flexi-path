import { flexi, Path, PathMeta, WalkUntil } from "../..";

/**
 * @category walker
 */
const sameAs = (other: Path): WalkUntil => {
  return (x: PathMeta) => {
    const match = flexi.walk.back(other, { until: z => x.path === z.path });

    return match.result !== flexi.empty();
  };
};

export default sameAs;
