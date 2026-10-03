/**
 * SwipeableFeedCard
 * ──────────────────
 * 既存の FeedCard をラップし、Tinder のようなドラッグ→フリック挙動を追加する。
 *
 * - 右スワイプ / 右フリック(閾値超え) → 「like」扱い(クローゼットに保存)
 * - 左スワイプ / 左フリック(閾値超え) → 「skip」扱い
 * - 閾値未満で指を離す                → 中央にバネで戻る
 *
 * ActionButtons から直接カードを動かせるように、ref 経由で
 * like() / skip() を公開している(ボタンタップでも指で払ったのと同じ
 * アニメーションが起きる)。
 */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "../../theme/colors";
import type { FeedItem } from "../../types/feed";

import FeedCard from "./FeedCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;
const OFFSCREEN_X = SCREEN_WIDTH * 1.4;
const ROTATION_DEG = 12;

const SPRING_BACK = { damping: 18, stiffness: 220, mass: 0.6 };
const FLY_OUT = { duration: 240 };

type SwipeDirection = "left" | "right";

export type SwipeableFeedCardHandle = {
  /** クローゼットボタンから呼ぶ。右へ送り出す(= like)。 */
  like: () => void;
  /** スキップボタンから呼ぶ。左へ送り出す(= skip)。 */
  skip: () => void;
};

type Props = {
  item: FeedItem;
  onLike?: () => void;
  onSkip?: () => void;
};

const SwipeableFeedCard = forwardRef<SwipeableFeedCardHandle, Props>(
  ({ item, onLike, onSkip }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // 最新のコールバックを ref で保持(worklet からの runOnJS 経由呼び出しで
    // 古い props を参照してしまうのを防ぐ)
    const onLikeRef = useRef(onLike);
    const onSkipRef = useRef(onSkip);
    onLikeRef.current = onLike;
    onSkipRef.current = onSkip;

    const handleFlyOutComplete = useCallback((direction: SwipeDirection) => {
      if (direction === "right") {
        onLikeRef.current?.();
      } else {
        onSkipRef.current?.();
      }
    }, []);

    // 新しいアイテムが表示されたら、カードを中央にリセットする
    useEffect(() => {
      translateX.value = 0;
      translateY.value = 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    useImperativeHandle(ref, () => ({
      like: () => {
        translateX.value = withTiming(OFFSCREEN_X, FLY_OUT, (finished) => {
          if (finished) runOnJS(handleFlyOutComplete)("right");
        });
      },
      skip: () => {
        translateX.value = withTiming(-OFFSCREEN_X, FLY_OUT, (finished) => {
          if (finished) runOnJS(handleFlyOutComplete)("left");
        });
      },
    }));

    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX;
        translateY.value = e.translationY * 0.25;
      })
      .onEnd((e) => {
        const shouldLike =
          translateX.value > SWIPE_THRESHOLD || e.velocityX > 800;
        const shouldSkip =
          translateX.value < -SWIPE_THRESHOLD || e.velocityX < -800;

        if (shouldLike) {
          translateX.value = withTiming(OFFSCREEN_X, FLY_OUT, (finished) => {
            if (finished) runOnJS(handleFlyOutComplete)("right");
          });
        } else if (shouldSkip) {
          translateX.value = withTiming(-OFFSCREEN_X, FLY_OUT, (finished) => {
            if (finished) runOnJS(handleFlyOutComplete)("left");
          });
        } else {
          translateX.value = withSpring(0, SPRING_BACK);
          translateY.value = withSpring(0, SPRING_BACK);
        }
      });

    const cardStyle = useAnimatedStyle(() => {
      const rotate = `${(translateX.value / SCREEN_WIDTH) * ROTATION_DEG}deg`;
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate },
        ],
      };
    });

    const likeStampStyle = useAnimatedStyle(() => ({
      opacity: Math.min(Math.max(translateX.value / SWIPE_THRESHOLD, 0), 1),
    }));

    const skipStampStyle = useAnimatedStyle(() => ({
      opacity: Math.min(Math.max(-translateX.value / SWIPE_THRESHOLD, 0), 1),
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardStyle}>
          <FeedCard item={item} />

          <Animated.View
            pointerEvents="none"
            style={[styles.stamp, styles.stampRight, likeStampStyle]}
          >
            <Text style={[styles.stampText, { color: Colors.closet }]}>
              LIKE
            </Text>
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={[styles.stamp, styles.stampLeft, skipStampStyle]}
          >
            <Text style={[styles.stampText, { color: Colors.danger }]}>
              SKIP
            </Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  }
);

SwipeableFeedCard.displayName = "SwipeableFeedCard";

export default SwipeableFeedCard;

const styles = StyleSheet.create({
  stamp: {
    position: "absolute",
    top: 24,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stampRight: {
    right: 24,
    borderColor: Colors.closet,
    transform: [{ rotate: "12deg" }],
  },
  stampLeft: {
    left: 24,
    borderColor: Colors.danger,
    transform: [{ rotate: "-12deg" }],
  },
  stampText: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 2,
  },
});