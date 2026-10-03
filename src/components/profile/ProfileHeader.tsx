import { Pencil } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import type { UserProfile } from "../../types/profile";

type Props = {
  profile: UserProfile;
  onEditPress?: () => void;
};

export default function ProfileHeader({ profile, onEditPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{profile.avatarInitial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {profile.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {profile.handle} ・ {profile.followingCount}人をフォロー中
        </Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="プロフィールを編集"
      >
        <Pencil size={13} color={Colors.logo} />
        <Text style={styles.editText}>編集</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: Typography.subheading,
    fontWeight: "600",
    color: Colors.white,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: Typography.subheading,
    fontWeight: "600",
    color: Colors.text,
  },
  sub: {
    fontSize: Typography.caption,
    color: Colors.subText,
    marginTop: 2,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: Radius.round,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  editText: {
    fontSize: Typography.caption,
    color: Colors.logo,
    fontWeight: "500",
  },
});