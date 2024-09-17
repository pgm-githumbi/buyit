import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { View, Text } from "@/components/Themed";
import {
  Button,
  Card,
  Text as TextPaper,
  Avatar,
  Chip,
  Badge,
} from "react-native-paper";
import { Href, router } from "expo-router";
import SearchBar from "@/components/features/search/SearchBar";
import {
  CoinsSearchResult,
  ExchangesSearchResult,
  IcoSearchResult,
  NftSearchResult,
  searchApi,
} from "@/redux/searchApi";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CoinError, CoinLoading } from "@/redux/coinApi";

const Search = () => {
  const [value, setValue] = useState("");
  const [trigger, result, lastPromiseInfo] = searchApi.useLazySearchQuery({});

  const handleEnter = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      trigger(value, true);
      console.log("enter pressed with ", value);
    },
    [trigger, value],
  );

  useMemo(() => {
    // console.log("result.data ", result.data?.coins);
  }, [result.isLoading, result.isFetching, result.isSuccess, result.isError]);

  const coinTitle = (coin: CoinsSearchResult) => (
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
  );

  const exchangeTitle = (exchange: ExchangesSearchResult) => (
    <Card.Title
      title={exchange.name}
      subtitle="exchange"
      left={(props) => (
        <Avatar.Image
          {...props}
          source={{
            uri: exchange.thumb,
          }}
        />
      )}
    />
  );

  const icoTitle = (ico: IcoSearchResult) => (
    <Card.Title
      title={ico.categories.name}
      subtitle="ico"
      left={(props) => <Avatar.Icon {...props} icon={"hand-coin-outline"} />}
    />
  );
  const nftTitle = (nft: NftSearchResult) => (
    <Card.Title
      title={nft.name}
      subtitle={nft.symbol}
      left={(props) => <Avatar.Image {...props} source={{ uri: nft.thumb }} />}
    />
  );

  //-------------------------------------------------------------------------------
  const coinContent = (coin: CoinsSearchResult) => {
    return (
      <Card.Content>
        <Text className="text-neutral-400">Rank: {coin.market_cap_rank}</Text>
      </Card.Content>
    );
  };

  const exchangeContent = (exchange: ExchangesSearchResult) => {
    return (
      <Card.Content>
        <Text>Market type: {exchange.market_type}</Text>
      </Card.Content>
    );
  };

  const icoContent = (ico: IcoSearchResult) => (
    <Card.Content>
      <Text className="text-neutral-400">ico</Text>
    </Card.Content>
  );
  const nftContent = (nft: NftSearchResult) => (
    <Card.Content>
      <Text className="text-neutral-400">nft: {nft.symbol}</Text>
    </Card.Content>
  );
  const data = [
    {
      title: coinTitle,
      content: coinContent,
      handlePress: ({ id: coin_id }: CoinsSearchResult) =>
        router.push(`/coin/${coin_id}`),
      chip: () => (
        <Chip
          // icon="hand-coin-outline"
          icon={() => (
            <Badge style={{ borderRadius: 5 }} className={"bg-purple-200/70"}>
              {result.data?.coins.length}
            </Badge>
          )}
          className="w-fit"
          onPress={() => console.log("Pressed")}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">Coins </Text>
          </>
        </Chip>
      ),
      data: result.data?.coins,
    },
    {
      title: exchangeTitle,
      content: exchangeContent,
      handlePress: ({ id: exchange_id }: ExchangesSearchResult) =>
        router.push(`/view/exchange/${exchange_id}` as Href),
      chip: () => (
        <Chip
          // icon="hand-coin-outline"
          icon={() => (
            <Badge style={{ borderRadius: 5 }} className={"bg-purple-200/70"}>
              {result.data?.exchanges.length}
            </Badge>
          )}
          className="w-fit"
          onPress={() => console.log("Pressed")}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">Exchanges </Text>
          </>
        </Chip>
      ),
      data: result.data?.exchanges,
    },
    {
      title: icoTitle,
      content: icoContent,
      handlePress: (ico: IcoSearchResult) =>
        router.push(`/view/ico/${ico.categories.id}` as Href),
      chip: () => (
        <Chip
          // icon="hand-coin-outline"
          icon={() => (
            <Badge style={{ borderRadius: 5 }} className={"bg-purple-200/70"}>
              {result.data?.icos.length}
            </Badge>
          )}
          className="w-fit"
          onPress={() => console.log("Pressed")}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">Icos </Text>
          </>
        </Chip>
      ),
      data: result.data?.icos,
    },
    {
      title: nftTitle,
      content: nftContent,
      handlePress: (nft: NftSearchResult) =>
        router.push(`/view/nft/${nft.id}` as Href),
      chip: () => (
        <Chip
          // icon="hand-coin-outline"
          icon={() => (
            <Badge style={{ borderRadius: 5 }} className={"bg-purple-200/70"}>
              {result.data?.nfts.length}
            </Badge>
          )}
          className="w-fit"
          onPress={() => console.log("Pressed")}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">Nfts </Text>
          </>
        </Chip>
      ),
      data: result.data?.nfts,
    },
    // renderCategories: {title: exchangeTitle, data: result.data?.Ico},
  ];

  return (
    <View>
      <SearchBar
        textInputValue={value}
        onEnter={handleEnter}
        onChangeText={(text) => setValue((_) => text)}
      />
      <View className="mt-4 flex flex-row flex-wrap">
        {result.isSuccess &&
          data?.map((itemGroup, index) => (
            <View key={index} className="mb-0.5 mr-2 mt-1">
              {itemGroup.chip()}
            </View>
          ))}
      </View>
      <ScrollView>
        {result.isSuccess &&
          data?.map((itemGroup, groupIndex) =>
            itemGroup.data?.map((item, index) => (
              <TouchableOpacity
                onPress={
                  //@ts-expect-error
                  () => itemGroup.handlePress(item)
                }
              >
                <Card key={index} className="mb-2 mt-2">
                  {
                    //@ts-expect-error
                    itemGroup.title(item)
                  }

                  {
                    //@ts-expect-error
                    itemGroup.content(item)
                  }
                </Card>
              </TouchableOpacity>
            )),
          )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
