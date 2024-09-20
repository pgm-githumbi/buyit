import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Href, Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "@/components/Themed";
import MaskedView from "@react-native-masked-view/masked-view";
import { MonoText } from "@/components/StyledText";

const OnBoarding = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex min-h-[85vh] w-full flex-col items-center justify-center">
          <View className="flex w-full">
            <Image
              source={require("../assets/images/digiChums-black-and-yellow.jpg")}
              resizeMode={"stretch"}
              // style={{ width: 390 }}
              className="h-72 w-full self-center rounded-2xl"
            />
          </View>

          <Text className="mt-16 text-center font-bold text-neutral-200 text-3xl">
            Track cryptocurrency prices at
            <Text>
              {" "}
              high <Text className="text-yellow-500">convenience</Text>
            </Text>
          </Text>
          {/* <Image
            className="w-64 h-32 rounded-xl justify-center m-7"
            source={require("../assets/images/favicon.jpg")}
            resizeMode="contain"
          /> */}
          <View className="mt-12 h-20 w-full items-center justify-center px-4">
            <TouchableOpacity
              className="m-6 h-12 w-64 items-center justify-center rounded-lg bg-yellow-500"
              onPress={() => {
                router.push("/sign_up");
              }}
            >
              <Text className="font-bold text-lg">Continue with email</Text>
            </TouchableOpacity>
          </View>
          <View className="h-20 w-full items-center justify-center px-4">
            <TouchableOpacity
              className="m-6 h-12 w-64 items-center justify-center rounded-lg bg-yellow-500"
              onPress={() => {
                router.push("/(tabs)");
              }}
            >
              <Text className="font-bold text-lg">Continue as guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
