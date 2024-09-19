import { Text, View } from "@/components/Themed";
import { ExchangesSearchResult } from "@/redux/searchApi";
import React, { Component } from "react";
import { Card } from "react-native-paper";

export const ExchangeContent = (exchange: ExchangesSearchResult) => {
  return (
    <>
      <Card.Content>
        <Text>Market type: {exchange.market_type}</Text>
      </Card.Content>
    </>
  );
};

export default ExchangeContent;
