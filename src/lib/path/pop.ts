import { flexi } from "..";
import { FlexiPath } from "../../types";
import { isEmpty, isRoot, segments } from "./meta";

const pop = (path: string): FlexiPath => {
  if (isEmpty(path)) {
    return flexi.empty();
  }

  if (isRoot(path)) {
    return flexi.root();
  }

  return flexi.path(segments(path).pop() || flexi.empty().path);
};

export default pop;
