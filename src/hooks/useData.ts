import { useLayoutEffect, useState } from "react";

import { BUFFER_SIZE, data, firstData } from "../data";
import { useWindowSize } from "./useWindowsSize";

const TOP_BUFFER_SIZE = BUFFER_SIZE;
const BOTTOM_BUFFER_SIZE = BUFFER_SIZE;

export const useData = (
  sliceIndex: number,
  itemsByLine: number,
  windowLines: number,
) => {
  const [main, setMain] = useState(firstData);

  useLayoutEffect(() => {
    setMain(
      data.slice(
        Math.max(sliceIndex - TOP_BUFFER_SIZE, 0) * itemsByLine,
        Math.min(
          data.length,
          (windowLines + BOTTOM_BUFFER_SIZE) * itemsByLine +
            sliceIndex * itemsByLine,
        ),
      ),
    );

    
  }, [sliceIndex, itemsByLine, windowLines]);

  return { main };
};
