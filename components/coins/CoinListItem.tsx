import { Image, StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { Coin } from "@/redux/coinListApi";

type Props = {
  coin: Coin;
};
const CoinListItem = ({ coin }: Props) => {
  return (
    <>
      <View className="flex flex-row m-3">
        <Image
          className="w-12 h-12 mr-4"
          resizeMode="contain"
          source={{ uri: coin.image }}
        ></Image>
        {/* <Text>{coin.id}</Text> */}
        <Text>{coin.symbol}</Text>
        {/* <Text>{coin.name}</Text> */}
      </View>
    </>
  );
};

export default CoinListItem;

const styles = StyleSheet.create({});
