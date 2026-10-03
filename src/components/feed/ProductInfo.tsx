import { StyleSheet, Text, View } from "react-native";

type Props = {
  brand: string;

  productName: string;

  price: number;
};

export default function ProductInfo({
  brand,
  productName,
  price,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{brand}</Text>

      <Text style={styles.name}>
        {productName}
      </Text>

      <Text style={styles.price}>
        ¥{price.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 20,

    bottom: 20,
  },

  brand: {
    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "600",
  },

  name: {
    marginTop: 4,

    color: "#FFFFFF",

    fontSize: 22,

    fontWeight: "700",
  },

  price: {
    marginTop: 3,

    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "600",
  },
});