import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Href, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { coinListApi } from "@/redux/coinListApi";
import CoinListItem from "@/components/coins/CoinListItem";
import { DataTable } from "react-native-paper";
import PriceChange from "@/components/coins/PriceChange";
import { useTotalMarketCapValue } from "@/redux/marketApi";
import { numberFormatter } from "@/utils";
import MarketCapView from "@/components/coins/MarketCapView";

export default function TabOneScreen() {
  const { data: coins } = coinListApi.useGetAllQuery();
  const market = useTotalMarketCapValue();
  return (
    <SafeAreaView className="w-full items-center justify-start">
      <StatusBar style="auto" />
      <ScrollView className="w-full gap-4">
        <View className="flex w-64 hs-16 mr-4 p-3 border border-stone-700 mb-4 rounded-xl">
          {market?.data && (
            <>
              <MarketCapView market={market.data} />
            </>
          )}
        </View>
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
                {/* <DataTable.Title>
                <Text />
              </DataTable.Title> */}
                <DataTable.Title numeric>Price</DataTable.Title>
                <DataTable.Title numeric>24h</DataTable.Title>
                <DataTable.Title numeric>Market cap</DataTable.Title>
                <DataTable.Title numeric>Last 24h</DataTable.Title>
                <DataTable.Title numeric>Last 7days</DataTable.Title>
              </DataTable.Header>
              {coins?.slice(0, 5).map((coin, key) => (
                <>
                  <CoinListItem coin={coin} key={key} />
                </>
              ))}
            </DataTable>
          </ScrollView>
        </View>
      </ScrollView>
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
});
