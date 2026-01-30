export type ItemData = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export type GalleryProps = {
  items: ItemData[];
};
