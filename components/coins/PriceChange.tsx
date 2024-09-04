import { StyleSheet } from "react-native";
import React from "react";
import { Text, TextProps, View } from "../Themed";
import { AntDesign } from "@expo/vector-icons";
import numeral from "numeral";
import { Icon } from "@expo/vector-icons/build/createIconSet";

type Props = {
  price_change_percentage: number;
  textFunc?: (change: string, textProps: TextProps) => React.JSX.Element;
  iconSize?: number;
};
const PriceChange = ({
  price_change_percentage,
  textFunc,
  iconSize = 13,
}: Props) => {
  const change = Math.fround(price_change_percentage);

  let pos_neg = change > 0 ? "text-green-500" : "text-red-500";
  if (change === 0) pos_neg = "text-neutral-400";

  return (
    <View className="flex flex-none flex-row items-baseline">
      {change > 0 && (
        <AntDesign
          name="caretup"
          color={"green"}
          className="bg-lime-500"
          size={iconSize}
        />
      )}
      {change < 0 && (
        <AntDesign name="caretdown" size={iconSize} color={"red"} />
      )}
      {textFunc &&
        textFunc(`${numeral(Math.abs(change)).format("0.[0]")}%`, {
          className: `${pos_neg} ml-1 text-sm`,
        })}
      {!textFunc && (
        <Text className={`${pos_neg} ml-1 text-sm`}>
          {numeral(Math.abs(change)).format("0.[0]")}%
        </Text>
      )}
    </View>
  );
};

export default PriceChange;

const styles = StyleSheet.create({});
