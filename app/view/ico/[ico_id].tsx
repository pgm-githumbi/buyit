import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

const Ico = () => {
  const params = useLocalSearchParams();
  console.log("Ico params", params);
  return (
    <View>
      <Text>Ico</Text>
    </View>
  );
};

export default Ico;

const styles = StyleSheet.create({});
