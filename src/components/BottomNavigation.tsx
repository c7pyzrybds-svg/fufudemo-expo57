import { usePathname, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isProfile = pathname === "/profile";

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <View style={styles.container}>

        {/* Home */}
        <Pressable
          style={styles.side}
          onPress={() => router.replace("/")}
        >
          <Image
            source={
              isHome
                ? require("../../assets/images/icons/home_active.png")
                : require("../../assets/images/icons/home_default.png")
            }
            resizeMode="contain"
            style={styles.tabImage}
          />
        </Pressable>

        {/* ＋ */}
        <Pressable
          style={styles.plusButton}
          onPress={() => router.push("/upload")}
        >
          <View style={styles.plusHorizontal} />
          <View style={styles.plusVertical} />
        </Pressable>

        {/* Profile */}
        <Pressable
          style={styles.side}
          onPress={() => router.replace("/profile")}
        >
          <Image
            source={
              isProfile
                ? require("../../assets/images/icons/profile_active.png")
                : require("../../assets/images/icons/profile_default.png")
            }
            resizeMode="contain"
            style={styles.tabImage}
          />
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    backgroundColor: "#FFFFFF",
  },

  container: {

    height: 57,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 12,
  },

  side: {

    width: 120,

    justifyContent: "center",

    alignItems: "center",
  },

  tabImage: {

    width: 60,

    height: 60,
  },

  plusButton: {

    width: 57,

    height: 57,

    borderRadius: 45,

    backgroundColor: "#97BCD1",

    justifyContent: "center",

    alignItems: "center",

    marginTop: -12,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 10,
  },

  plusHorizontal: {

    position: "absolute",

    width: 25,

    height: 2,

    backgroundColor: "#FFFFFF",

    borderRadius: 10,
  },

  plusVertical: {

    position: "absolute",

    width: 2,

    height: 25,

    backgroundColor: "#FFFFFF",

    borderRadius: 10,
  },

});