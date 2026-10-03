import { Eye, Globe, Users } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import type { Post } from "../../types/profile";

type Props = {
  posts: Post[];
  onPostPress?: (post: Post) => void;
};

function formatReach(reach: number): string {
  if (reach >= 1000) {
    return `${(reach / 1000).toFixed(1)}k`;
  }
  return String(reach);
}

// ClosetGrid と同様、ScrollView にネストするため FlatList ではなく
// flexWrap グリッドで実装している。
export default function PostsGrid({ posts, onPostPress }: Props) {
  return (
    <View style={styles.grid}>
      {posts.map((post) => (
        <Pressable
          key={post.id}
          style={styles.cell}
          onPress={() => onPostPress?.(post)}
          accessibilityRole="button"
          accessibilityLabel={
            post.visibility === "public"
              ? "全体公開の投稿"
              : "フォロワー限定の投稿"
          }
        >
          <Image source={{ uri: post.media }} style={styles.image} />

          <View style={styles.visibilityBadge}>
            {post.visibility === "public" ? (
              <Globe size={14} color={Colors.white} />
            ) : (
              <Users size={14} color={Colors.white} />
            )}
          </View>

          <View style={styles.reachBadge}>
            <Eye size={11} color={Colors.white} />
            <Text style={styles.reachText}>{formatReach(post.reach)}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  cell: {
    width: "48%",
    aspectRatio: 0.8,
    borderRadius: Radius.md,
    overflow: "hidden",
    backgroundColor: Colors.border,
    marginBottom: Spacing.sm,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  visibilityBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
  },
  reachBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    left: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(51,51,51,0.55)",
    borderRadius: Radius.round,
    paddingVertical: 3,
    paddingHorizontal: Spacing.sm,
  },
  reachText: {
    fontSize: Typography.small - 1,
    color: Colors.white,
    fontWeight: "500",
  },
});