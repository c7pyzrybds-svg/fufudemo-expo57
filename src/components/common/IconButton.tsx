import {
    Pressable,
    StyleSheet,
} from "react-native";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
};

export default function IconButton({
  children,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
});