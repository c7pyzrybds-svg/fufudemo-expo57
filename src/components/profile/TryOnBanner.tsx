import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

type Props = {
  onNotifyPress?: () => void;
  onBodyInfoPress?: () => void;
};

// デザイナー指摘反映:
// - カード背景のグレーのベタ塗り → 白地+細い黒フチ
// - タイトル/説明文/体型情報リンクのテキスト → 黒
// - 唯一の塗り要素として「通知を受け取る」ボタンだけ黒塗りにし、
//   白黒の中でも主要アクションが一目でわかるようにしている
export default function TryOnBanner({
  onNotifyPress,
  onBodyInfoPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>3Dで試着してみる</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>近日公開</Text>
          </View>
        </View>

        <Text style={styles.description}>
          あなたの体型で服の着用イメージを確認できます
        </Text>

        <View style={styles.footerRow}>
          <Pressable
            style={styles.notifyButton}
            onPress={onNotifyPress}
            accessibilityRole="button"
            accessibilityLabel="試着シミュレーションの通知を受け取る"
          >
            <Text style={styles.notifyText}>通知を受け取る</Text>
          </Pressable>

          <Pressable
            style={styles.bodyInfoLink}
            onPress={onBodyInfoPress}
            accessibilityRole="button"
            accessibilityLabel="体型情報を設定する"
          >
            <Text style={styles.bodyInfoText}>体型情報を設定</Text>
            <ChevronRight size={12} color={Colors.black} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.black,
  },
  badge: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
    borderRadius: Radius.round,
    paddingVertical: 3,
    paddingHorizontal: Spacing.sm,
  },
  badgeText: {
    fontSize: Typography.small - 1,
    color: Colors.black,
    fontWeight: "500",
  },
  description: {
    fontSize: Typography.caption - 2,
    color: Colors.black,
    marginBottom: Spacing.md,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifyButton: {
    backgroundColor: Colors.black,
    borderRadius: Radius.round,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  notifyText: {
    fontSize: Typography.caption,
    fontWeight: "500",
    color: Colors.white,
  },
  bodyInfoLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  bodyInfoText: {
    fontSize: Typography.small,
    color: Colors.black,
  },
});
