import { CoinsSearchResult } from "@/redux/searchApi";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const CoinTitle = (coin: CoinsSearchResult) => {
  return (
    <>
      <Card.Title
        title={coin.name}
        subtitle={coin.symbol}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{
              uri: coin.thumb,
            }}
          />
        )}
      />
    </>
  );
};

export default CoinTitle;
