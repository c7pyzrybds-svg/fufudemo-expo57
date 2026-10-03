import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function CommonButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.round,
    paddingVertical: 14,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});