import { CoinsSearchResult, IcoSearchResult } from "@/redux/searchApi";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const IcoTitle = (ico: IcoSearchResult) => {
  return (
    <>
      <Card.Title
        title={ico.categories.name}
        subtitle="ico"
        left={(props) => <Avatar.Icon {...props} icon={"hand-coin-outline"} />}
      />
    </>
  );
};

export default IcoTitle;
