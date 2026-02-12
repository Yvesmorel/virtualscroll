import { useState, useEffect, useLayoutEffect } from "react";

import { GRID_GAP } from "../utils";
import { useWindowSize } from "./useWindowsSize";

export function useContainerScroll(
  mainContaierRef: React.RefObject<any>,
  cardCompH: number,
) {
  const [sliceIndex, setSliceIndex] = useState(0);

  useEffect(() => {
    const mainContainer = mainContaierRef.current;

    const handleScroll = () => {
      const computeIndex = Math.floor(
        mainContainer.scrollTop / (cardCompH + GRID_GAP),
      );

      console.log("POSITION_____",computeIndex,);
      
      setSliceIndex(computeIndex);
    };
     
    mainContainer.addEventListener("scroll", handleScroll);
    return () => mainContainer.removeEventListener("scroll", handleScroll);
  }, [cardCompH]);

  return { sliceIndex };
}
