import { ChevronDown, Search } from "lucide-react-native";
import { useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const scenes = [
  "初デート",
  "ディナー",
  "ショッピング",
  "通学",
  "オフィス",
  "旅行",
];

export default function Header() {
  const [selectedScene, setSelectedScene] = useState("初デート");
  const [open, setOpen] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (!open) {
      setOpen(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      {/* 上段 */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>FUFUSA</Text>

        <Pressable hitSlop={12}>
          <Search
            size={28}
            color="#5C6B76"
            strokeWidth={1.8}
          />
        </Pressable>
      </View>

      {/* 今日のシーン */}
      <View style={styles.sceneRow}>
        <Text style={styles.leaf}>🌿</Text>
        <Text style={styles.sceneLabel}>今日のシーン</Text>
      </View>

      {/* タイトル兼セレクター */}
      <Pressable
        style={styles.titleRow}
        onPress={toggleMenu}
      >
        <Text style={styles.title}>
          {selectedScene}
        </Text>

        <Animated.View
          style={{
            transform: [{ rotate }],
          }}
        >
          <ChevronDown
            size={25}
            color="#5C6B76"
          />
        </Animated.View>
      </Pressable>

      {open && (
        <Animated.View
          style={[
            styles.menu,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}
        >
          {scenes.map((scene) => (
            <Pressable
              key={scene}
              style={styles.menuItem}
              onPress={() => {
                setSelectedScene(scene);
                toggleMenu();
              }}
            >
              <Text style={styles.menuText}>
                {scene}
              </Text>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  paddingTop: 62,
  paddingHorizontal: 24,
  backgroundColor: "#FAFBFC",
  paddingBottom: 8,

  zIndex: 100,
  elevation: 100,
},

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    fontSize: 15,
    letterSpacing: 3,
    color: "#5C6B76",
    fontWeight: "600",
  },

  sceneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  leaf: {
    fontSize: 18,
    marginRight: 8,
  },

  sceneLabel: {
    fontSize: 18,
    color: "#5C6B76",
    fontWeight: "500",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2F3A45",
  },

  menu: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,

     position: "absolute",

  top: 120,

  left: 0,

  right: 0,

  zIndex: 1000,
  },

  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  menuText: {
    fontSize: 18,
    color: "#5C6B76",
  },
});
