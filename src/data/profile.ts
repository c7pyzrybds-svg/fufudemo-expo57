import type { Post, UserProfile } from "../types/profile";

export const userProfile: UserProfile = {
  name: "Shion",
  handle: "@shion_fufusa",
  avatarInitial: "S",
  followingCount: 128,
  followerCount: 1024,
  styleTags: ["ノスタルジー", "Y2K", "スナ", "ストリート"],
};

// クローゼット(likeしたアイテム)は既存の feedData をそのまま流用する想定。
// 実際にはユーザーごとの「liked item id一覧」から feedData/商品DBを引く形に
// 差し替える。

export const myPosts: Post[] = [
  {
    id: "p1",
    media: "https://picsum.photos/500/625?post1",
    reach: 2100,
    visibility: "public",
  },
  {
    id: "p2",
    media: "https://picsum.photos/500/625?post2",
    reach: 890,
    visibility: "followers",
  },
  {
    id: "p3",
    media: "https://picsum.photos/500/625?post3",
    reach: 5600,
    visibility: "public",
  },
  {
    id: "p4",
    media: "https://picsum.photos/500/625?post4",
    reach: 1300,
    visibility: "public",
  },
];