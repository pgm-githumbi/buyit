import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Href, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable } from "react-native-paper";
import { FadeLoading } from "react-native-fade-loading";

import { coinListApi, CoinListLoading } from "@/redux/coinListApi";
import CoinListItem from "@/components/coins/CoinListItem";
import PriceChange from "@/components/coins/PriceChange";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useTotalMarketCapValue } from "@/redux/marketApi";
import { numberFormatter } from "@/utils";
import MarketCapView from "@/components/coins/MarketCapView";
import Loader from "@/components/Loader";

export default function TabOneScreen() {
  const query = coinListApi.useGetAllQuery();
  const { isFetching, isLoading, data: coins } = query;
  console.log(
    "useGetAllQuery: ",
    coins?.length,
    " isFetching:",
    isFetching,
    " isLoading:",
    isLoading
  );
  const market = useTotalMarketCapValue();
  console.log(
    "useTotalMarketCapValue: ",
    { ...market, data: {}, currentData: {} },
    " isFetching:",
    market.isFetching,
    " isLoading:",
    market.isLoading
  );
  return (
    <SafeAreaView className="w-full items-center mt-2 justify-start">
      <StatusBar style="auto" hidden />
      <View className="flex w-64 hs-16 mr-4 p-3 border border-stone-700 mb-1 ml-1 self-start rounded-xl">
        {!market?.isLoading && (
          <>
            <MarketCapView market={market.data} />
          </>
        )}
        {market.isLoading && (
          <View className="">
            <FadeLoading
              visible={false}
              style={styles.marketInfoLoading}
              primaryColor="slategrey"
              secondaryColor="slategray"
              duration={2000}
              animated={false}
              children={""}
            />
            <FadeLoading
              visible={false}
              style={styles.marketInfoLoading}
              primaryColor="slategrey"
              secondaryColor="slategray"
              duration={2000}
              animated={false}
              children={""}
            />
          </View>
        )}
      </View>
      <CoinListLoading query={query}>
        <View className="w-full mr-4 pr-4">
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>
                  <Text> {"       "}</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text></Text>
                </DataTable.Title>
                <DataTable.Title>Coin</DataTable.Title>
                <DataTable.Title numeric>Price</DataTable.Title>
                <DataTable.Title numeric>24h</DataTable.Title>
                <DataTable.Title numeric>Market cap</DataTable.Title>
                <DataTable.Title numeric>Last 24h</DataTable.Title>
                <DataTable.Title numeric>Last 7days</DataTable.Title>
              </DataTable.Header>
              <FlatList
                data={coins?.slice(0, 5)}
                renderItem={({ item, index }) => (
                  <CoinListItem coin={item} key={index} />
                )}
                keyExtractor={({ id }) => id}
              />
            </DataTable>
          </ScrollView>
        </View>
      </CoinListLoading>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  marketInfoLoading: {
    width: "100%",
    height: 20,
    marginVertical: 5,
  },
});
