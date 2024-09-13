import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { TextInputSubmitEditingEventData } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

type Props = {
  textInputValue?: string;
  onChangeText?: (((text: string) => void) & Function) | undefined;
  onEnter?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
};
const SearchBar: React.FC<Props> = ({
  onChangeText,
  onEnter,
  textInputValue,
}) => {
  return (
    <>
      <View className="flex flex-row items-center justify-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            color="gray"
            name="arrow-back"
            className=" self-end bg-lime-200"
            size={29}
          />
        </TouchableOpacity>
        <TextInput
          className="mx-4 w-64 rounded-xl"
          value={textInputValue}
          onChangeText={onChangeText}
          right={<TextInput.Icon icon={"arrow-right-thick"} color={"grey"} />}
          placeholder={"search"}
          placeholderTextColor={"gray"}
          keyboardAppearance="dark"
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          selectTextOnFocus
          onSubmitEditing={onEnter}
        />
      </View>
    </>
  );
};

export default SearchBar;
