import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/form/FormInput";
import { Link } from "expo-router";
import { MonoText } from "@/components/StyledText";

const SignUp = () => {
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
            Create an account
          </Text>

          <FormInput
            label="Username"
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
            className={`border-yellofw-200 mt-16 h-12 items-center justify-center rounded-2xl border-2 bg-neutral-900`}
          >
            <Text className="btn font-pregular text-md text-accent font-semibold text-neutral-300">
              Submit
            </Text>
          </TouchableOpacity>
          <Text className="font-psemibold mt-3 text-start text-neutral-500">
            Already have an account? {"   "}
            {/* <Pressable> */}
            <Link className="italic text-sm" href={"/(auth)/login"}>
              {" "}
              <MonoText className="text-neutral-300">login</MonoText>{" "}
            </Link>
            {/* </Pressable> */}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
