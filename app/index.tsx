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

const OnBoarding = () => {
  const titleGradient =
    "bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500";
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col justify-center items-center w-full min-h-[85vh]">
          <View className="flex flex-row mt-7 justify-center justify-evenly items-center">
            <Image
              source={{
                //   uri: "https://cdn-icons-png.flaticon.com/128/3737/3737372.png",
                uri: "https://cdn-icons-png.flaticon.com/512/3737/3737151.png",
              }}
              className="w-32 h-32 mr-4 justify-self-start self-center "
              resizeMode="contain"
            />

            <View className="h-32 w-32 bg-lime-100">
              <View className="h-32">
                <MaskedView
                  style={{ flex: 1, flexDirection: "row", height: "100%" }}
                  maskElement={
                    <View
                      style={{
                        // Transparent background because mask is based off alpha channel.
                        backgroundColor: "transparent",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        className="text-5xl"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Buy it
                      </Text>
                    </View>
                  }
                >
                  <LinearGradient
                    colors={[
                      "#C8441C",
                      "#4c669f",
                      "#3b5998",
                      // "#CA5715",
                      "#C8441C",
                      // "#192f6a",
                      "#320E3B",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></LinearGradient>
                </MaskedView>
              </View>
            </View>
          </View>

          {/* <View className="h-32">
          <MaskedView
            style={{ flex: 1, flexDirection: "row", height: "100%" }}
            maskElement={
              <View
                style={{
                  // Transparent background because mask is based off alpha channel.
                  backgroundColor: "transparent",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 60,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Basic Mask
                </Text>
              </View>
            }
          >
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#324376" }}
            />
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#F5DD90" }}
            />
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#F76C5E" }}
            />
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#e1e1e1" }}
            />
          </MaskedView>
        </View> */}
          {/* <View className="size-3 justify-centerr items-center"> */}
          {/* </View> */}
          <Text className="text-3xl font-bold text-white text-center mt-7">
            Everything you want
            <Text>
              {" "}
              at <Text className="text-amber-500">affordable prices</Text>
            </Text>
          </Text>
          <Image
            className="w-32 h-32 justify-center m-7"
            source={require("../assets/images/logo1.png")}
            resizeMode="contain"
          />
          <View className="w-full justify-center items-center h-80 px-4">
            <TouchableOpacity
              className="w-64 h-12 rounded-lg m-6 justify-center items-center bg-amber-400"
              onPress={() => {
                router.push("/sign_up");
              }}
            >
              <Text className="text-lg font-bold">Continue with email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
