import { Lock } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

type Props = {
  closetCount: number;
  postCount: number;
  followerCount: number;
};

export default function ProfileStats({
  closetCount,
  postCount,
  followerCount,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.value}>{closetCount}</Text>
        <View style={styles.labelRow}>
          <Lock size={11} color={Colors.subText} />
          <Text style={styles.label}>クローゼット</Text>
        </View>
      </View>

      <View style={[styles.item, styles.itemBordered]}>
        <Text style={styles.value}>{postCount}</Text>
        <Text style={styles.label}>投稿</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.value}>{followerCount.toLocaleString()}</Text>
        <Text style={styles.label}>フォロワー</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  itemBordered: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  value: {
    fontSize: Typography.subheading,
    fontWeight: "600",
    color: Colors.text,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  label: {
    fontSize: Typography.small,
    color: Colors.subText,
    marginTop: 2,
  },
});