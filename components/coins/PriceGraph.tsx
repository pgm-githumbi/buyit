import { StyleSheet } from "react-native";
import React from "react";
import {
  HistApiErrorWrapper,
  HistApiLoadingWrapper,
  useHistoricalPrice,
} from "@/redux/historicalApi";
import { Coin } from "@/redux/coinListApi";
import { LineGraph } from "react-native-graph";
import Colors from "@/constants/Colors";
import { Text } from "../Themed";
// import { red400 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type Props = {
  coin: Coin;
  days: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  color?: string;
  className?: string;
};
const PriceGraph = ({
  coin,
  days,
  width = 60,
  height = 35,
  aspectRatio = 1.8,
  color,
  className = "",
}: Props) => {
  const { prices, ...query } = useHistoricalPrice({ coin_id: coin.id, days });
  const graphColor = coin.price_change_24h > 0 ? "#22bc09" : "#ef5350";
  return (
    <>
      <HistApiErrorWrapper query={query}>
        <HistApiLoadingWrapper query={query}>
          <LineGraph
            style={{
              alignSelf: "center",
              width,
              height,
              aspectRatio,
              marginVertical: 10,
            }}
            points={prices.slice(-70, -1)}
            animated={false}
            className={`bkg-lime-100 ${className}`}
            color={color || graphColor}
            gradientFillColors={["#7476df5D", "#7476df4D", "#7476df00"]}
            enableFadeInMask={true}
          >
            <Text className="text-2xl">Children</Text>
          </LineGraph>
        </HistApiLoadingWrapper>
      </HistApiErrorWrapper>
    </>
  );
};

export default PriceGraph;

const styles = StyleSheet.create({});
