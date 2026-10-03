import {
    StyleSheet,
    View,
    ViewProps,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Shadows } from "../../theme/shadows";

export default function CommonCard(
  props: ViewProps
) {
  return (
    <View
      {...props}
      style={[
        styles.card,
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: "hidden",

    ...Shadows.card,
  },
});