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
        <View className="flex flex-col justify-center items-center w-full min-h-[85vh]">
          {/* <View className="flex flex-row self-start ml-4 items-center content-center">
            <Image
              source={{
                //   uri: "https://cdn-icons-png.flaticon.com/128/3737/3737372.png",
                uri: "https://cdn-icons-png.flaticon.com/512/3737/3737151.png",
              }}
              className="w-7 h-32 mr-4 self-start "
              resizeMode="contain"
            />

            <View className=" ">
              <MonoText className="text-8xl font-extrabold text-neutral-200">
                crypto
              </MonoText>
            </View>
          </View> */}

          <View className="flex w-full">
            <Image
              source={require("../assets/images/digiChums-black-and-yellow.jpg")}
              resizeMode={"stretch"}
              // style={{ width: 390 }}
              className="w-full h-72 self-center rounded-2xl"
            />
          </View>

          <Text className="text-3xl font-bold text-neutral-200 text-center mt-16">
            Track cryptocurrency prices at
            <Text>
              {" "}
              high <Text className="text-yellow-600">convenience</Text>
            </Text>
          </Text>
          {/* <Image
            className="w-64 h-32 rounded-xl justify-center m-7"
            source={require("../assets/images/favicon.jpg")}
            resizeMode="contain"
          /> */}
          <View className="w-full justify-center items-center h-20 mt-12 px-4">
            <TouchableOpacity
              className="w-64 h-12 rounded-lg m-6 justify-center items-center bg-yellow-600"
              onPress={() => {
                router.push("/sign_up");
              }}
            >
              <Text className="text-lg font-bold">Continue with email</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full justify-center items-center h-20 px-4">
            <TouchableOpacity
              className="w-64 h-12 rounded-lg m-6 justify-center items-center bg-yellow-600"
              onPress={() => {
                router.push("/(tabs)");
              }}
            >
              <Text className="text-lg font-bold">Continue as guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
