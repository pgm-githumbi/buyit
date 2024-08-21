import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/components/Themed";
import { Href, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-slate-200 pb-4">OnBoarding</Text>
          <Link
            href={"/(tabs)" as Href}
            className="btn btn-primary btn-glass btn-xs text-slate-200"
          >
            Go to tabs
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
