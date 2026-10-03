import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
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

export default function SceneSelector() {
  const [selected, setSelected] = useState("初デート");
  const [open, setOpen] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(false));
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.selector}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.selected}>{selected}</Text>

          <Text style={styles.arrow}>▼</Text>
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="none"
      >
        <Pressable
          style={styles.overlay}
          onPress={closeModal}
        >
          <Animated.View
            style={[
              styles.modal,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY },
                  { scale },
                ],
              },
            ]}
          >
            {scenes.map((scene) => (
              <Pressable
                key={scene}
                style={styles.item}
                onPress={() => {
                  setSelected(scene);
                  closeModal();
                }}
              >
                <Text
                  style={[
                    styles.itemText,
                    scene === selected &&
                      styles.selectedItem,
                  ]}
                >
                  {scene}
                </Text>
              </Pressable>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingVertical: 14,

    paddingHorizontal: 18,
  },

  selected: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5C6B76",
  },

  arrow: {
    fontSize: 16,
    color: "#5C6B76",
  },

  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.35)",

    justifyContent: "center",

    alignItems: "center",
  },

  modal: {
    width: "84%",

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    overflow: "hidden",
  },

  item: {
    paddingVertical: 18,

    alignItems: "center",
  },

  itemText: {
    fontSize: 18,

    color: "#5C6B76",

    fontWeight: "500",
  },

  selectedItem: {
    color: "#8FC8D1",

    fontWeight: "700",
  },
});