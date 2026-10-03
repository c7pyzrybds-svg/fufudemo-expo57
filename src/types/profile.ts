export type PostVisibility = "public" | "followers";

export interface Post {
  id: string;
  media: string;
  reach: number;
  visibility: PostVisibility;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarInitial: string;
  followingCount: number;
  followerCount: number;
  styleTags: string[];
}