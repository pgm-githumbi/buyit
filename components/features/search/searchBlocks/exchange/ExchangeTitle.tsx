import { CoinsSearchResult, ExchangesSearchResult } from "@/redux/searchApi";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const ExchangeTitle = (exchange: ExchangesSearchResult) => {
  return (
    <>
      <Card.Title
        title={exchange.name}
        subtitle={"exchange"}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{
              uri: exchange.thumb,
            }}
          />
        )}
      />
    </>
  );
};

export default ExchangeTitle;
