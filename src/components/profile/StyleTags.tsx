import { Plus } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

type Props = {
  tags: string[];
  onAddPress?: () => void;
};

export default function StyleTags({ tags, onAddPress }: Props) {
  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}

      <Pressable
        style={styles.addButton}
        onPress={onAddPress}
        accessibilityRole="button"
        accessibilityLabel="系統タグを追加"
      >
        <Plus size={13} color={Colors.subText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  tag: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: Radius.round,
    paddingVertical: 5,
    paddingHorizontal: Spacing.md,
  },
  tagText: {
    fontSize: Typography.caption - 2,
    color: Colors.logo,
    fontWeight: "500",
  },
  addButton: {
    width: 26,
    height: 26,
    borderRadius: Radius.round,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});