import { useEffect, useLayoutEffect, useState } from "react";
import { ItemData } from "../deifinitions";
import { data, firstBottomBuffer, firstData, ITEM_LENGTH } from "../data";

export const useData = (sliceIndex: number) => {
  const [topBuffuer, setTopBuffer] = useState<ItemData[]>([]);
  const [main, setMain] = useState(firstData);
  const [bottomBuffer, setBottomBuffer] =
    useState<ItemData[]>(firstBottomBuffer);

  useEffect(() => {
    setTopBuffer(data.slice(Math.max(0, sliceIndex * 4 - 8), sliceIndex * 4));
    setMain(data.slice(sliceIndex * 4, ITEM_LENGTH + sliceIndex * 4));
    setBottomBuffer(
      data.slice(
        ITEM_LENGTH + sliceIndex * 4,
        Math.min(data.length, ITEM_LENGTH + sliceIndex * 4 + 8),
      ),
    );
    // console.log(sliceIndex);

    // console.log(
    //   "TOP",
    //   data.slice(Math.max(0, sliceIndex * 4 - 8), sliceIndex * 4),
    // );

    // console.log(
    //   "MAIN",
    //   data.slice(sliceIndex * 4, ITEM_LENGTH + sliceIndex * 4),
    // );

    // console.log(
    //   "BOTTOM",
    //   data.slice(
    //     ITEM_LENGTH + sliceIndex * 4,
    //     Math.min(data.length, ITEM_LENGTH + sliceIndex * 4 + 8),
    //   ),
    // );
  }, [sliceIndex]);

  return { topBuffuer, main, bottomBuffer };
};
