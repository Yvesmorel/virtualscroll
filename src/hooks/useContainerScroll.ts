import { useState, useEffect, useLayoutEffect } from "react";
import { ItemData } from "../deifinitions";
import { firstBottomBuffer, firstData } from "../data";

export function useContainerScroll(
  mainContaierRef: React.RefObject<any>,
  cardRef: React.RefObject<any>,
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [topBuffuer, setTopBuffer] = useState<ItemData[]>([]);
  const [main, setMain] = useState(firstData);
  const [bottomBuffer, setBottomBuffer] =
    useState<ItemData[]>(firstBottomBuffer);
  useEffect(() => {
    const mainContainer = mainContaierRef.current;

    const handleScroll = () => {
      const cardH = 435;
      // console.log(mainContainer.scrollTop);

      const computeIndex = Math.floor(mainContainer.scrollTop / (cardH + 32));

      setSliceIndex(computeIndex);
    };
    mainContainer.addEventListener("scroll", handleScroll);
    return () => mainContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return { sliceIndex };
}
