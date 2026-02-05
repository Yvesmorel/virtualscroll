import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "./useWindowsSize";
import { FACTOR } from "../utils";

export const useGridContainerH = () => {
  const [gridContainerH, setGridContainerH] = useState(0);
  const cardRef = useRef<any>(undefined);

  const { width } = useWindowSize();

  useEffect(() => {
    const cardH = 435;
    setGridContainerH(FACTOR * (cardH + 104));
  }, [width]);

  return { gridContainerH, cardRef };
};
