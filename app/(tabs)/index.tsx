import { Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Href, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { coinListApi } from "@/redux/coinListApi";
import CoinListItem from "@/components/coins/CoinListItem";

export default function TabOneScreen() {
  const { data: coins } = coinListApi.useGetAllQuery();
  return (
    <SafeAreaView className="flex-1 items-start justify-start">
      <StatusBar style="auto" />
      <ScrollView>
        <Text style={styles.title}>Tab One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {coins?.map((coin, key) => (
          <CoinListItem coin={coin} key={key} />
        ))}
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
