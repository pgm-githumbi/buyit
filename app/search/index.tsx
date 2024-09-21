import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { View, Text } from "@/components/Themed";
import { Card } from "react-native-paper";
import { Href, router } from "expo-router";
import SearchBar from "@/components/features/search/SearchBar";
import {
  CoinsSearchResult,
  ExchangesSearchResult,
  IcoSearchResult,
  NftSearchResult,
  searchApi,
  SearchApiErrorWrapper,
  SearchApiLoadingWrapper,
  SearchResults,
} from "@/redux/searchApi";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CoinTitle from "@/components/features/search/searchBlocks/coin/CoinTitle";
import CoinContent from "@/components/features/search/searchBlocks/coin/CoinContent";
import ExchangeTitle from "@/components/features/search/searchBlocks/exchange/ExchangeTitle";
import ExchangeContent from "@/components/features/search/searchBlocks/exchange/ExchangeContent";
import IcoTitle from "@/components/features/search/searchBlocks/ico/IcoTitle";
import IcoContent from "@/components/features/search/searchBlocks/ico/IcoContent";
import NftTitle from "@/components/features/search/searchBlocks/nft/NftTitle";
import NftContent from "@/components/features/search/searchBlocks/nft/NftContent";
import ChipSet from "@/components/features/search/chipView/ChipSet";

type GroupChip = (args: {
  handleSelectedChanged: (chipName: string) => void;
  selectedChips: string[];
}) => React.ReactNode;

type RenderSearchDataGroup<ResultType> = {
  name: keyof SearchResults;
  title: (dataItem: ResultType) => React.ReactNode;
  content: (dataItem: ResultType) => React.ReactNode;
  handlePress: (dataItem: ResultType) => void;
  chip: GroupChip;
  data?: ResultType[];
};

type SearchDataListNames = { name: keyof SearchResults }[];

type SearchDataList = (
  | RenderSearchDataGroup<CoinsSearchResult>
  | RenderSearchDataGroup<ExchangesSearchResult>
  | RenderSearchDataGroup<IcoSearchResult>
  | RenderSearchDataGroup<NftSearchResult>
)[];

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

  let renderData = useMemo(
    () => [
      {
        name: "coins" as keyof SearchResults,
        title: (coinSearchRes: CoinsSearchResult) => (
          <CoinTitle {...coinSearchRes} />
        ),
        content: (coinSearchRes: CoinsSearchResult) => (
          <CoinContent coin={coinSearchRes} />
        ),
        handlePress: ({ id: coin_id }: CoinsSearchResult) =>
          router.push(`/coin/${coin_id}`),
        data: result.data?.coins,
      },
      {
        name: "exchanges" as keyof SearchResults,
        title: (exchSearchRes: ExchangesSearchResult) => (
          <ExchangeTitle {...exchSearchRes} />
        ),
        content: (exchSearchRes: ExchangesSearchResult) => (
          <ExchangeContent {...exchSearchRes} />
        ),

        handlePress: ({ id: exchange_id }: ExchangesSearchResult) =>
          router.push(`/view/exchange/${exchange_id}` as Href),

        data: result.data?.exchanges,
      },
      {
        name: "icos" as keyof SearchResults,
        title: (icoSearchRes: IcoSearchResult) => (
          <IcoTitle categories={icoSearchRes.categories} />
        ),
        content: (icoSearchRes: IcoSearchResult) => <IcoContent />,
        handlePress: (ico: IcoSearchResult) =>
          router.push(`/view/ico/${ico.categories.id}` as Href),

        data: result.data?.icos,
      },
      {
        name: "nfts" as keyof SearchResults,
        title: (nftSearchRes: NftSearchResult) => (
          <NftTitle {...nftSearchRes} />
        ),
        content: (nftSearchRes: NftSearchResult) => (
          <NftContent {...nftSearchRes} />
        ),
        handlePress: (nft: NftSearchResult) =>
          router.push(`/view/nft/${nft.id}` as Href),

        data: result.data?.nfts,
      },
    ],
    [
      result.data?.coins,
      result.data?.exchanges,
      result.data?.icos,
      result.data?.nfts,
    ],
  );

  const [itemTypesToRender, setitemTypesToRender] = useState<
    (keyof SearchResults)[]
  >(["coins", "exchanges", "icos", "nfts"]);

  const reducedRenderData = useMemo(
    () => renderData.filter((data) => itemTypesToRender.includes(data.name)),
    [itemTypesToRender, renderData],
  );
  useMemo(
    () => console.log("reducedItemTypesToRender", itemTypesToRender),
    [itemTypesToRender],
  );

  return (
    <View>
      <SearchBar
        textInputValue={value}
        onEnter={handleEnter}
        onChangeText={(text) => setValue((_) => text)}
      />
      {result.isSuccess && (
        <ChipSet
          chipNames={renderData.map((renderItem) => renderItem.name)}
          searchQueryResult={result.data}
          selectedChips={itemTypesToRender}
          handleChipSelect={(itemType) =>
            setitemTypesToRender((prev) => {
              if (!prev.includes(itemType)) return [itemType, ...prev];

              return prev.filter((item) => item !== itemType);
            })
          }
        />
      )}
      {result.isSuccess && reducedRenderData.length === 0 && (
        <View className="bg-lime-200">
          <Text>No results meet the search criteria</Text>
        </View>
      )}

      <SearchApiErrorWrapper
        //@ts-expect-error
        query={result}
      >
        <SearchApiLoadingWrapper
          //@ts-expect-error
          query={result}
        >
          {result.isSuccess && (
            <FlatList
              data={reducedRenderData
                .map((renderItem) =>
                  renderItem.data?.map((item, index) => ({
                    renderItem,
                    item,
                    index,
                  })),
                )
                .flat()}
              renderItem={(info) => (
                <TouchableOpacity
                  onPress={
                    //@ts-expect-error
                    () => info.item.renderItem.handlePress(info.item?.item)
                  }
                >
                  <Card key={info.index} className="mb-2 mt-2">
                    {
                      //@ts-expect-error
                      info.item.renderItem.title(info.item?.item)
                    }

                    {
                      //@ts-expect-error
                      info.item.renderItem.content(info.item?.item)
                    }
                  </Card>
                </TouchableOpacity>
              )}
            />
          )}
        </SearchApiLoadingWrapper>
      </SearchApiErrorWrapper>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
