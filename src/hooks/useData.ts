import { useLayoutEffect, useState } from "react";

import { BUFFER_SIZE, data, firstData } from "../data";


const TOP_BUFFER_SIZE = BUFFER_SIZE;
const BOTTOM_BUFFER_SIZE = BUFFER_SIZE;

//j'ai un buffer de 3 lignes en haut et en bas
//itemsByLine c'est le nombre d'elements par ligne
//windowLines c'est le nombre de lignes pour la fenetre d'affichage

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
