import { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import BottomNavigation from "../../components/BottomNavigation";
import Header from "../../components/Header";
import ActionButtons from "../../components/feed/ActionButtons";
import SwipeableFeedCard from "../../components/feed/SwipeableFeedCard";
import type { SwipeableFeedCardHandle } from "../../components/feed/SwipeableFeedCard";
import { feedData } from "../../data/feed";
import { Colors } from "../../theme/colors";

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<SwipeableFeedCardHandle>(null);

  const hasMore = currentIndex < feedData.length;

  // like / skip どちらでも、カードが画面外へ飛び切った後にここが呼ばれ、
  // 次のアイテムへ進める
  const advance = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  // クローゼットボタン: 指でスワイプしたのと同じ「like」挙動をカードに実行させる
  const handleLikeButton = useCallback(() => {
    cardRef.current?.like();
  }, []);

  // スキップボタン: 指でスワイプしたのと同じ「skip」挙動をカードに実行させる
  const handleSkipButton = useCallback(() => {
    cardRef.current?.skip();
  }, []);

  // バッグボタン: カードは進めない単発アクション。
  // 実際のカート追加処理はここに実装する(未接続)。
  const handleBuy = useCallback(() => {
    const item = feedData[currentIndex];
    if (!item) return;
    // TODO: 実際のカート状態(store/context)に接続する
    console.log(`${item.productName} をバッグに追加`);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.feedArea}>
        {hasMore ? (
          <SwipeableFeedCard
            ref={cardRef}
            item={feedData[currentIndex]}
            onLike={advance}
            onSkip={advance}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              今日のおすすめは以上です
            </Text>
          </View>
        )}
      </View>

      <ActionButtons
        onSkip={handleSkipButton}
        onBuy={handleBuy}
        onLike={handleLikeButton}
        disabled={!hasMore}
      />

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  feedArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyStateText: {
    fontSize: 16,
    color: Colors.subText,
  },
});