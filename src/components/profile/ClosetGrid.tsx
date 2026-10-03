import { Heart, Lock, ShoppingBag } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import type { FeedItem } from "../../types/feed";

type Props = {
  items: FeedItem[];
  onBuyPress?: (item: FeedItem) => void;
  onItemPress?: (item: FeedItem) => void;
};

// ScrollView(ProfileScreen)の中に置くため、あえて FlatList ではなく
// flexWrap のシンプルなグリッドにしている(FlatList を ScrollView に
// ネストすると "VirtualizedLists should never be nested" 警告が出るため)。
export default function ClosetGrid({
  items,
  onBuyPress,
  onItemPress,
}: Props) {
  return (
    <View>
      <View style={styles.note}>
        <Lock size={12} color={Colors.subText} />
        <Text style={styles.noteText}>
          あなただけに見えています。フォロワーにも公開されません
        </Text>
      </View>

      <View style={styles.grid}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={styles.cell}
            onPress={() => onItemPress?.(item)}
            accessibilityRole="button"
            accessibilityLabel={item.productName}
          >
            <Image source={{ uri: item.media }} style={styles.image} />

            <View style={styles.likeBadge}>
              <Heart size={14} color={Colors.white} fill={Colors.white} />
            </View>

            <Pressable
              style={styles.buyButton}
              onPress={(event) => {
                event.stopPropagation();
                onBuyPress?.(item);
              }}
              accessibilityRole="button"
              accessibilityLabel={`${item.productName}を購入する`}
              hitSlop={6}
            >
              <ShoppingBag size={14} color={Colors.logo} />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 4,
  },
  noteText: {
    fontSize: Typography.small,
    color: Colors.subText,
    flexShrink: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
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
  likeBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
  },
  buyButton: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});