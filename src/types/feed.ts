export type FeedType = "image" | "video";

export interface FeedItem {
  id: string;

  type: FeedType;

  media: string;

  score: number;

  brand: string;

  productName: string;

  price: number;

  scene: string;
}