import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Expo標準のタブバーを非表示
        tabBarStyle: {
          display: "none",
        },

        // タブ(画面)切り替え時のクロスフェード。
        // ボタン(BottomNavigation)のアイコン色はこことは無関係に
        // usePathname() で即座に切り替わるので、遅延は発生しない。
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
