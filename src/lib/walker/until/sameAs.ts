import { flexi } from "../../..";
import { Path, PathMeta, WalkUntil } from "../../../types";
/**
 * @category walker
 */
export const sameAs =
  (other: Path): WalkUntil =>
  (x: PathMeta) => {
    const match = flexi.walk.back(other, { until: (z) => x.path === z.path });

    return match.result !== flexi.empty() && match.result !== flexi.root();
  };
