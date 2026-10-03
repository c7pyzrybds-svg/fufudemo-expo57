// Deprecated
// FeedCardへ移行済み

import { Image, StyleSheet, Text, View } from "react-native";

export default function MediaCard() {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: "https://picsum.photos/800/1000",
        }}
        style={styles.image}
      />

      {/* AIおすすめ度 */}
      <View style={styles.score}>
        <Text style={styles.scoreText}>
          AIおすすめ度
        </Text>

        <Text style={styles.percent}>
          91%
        </Text>
      </View>

      {/* 商品情報 */}
      <View style={styles.info}>

        <Text style={styles.brand}>
          FUFUSA ORIGINAL
        </Text>

        <Text style={styles.name}>
          Linen Relax Shirt
        </Text>

        <Text style={styles.price}>
          ¥8,900
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    marginHorizontal:24,
    marginTop:10,
  },

  image:{
    width:"100%",
    aspectRatio:0.74,
    borderRadius:28,
    backgroundColor:"#DDDDDD",
  },

  score:{
    position:"absolute",

    top:18,

    right:18,

    backgroundColor:"rgba(255,255,255,0.92)",

    borderRadius:18,

    paddingHorizontal:14,

    paddingVertical:8,
  },

  scoreText:{
    fontSize:11,
    color:"#7B8A95",
  },

  percent:{
    fontSize:24,
    fontWeight:"700",
    color:"#8FC8D1",
  },

  info:{
    position:"absolute",

    left:22,

    bottom:20,
  },

  brand:{
    color:"#FFFFFF",
    fontSize:13,
    fontWeight:"600",
  },

  name:{
    marginTop:3,

    color:"#FFFFFF",

    fontSize:22,

    fontWeight:"700",
  },

  price:{
    marginTop:2,

    color:"#FFFFFF",

    fontSize:18,

    fontWeight:"600",
  },

});