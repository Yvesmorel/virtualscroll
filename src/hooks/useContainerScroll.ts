import { useState, useEffect, useLayoutEffect } from "react";

export function useContainerScroll(
  mainContaierRef: React.RefObject<any>,
  cardRef: React.RefObject<any>,
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [sliceIndex, setSliceIndex] = useState(0);
  useEffect(() => {
    const mainContainer = mainContaierRef.current;

    const handleScroll = () => {
      const cardH = 435;
      // console.log(mainContainer.scrollTop);

      const computeIndex = Math.floor(mainContainer.scrollTop / (cardH + 104));

      // console.log(computeIndex);

      if (computeIndex !== sliceIndex) setSliceIndex(computeIndex);
    };
    mainContainer.addEventListener("scroll", handleScroll);
    return () => mainContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return { sliceIndex };
}
