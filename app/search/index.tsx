import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Card,
  Text as TextPaper,
  MD3Colors,
  TextInput,
  Avatar,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import SearchBar from "@/components/features/search/SearchBar";
import { searchApi } from "@/redux/searchApi";

const Search = () => {
  const [value, setValue] = useState("");
  const [trigger, result, lastPromiseInfo] = searchApi.useLazySearchQuery({});

  const handleEnter = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      trigger(value, true);
      console.log("enter pressed with ", value);
    },
    [trigger, value]
  );

  useMemo(() => {
    console.log(
      "result.data ",
      result.data?.coins.slice(0, 3),
      "lastPromiseInfo",
      lastPromiseInfo
    );
  }, [result.isLoading, result.isFetching, result.isSuccess, result.isError]);

  const LeftContent = (props: { size: number }) => (
    <Avatar.Image
      {...props}
      source={{
        uri: "https://coin-images.coingecko.com/coins/images/325/thumb/Bitcoin.png",
      }}
    />
  );

  return (
    <View>
      <SearchBar
        textInputValue={value}
        onEnter={handleEnter}
        onChangeText={(text) => setValue((_) => text)}
      />
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />

        <Card.Content>
          <TextPaper variant="titleLarge">Bitcoin</TextPaper>
          <TextPaper variant="bodyMedium">Card content</TextPaper>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
