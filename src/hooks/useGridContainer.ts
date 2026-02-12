import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "./useWindowsSize";

export const useGridContainer = (gridContaineRef: React.RefObject<any>) => {
  
  const [cardCompH, setCardCompH] = useState(0);
  const [itemsByLine, setItemsByLines] = useState(0);

  const cardRef = useRef<any>(undefined);

  const { width } = useWindowSize();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (gridContaineRef.current.hasChildNodes() === false) return;

    const cardH = gridContaineRef.current.firstChild.clientHeight;

    if (cardH !== cardCompH) {
      const gridW = gridContaineRef.current.clientWidth;
      const cardW = gridContaineRef.current.firstChild.clientWidth;

      setCardCompH(cardH);
      setItemsByLines(Math.floor(gridW / cardW));
    }
    
  }, [width]);

  return { cardCompH, cardRef, itemsByLine };
};
