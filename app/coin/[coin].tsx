import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Routes, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "@/components/Themed";
import PriceGraph from "@/components/coins/PriceGraph";
import { Coin } from "@/redux/coinListApi";
import { LineChart } from "react-native-chart-kit";
import { useHistoricalPrice } from "@/redux/historicalApi";
import { SafeAreaView } from "react-native-safe-area-context";
import PriceChange from "@/components/coins/PriceChange";
import { Rect, Svg, Text as TextSVG } from "react-native-svg";
import Tooltip from "@/components/coins/graph/Tooltip";
import { currencyFormatter, formatTimeString, numberFormatter } from "@/utils";

const CoinView = () => {
  const params = useLocalSearchParams();
  const coinPrice = useHistoricalPrice({
    coin_id: params.id as string,
    days: 1,
  });
  const coin = params as unknown as Coin;
  const labels = coinPrice
    .filter((value, index) => index % 40 === 0)
    .map(
      ({ date }, index) => `${date.toLocaleTimeString().replace(/:\d+\s/, " ")}`
    );
  return (
    <SafeAreaView>
      <View className="w-full p-2 h-full content-end  gap-2">
        <View className="flex flex-column items-center">
          <View className="flex flex-row gap-2 pr-4 self-start ">
            <Image
              source={{ uri: coin.image }}
              className="w-8 h-7 mb-2 mt-2 flex-none  "
              resizeMode="contain"
            ></Image>
            <Text className="text-lg font-bold font-pregular">{coin.name}</Text>
          </View>
          <View className="flex flex-row self-start items-center">
            <Text className="flex-initial text-4xl  mr-2 text-neutral-400 font-extrabold font-pregular">
              ${coin.current_price}
            </Text>
            <PriceChange price_change_percentage={coin.price_change_24h} />
          </View>
        </View>
        <View className="mr-2 mt-2 mb-8">
          <ScrollView>
            <ScrollView horizontal>
              <Tooltip>
                {({ decorator, onDataPointClick }) => (
                  <LineChart
                    data={{
                      labels,
                      datasets: [
                        {
                          data: coinPrice.map(({ value: price }) => price),
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width * 2} // from react-native
                    height={620}
                    yAxisLabel=""
                    formatYLabel={(value) =>
                      `$${currencyFormatter.format(Number(value))}`
                    }
                    decorator={() =>
                      decorator({
                        getXValue: (index: number) =>
                          formatTimeString(coinPrice.at(index)?.date),
                      })
                    }
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "white",
                      backgroundGradientFrom: "#000",
                      backgroundGradientTo: "#a5d6a7",
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `gray`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "0",
                        strokeWidth: "2",
                        // stroke: "#ffa726",
                      },
                    }}
                    bezier
                    transparent
                    withInnerLines={false}
                    onDataPointClick={onDataPointClick}
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      paddingLeft: 8,
                    }}
                  />
                )}
              </Tooltip>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoinView;

const styles = StyleSheet.create({});
