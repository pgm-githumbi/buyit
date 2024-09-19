import { CoinsSearchResult, NftSearchResult } from "@/redux/searchApi";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const NftTitle = (nft: NftSearchResult) => {
  return (
    <>
      <Card.Title
        title={nft.name}
        subtitle={nft.symbol}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{
              uri: nft.thumb,
            }}
          />
        )}
      />
    </>
  );
};

export default NftTitle;
