import { flexi, Path, PathMeta, walker, WalkUntil } from "../..";

/**
 * @category walker
 */
const sameAs = (other: Path): WalkUntil => {
  return (x: PathMeta) => {
    const match = walker.back(other, { until: z => x.path === z.path });

    return match.result !== flexi.empty();
  };
};

export default sameAs;
