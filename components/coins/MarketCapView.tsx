import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { Text, TextProps, View } from "../Themed";
import { numberFormatter } from "@/utils";
import { Market } from "@/redux/marketApi";
import { LineGraph } from "react-native-graph";
import PriceChange from "./PriceChange";
type Props = {
  market?:
    | {
        data: {
          crypto_mrkt_cap?: number;
          crypto_24h_vol?: number;
          market_cap_change_percentage_24h_usd?: number;
        };
      }
    | Market;
};
const MarketCapView = ({ market }: Props) => {
  return (
    <View className="flex flex-row space-between">
      <View className="flex">
        <Text className="text-2xl font-pregular font-extrabold">
          ${numberFormatter.format(market?.data?.crypto_mrkt_cap || 0)}
        </Text>
        <Text className="text-slate-300 text-lg font-bold">
          Total market cap
        </Text>
      </View>
      <View className="ml-2 bjg-neutral-500">
        <PriceChange
          price_change_percentage={Number(
            market?.data?.market_cap_change_percentage_24h_usd || 0
          )}
          iconSize={20}
          textFunc={(change, textProps: TextProps) => (
            <Text
              {...textProps}
              className={`${textProps.className || ""} text-lg`}
            >
              {change}
            </Text>
          )}
        />
      </View>
    </View>
  );
};
const data1 = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 },
];
export function generateSinusGraphData(length: number) {
  return Array<number>(length)
    .fill(0)
    .map((_, index) => ({
      date: new Date(index),
      value: Math.sin(index) * 10034,
    }));
}
const data2 = generateSinusGraphData(9);

export default MarketCapView;

const styles = StyleSheet.create({});
