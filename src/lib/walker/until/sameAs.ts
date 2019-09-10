import walker from "..";
import flexi, { Path, PathMeta, WalkUntil } from "../../..";

const sameAs = (other: Path): WalkUntil => {
  return (x: PathMeta) => {
    const match = walker.walkBack(other, { until: z => x.path === z.path });

    return match.result !== flexi.empty();
  };
};

export default sameAs;
