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
    <SafeAreaView className="justify-center">
      <ScrollView className="flex h-full w-full flex-col content-start justify-items-center">
        <View className="flex flex-row items-center">
          <Image
            // source={{
            //   uri: "https://cdn-icons-png.flaticon.com/512/3737/3737151.png",
            // }}
            source={require("../../assets/images/digiChums 4by3-black-bg.jpg")}
            className="m-4 h-24 w-32 justify-self-start"
            resizeMode="contain"
          />
          <MonoText className="font-pregular no-italic font-extrabold text-yellow-500 text-3xl">
            digi chums
          </MonoText>
        </View>
        <View className="m-8">
          <Text className="font-pregular mb-3 font-semibold text-neutral-300 text-2xl">
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
            className={`mt-16 h-12 items-center justify-center rounded-2xl border-2 border-neutral-800`}
          >
            <Text className="btn font-pregular text-md text-accent font-semibold text-neutral-300">
              Submit
            </Text>
          </TouchableOpacity>
          <Text className="font-psemibold mt-3 text-start text-neutral-500">
            Don't have an account? {"   "}
            {/* <Pressable> */}
            <Link className="italic text-sm" href={"/(auth)/sign_up"}>
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
