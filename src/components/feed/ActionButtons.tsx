/**
 * ActionButtons
 * ─────────────
 * FUFUSA の実アイコンアセット(assets/images/icons/*.svg)を使った3ボタン。
 * 円の直径比は元デザインのスクリーンショットから実測した
 *   スキップ/バッグ相当のボタン : クローゼットボタン = 119px : 159px ≒ 3 : 4
 * をそのまま維持している(SECONDARY_SIZE を変えれば PRIMARY_SIZE も連動する)。
 *
 * 役割:
 * - skip  (dislike.svg) … スキップ。SwipeableFeedCard.skip() と連携させる想定
 * - buy   (buy.svg)     … バッグに追加。カードは進めない単発アクション
 * - like  (closet.svg)  … クローゼットに保存。SwipeableFeedCard.like() と連携させる想定
 *
 * アイコン自体の色はあえて上書きしていない(アセット側の色をそのまま使用)。
 * サイズだけ ICON_FILL_RATIO でボタン直径に対する割合を指定している。
 * 実機で見て大きすぎ/小さすぎる場合は ICON_FILL_RATIO を調整してください。
 */
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// eslint-disable-next-line import/no-unresolved
import BuyIcon from "../../../assets/images/icons/buy.svg";
// eslint-disable-next-line import/no-unresolved
import ClosetIcon from "../../../assets/images/icons/closet.svg";
// eslint-disable-next-line import/no-unresolved
import DislikeIcon from "../../../assets/images/icons/dislike.svg";
import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Shadows } from "../../theme/shadows";
import { Spacing } from "../../theme/spacing";

// 元デザイン実測比(直径 119:119:159 ≒ 3:3:4)。SECONDARY_SIZE だけ変えれば
// PRIMARY_SIZE が自動で連動する。
export const SECONDARY_SIZE = 60;
export const PRIMARY_SIZE = Math.round(SECONDARY_SIZE * (150 / 119)); // = 80

// アイコンがボタン直径に対して占める割合。実アセットの内部余白量が
// 不明なため暫定値(0.56)。実機プレビューを見て調整してください。
const ICON_FILL_RATIO = 0.70;

// ボタン間の隙間(edge-to-edge)。この1箇所を変えるだけで詰め/広げができる。
const BUTTON_GAP = 34;

// justifyContent:'center' + gap で3ボタンを詰めると、右のクローゼット
// ボタン(PRIMARY_SIZE)だけ大きい分、グループ全体の重心が右へ寄り、
// 中央のバッグボタンが画面中央から左にズレる。そのズレ量は
// (PRIMARY_SIZE - SECONDARY_SIZE) / 2 なので、行全体をその分だけ
// 右へ平行移動して打ち消す。
const CENTER_OFFSET = (PRIMARY_SIZE - SECONDARY_SIZE) / 2;

const SPRING_CONFIG = { damping: 14, stiffness: 260, mass: 0.5 };

type ActionButtonsProps = {
  /** スキップ(dislike)。カードは進む */
  onSkip?: () => void;
  /** バッグに追加。カードは進めない */
  onBuy?: () => void;
  /** クローゼットに保存(like)。カードは進む */
  onLike?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function ActionButtons({
  onSkip,
  onBuy,
  onLike,
  disabled = false,
  style,
}: ActionButtonsProps) {
  const secondaryIconSize = SECONDARY_SIZE * ICON_FILL_RATIO;
  const primaryIconSize = PRIMARY_SIZE * ICON_FILL_RATIO;

  return (
    <View style={[styles.row, style]}>
      {/* gap で詰めた3ボタンを、CENTER_OFFSET 分だけ右へ平行移動することで、
          バッグボタンの中心を画面中央(=下部メニューの「＋」)に一致させる。 */}
      <View style={[styles.group, { transform: [{ translateX: CENTER_OFFSET }] }]}>
        <CircleButton
          size={SECONDARY_SIZE}
          backgroundColor={Colors.surface}
          disabled={disabled}
          hapticStyle={Haptics.ImpactFeedbackStyle.Light}
          onPress={onSkip}
          accessibilityLabel="スキップ"
        >
          <DislikeIcon width={secondaryIconSize} height={secondaryIconSize} />
        </CircleButton>

        <CircleButton
          size={SECONDARY_SIZE}
          backgroundColor={Colors.surface}
          disabled={disabled}
          hapticStyle={Haptics.ImpactFeedbackStyle.Light}
          onPress={onBuy}
          accessibilityLabel="バッグに追加"
        >
          <BuyIcon width={secondaryIconSize} height={secondaryIconSize} />
        </CircleButton>

        <CircleButton
          size={PRIMARY_SIZE}
          backgroundColor={Colors.closet}
          disabled={disabled}
          hapticStyle={Haptics.ImpactFeedbackStyle.Medium}
          onPress={onLike}
          accessibilityLabel="クローゼットに保存"
        >
          <ClosetIcon width={primaryIconSize} height={primaryIconSize} />
        </CircleButton>
      </View>
    </View>
  );
}

type CircleButtonProps = {
  size: number;
  backgroundColor: string;
  onPress?: () => void;
  disabled?: boolean;
  hapticStyle: Haptics.ImpactFeedbackStyle;
  accessibilityLabel: string;
  children: React.ReactNode;
};

function CircleButton({
  size,
  backgroundColor,
  onPress,
  disabled,
  hapticStyle,
  accessibilityLabel,
  children,
}: CircleButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.88, SPRING_CONFIG);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG);
  };

  const handlePress = () => {
    if (disabled || !onPress) return;
    Haptics.impactAsync(hapticStyle);
    onPress();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: Radius.round,
            backgroundColor,
            opacity: disabled ? 0.4 : 1,
          },
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 21,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: BUTTON_GAP,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.card,
  },
});