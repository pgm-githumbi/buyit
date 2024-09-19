import { Text, View } from "@/components/Themed";
import { NftSearchResult } from "@/redux/searchApi";
import React, { Component } from "react";
import { Card } from "react-native-paper";

export const NftContent = (nft: NftSearchResult) => {
  return (
    <>
      <Card.Content>
        <Text className="text-neutral-400">nft: {nft.symbol}</Text>
      </Card.Content>
    </>
  );
};

export default NftContent;
