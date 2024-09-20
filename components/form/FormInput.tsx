import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import { Text, View } from "../Themed";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

export interface PasswordPlugin {
  textInputProps?: React.Component<TextInputProps>;
  compInsideTextInput?: React.ReactNode;
}
type FormInputProps = {
  label: string;
  value: string;
  handleChangeText: ((text: string) => void) | undefined;
  textInputProps?: PasswordPlugin["textInputProps"];
  compInsideTextInput?: PasswordPlugin["compInsideTextInput"];
};
const FormInput = ({
  label,
  value,
  handleChangeText,
  textInputProps,
  compInsideTextInput,
}: FormInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <View className="my-3">
      <Text className="text-md font-pregular mb-2 pl-2 font-medium text-neutral-400">
        {label}:
      </Text>
      <View className="flex h-16 w-full flex-row items-center justify-center justify-between rounded-2xl border-2 border-neutral-900 focus:border-neutral-600">
        <TextInput
          className="mx-4"
          value={value}
          onChangeText={handleChangeText}
          placeholder={label.toLowerCase()}
          placeholderTextColor={"gray"}
          style={{ color: "white" }}
          secureTextEntry={label === "Password" && showPass === false}
          onPressIn={() => console.log("pes")}
        />
        {(label === "Password" && showPass === false && (
          <Ionicons
            className="mr-20"
            onPress={() => setShowPass(!showPass)}
            name="eye"
            size={32}
            color={"dimgray"}
          />
        )) ||
          (showPass && (
            <FontAwesome5
              className=""
              onPress={() => setShowPass(!showPass)}
              name="eye-slash"
              size={24}
              color={"dimgray"}
            />
          ))}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
