import { StyleSheet } from "react-native";
import React from "react";
import { useHistoricalPrice } from "@/redux/historicalApi";
import { Coin } from "@/redux/coinListApi";
import { LineGraph } from "react-native-graph";
import Colors from "@/constants/Colors";
// import { red400 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type Props = {
  coin: Coin;
  days: number;
};
const PriceGraph = ({ coin, days }: Props) => {
  const price = useHistoricalPrice({ coin_id: coin.id, days });
  const graphColor = coin.price_change_24h > 0 ? "#22bc09" : "#ef5350";
  return (
    <>
      <LineGraph
        style={{
          alignSelf: "center",
          width: 60,
          height: 35,
          aspectRatio: 1.8,
          marginVertical: 20,
        }}
        points={price}
        animated={false}
        className="bkg-lime-100 "
        color={graphColor}
      />
    </>
  );
};

export default PriceGraph;

const styles = StyleSheet.create({});
