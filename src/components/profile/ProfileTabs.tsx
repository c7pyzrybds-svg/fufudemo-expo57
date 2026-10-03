import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export type ProfileTab = "closet" | "posts";

type Props = {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export default function ProfileTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TabButton
        label="クローゼット"
        active={active === "closet"}
        onPress={() => onChange("closet")}
      />
      <TabButton
        label="マイ投稿"
        active={active === "posts"}
        onPress={() => onChange("posts")}
      />
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.tab, active ? styles.tabActive : styles.tabInactive]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    flex: 1,
    borderRadius: Radius.round,
    paddingVertical: Spacing.sm + 2,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: Colors.text,
  },
  tabInactive: {
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  tabText: {
    fontSize: Typography.caption,
    fontWeight: "500",
    color: Colors.subText,
  },
  tabTextActive: {
    color: Colors.white,
  },
});