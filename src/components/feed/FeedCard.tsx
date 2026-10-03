import { StyleSheet, View } from "react-native";

import type { FeedItem } from "../../types/feed";

import MediaContent from "./MediaContent";
import ProductInfo from "./ProductInfo";
import RecommendationBadge from "./RecommendationBadge";

type Props = {
  item: FeedItem;
};

export default function FeedCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <MediaContent
        type={item.type}
        media={item.media}
      />

      <RecommendationBadge
        score={item.score}
      />

      <View style={styles.content}>
        <ProductInfo
          brand={item.brand}
          productName={item.productName}
          price={item.price}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },

  content: {
    paddingHorizontal: 20,
  },
});