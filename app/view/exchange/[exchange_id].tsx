import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

const Exchange = () => {
  const { exchange_id } = useLocalSearchParams();
  return (
    <View>
      <Text>Exchange</Text>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({});
