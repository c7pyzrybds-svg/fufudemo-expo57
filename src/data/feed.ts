import type { FeedItem } from "../types/feed";

export const feedData: FeedItem[] = [
  {
    id: "1",

    type: "image",

    media: "https://picsum.photos/700/1000?1",

    score: 91,

    brand: "FUFUSA ORIGINAL",

    productName: "Linen Relax Shirt",

    price: 8900,

    scene: "初デート",
  },

  {
    id: "2",

    type: "video",

    media:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

    score: 95,

    brand: "FUFUSA SELECT",

    productName: "Summer Set-up",

    price: 12800,

    scene: "旅行",
  },
];