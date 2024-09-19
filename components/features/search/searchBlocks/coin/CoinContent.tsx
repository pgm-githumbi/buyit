import { Text, View } from "@/components/Themed";
import { CoinsSearchResult } from "@/redux/searchApi";
import React, { Component } from "react";
import { Card } from "react-native-paper";

type Props = {
  coin: CoinsSearchResult;
};
export const CoinContent: React.FC<Props> = ({ coin }) => {
  return (
    <>
      <Card.Content>
        <Text className="text-neutral-400">Rank: {coin.market_cap_rank}</Text>
      </Card.Content>
    </>
  );
};

export default CoinContent;
