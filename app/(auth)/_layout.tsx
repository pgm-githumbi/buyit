import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const AuthLayout = () => {
  return (
    <View
      style={styles.container}
      //  lightColor="#eee"
      // darkColor="rgba(255,255,255,0.1)"
    >
      <Text className="bg-slate-200">AuthLayout</Text>
      <Slot />
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
