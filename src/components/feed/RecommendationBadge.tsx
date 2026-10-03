import { StyleSheet, Text, View } from "react-native";

type Props = {
  score: number;
};

export default function RecommendationBadge({ score }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>✨️おすすめ</Text>

      <Text style={styles.score}>
        {score}
        <Text style={styles.percent}>%</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 18,

    right: 18,

    backgroundColor: "rgba(255,255,255,0.92)",

    borderRadius: 25,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  label: {
    fontSize: 11,

    color: "#7B8A95",
  },

  score: {
    fontSize: 24,

    fontWeight: "700",

    color: "#8FC8D1",
  },

  percent: {
    fontSize: 18,
  },
});