import { Image, StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { Coin } from "@/redux/coinListApi";
import { DataTable } from "react-native-paper";
import PriceChange from "./PriceChange";
import { numberFormatter } from "@/utils";
import { LineGraph } from "react-native-graph";
import { useHistoricalPrice } from "@/redux/historicalApi";
import PriceGraph from "./PriceGraph";

type Props = {
  coin: Coin;
};
const CoinListItem = ({ coin }: Props) => {
  return (
    <>
      {/* <View> */}
      <DataTable.Row focusable className="">
        <DataTable.Cell key={0}>
          <View className="flex flex-none w-5">
            <Text className="text-neutral-500 text-secondary">
              {coin.market_cap_rank}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell key={1} className="mgr-2">
          <View className="w-14">
            <Image
              className="w-8 h-8 mb-2 mt-2 flex-none  "
              resizeMode="contain"
              source={{ uri: coin.image }}
            ></Image>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>
          <View className="flex flex-none w-20 -ml-2 flex-col">
            <Text className="font-pregular text-neutral-200">{coin.name}</Text>
            <Text className="text-gray-400 text-xs uppercase">
              {coin.symbol}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell key={2} numeric>
          <View className="flex flex-none w-20">
            <Text className="font-pregular text-neutral-400">
              ${coin.current_price}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell key={3} numeric>
          <View className="flex flex-none w-20">
            <PriceChange
              price_change_percentage={coin.price_change_percentage_24h}
            />
          </View>
        </DataTable.Cell>
        <DataTable.Cell key={4} numeric>
          <View className="flex flex-none w-16">
            <Text className="font-pregular text-sm text-secondary">
              {numberFormatter.format(coin.market_cap)}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell key={5} numeric className="ml-0.5">
          <PriceGraph coin={coin} days={1} />
        </DataTable.Cell>
        <DataTable.Cell key={6} numeric className="ml-4">
          <PriceGraph coin={coin} days={7} />
        </DataTable.Cell>
      </DataTable.Row>
      {/* </View> */}
    </>
  );
};

export default CoinListItem;

const styles = StyleSheet.create({});
