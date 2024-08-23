import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

type Props = {
  handlePress: (event: GestureResponderEvent) => void | undefined;
};
const Button = ({ handlePress }: Props) => {
  return (
    <TouchableOpacity onPress={handlePress} className={``}>
      <Text>Button</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
