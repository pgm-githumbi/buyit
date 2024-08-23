import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/Themed";
import FormInput from "@/components/form/FormInput";
import { MonoText } from "@/components/StyledText";
import { Link } from "expo-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {};
  return (
    <SafeAreaView className=" justify-center">
      <ScrollView className="flex flex-col w-full h-full justify-items-center content-start">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3737/3737151.png",
            }}
            className="w-32 h-24 m-4 justify-self-start "
            resizeMode="contain"
          />
          <MonoText className="text-3xl font-pregular no-italic text-indigo-200 font-extrabold">
            BUY IT
          </MonoText>
        </View>
        <View className="m-8">
          <Text className="text-2xl mb-3 font-pregular font-semibold ">
            Log into your account
          </Text>

          <FormInput
            label="Email or username"
            handleChangeText={setUsername}
            value={username}
          />
          <FormInput
            label="Password"
            handleChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            onPress={submit}
            className={`border-2 mt-16 rounded-2xl h-12 justify-center items-center border-pink-200`}
          >
            <Text className="btn font-pregular font-semibold text-md text-accent ">
              Submit
            </Text>
          </TouchableOpacity>
          <Text className="text-start mt-3 font-psemibold text-gray-100">
            Don't have an account? {"   "}
            {/* <Pressable> */}
            <Link className="text-sm italic" href={"/(auth)/sign_up"}>
              {" "}
              <MonoText className="text-gray-300">create account</MonoText>{" "}
            </Link>
            {/* </Pressable> */}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
