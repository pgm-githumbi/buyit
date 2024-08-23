import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PasswordPlugin } from "./FormInput";

type Props = {
  children: (props: PasswordPlugin) => React.ReactNode;
};
const PasswordInput = ({ children }: Props) => {
  return (
    <View>
      <Text>PasswordInput</Text>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({});
