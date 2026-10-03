import { Image, StyleSheet } from "react-native";

type Props = {
  type: "image" | "video";

  media: string;
};

export default function MediaContent({
  type,
  media,
}: Props) {

  // 次Sprintで動画対応
  if (type === "video") {
    return (
      <Image
        source={{
          uri: "https://picsum.photos/700/1000?video",
        }}
        style={styles.media}
      />
    );
  }

  return (
    <Image
      source={{ uri: media }}
      style={styles.media}
    />
  );
}

const styles = StyleSheet.create({
  media: {
    width: "100%",
    aspectRatio: 0.88,
    borderRadius: 24,
    backgroundColor: "#DDD",
  },
});