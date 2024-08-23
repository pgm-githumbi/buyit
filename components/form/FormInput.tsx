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
    <View className=" my-3">
      <Text className="text-md font-pregular font-medium pl-2 mb-2">
        {label}:
      </Text>
      <View className="flex flex-row border-2 border-gray-900 focus:border-indigo-200 rounded-2xl justify-center justify-between items-center w-full h-16">
        <TextInput
          className="mx-4"
          value={value}
          onChangeText={handleChangeText}
          placeholder={label.toLowerCase()}
          placeholderTextColor={"gray"}
          style={{ color: "white" }}
          secureTextEntry={label === "Password" && showPass === false}
        />
        {(label === "Password" && showPass === false && (
          <Ionicons
            className="mr-20"
            onPress={() => setShowPass(!showPass)}
            name="eye"
            size={32}
            color={"indigo"}
          />
        )) ||
          (showPass && (
            <FontAwesome5
              className=""
              onPress={() => setShowPass(!showPass)}
              name="eye-slash"
              size={24}
              color={"indigo"}
            />
          ))}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
