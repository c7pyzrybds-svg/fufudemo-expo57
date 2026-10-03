import { Settings } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BottomNavigation from "../../components/BottomNavigation";
import ClosetGrid from "../../components/profile/ClosetGrid";
import PostsGrid from "../../components/profile/PostsGrid";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileTabs, {
  ProfileTab,
} from "../../components/profile/ProfileTabs";
import StyleTags from "../../components/profile/StyleTags";
import TryOnBanner from "../../components/profile/TryOnBanner";
import { feedData } from "../../data/feed";
import { myPosts, userProfile } from "../../data/profile";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import type { FeedItem } from "../../types/feed";
import type { Post } from "../../types/profile";

// クローゼット(likeしたアイテム)は本来「liked item id 一覧」から商品DBを
// 引く想定。今は feedData をそのまま「liked済みアイテム」として仮流用している。
const closetItems: FeedItem[] = feedData;

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("closet");

  // タブ切り替え時のふんわりフェード。Header.tsx のドロップダウン開閉と
  // 同じ Animated + Easing.out(Easing.ease) の書き方に揃えている。
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [activeTab, fadeAnim]);

  const handleEditPress = () => {
    // TODO: プロフィール編集画面へ遷移
    console.log("プロフィール編集を開く");
  };

  const handleAddTagPress = () => {
    // TODO: 系統タグ編集モーダルを開く
    console.log("系統タグ編集を開く");
  };

  const handleNotifyPress = () => {
    // TODO: 試着シミュレーション機能の通知登録
    console.log("試着シミュレーションの通知登録");
  };

  const handleBodyInfoPress = () => {
    // TODO: 体型情報の入力画面へ遷移
    console.log("体型情報の設定を開く");
  };

  const handleBuyPress = (item: FeedItem) => {
    // TODO: 実際の購入/カート追加処理に接続する
    console.log(`${item.productName} を購入する`);
  };

  const handleClosetItemPress = (item: FeedItem) => {
    // TODO: 商品詳細画面へ遷移
    console.log(`${item.productName} の詳細を見る`);
  };

  const handlePostPress = (post: Post) => {
    // TODO: 投稿詳細/編集画面へ遷移
    console.log(`投稿 ${post.id} を開く`);
  };

  const handleSettingsPress = () => {
    // TODO: 設定画面へ遷移
    console.log("設定を開く");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>マイページ</Text>
          <Pressable
            onPress={handleSettingsPress}
            accessibilityRole="button"
            accessibilityLabel="設定"
            hitSlop={8}
          >
            <Settings size={22} color={Colors.logo} />
          </Pressable>
        </View>

        <ProfileHeader profile={userProfile} onEditPress={handleEditPress} />

        <StyleTags tags={userProfile.styleTags} onAddPress={handleAddTagPress} />

        <ProfileStats
          closetCount={closetItems.length}
          postCount={myPosts.length}
          followerCount={userProfile.followerCount}
        />

        <TryOnBanner
          onNotifyPress={handleNotifyPress}
          onBodyInfoPress={handleBodyInfoPress}
        />

        <ProfileTabs active={activeTab} onChange={setActiveTab} />

        <Animated.View style={{ opacity: fadeAnim }}>
          {activeTab === "closet" ? (
            <ClosetGrid
              items={closetItems}
              onBuyPress={handleBuyPress}
              onItemPress={handleClosetItemPress}
            />
          ) : (
            <PostsGrid posts={myPosts} onPostPress={handlePostPress} />
          )}
        </Animated.View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Header.tsx(おすすめページ)の container と同じ paddingTop:62 に揃えて、
    // ステータスバー/ノッチと重ならないようにしている。
    paddingTop: 62,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  topBarTitle: {
    fontSize: Typography.heading,
    fontWeight: "500",
    color: Colors.text,
  },
});
