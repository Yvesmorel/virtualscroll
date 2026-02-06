import { GalleryProps, ItemData } from "../deifinitions";
import json from "./items_100000.json";
export const ITEM_LENGTH = 8;
const data = json as ItemData[];

const firstData = data.slice(0, ITEM_LENGTH*4);
const firstBottomBuffer = data.slice(ITEM_LENGTH, ITEM_LENGTH * 2);
export { data, firstData, firstBottomBuffer };
