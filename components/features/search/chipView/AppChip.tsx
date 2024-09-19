import { Text } from "@/components/Themed";
import { SearchResults } from "@/redux/searchApi";
import { SerializedError } from "@reduxjs/toolkit";
import {
  FetchBaseQueryError,
  QueryStatus,
} from "@reduxjs/toolkit/dist/query/react";
import React, { useMemo } from "react";
import { Chip } from "react-native-paper";
import { ChipNames } from "./ChipSet";

type Props = {
  handleSelectedChanged: (chipName: ChipNames) => void;
  searchResult?:
    | {
        data: undefined;
        error: undefined;
        fulfilledTimeStamp: undefined;
        originalArgs: undefined;
        requestId: undefined;
        endpointName: string | undefined;
        startedTimeStamp: undefined;
        status: QueryStatus.uninitialized;
        currentData: SearchResults | undefined;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: false;
        isUninitialized: true;
      }
    | {
        error: FetchBaseQueryError | SerializedError | undefined;
        fulfilledTimeStamp: number | undefined;
        originalArgs: string | undefined;
        requestId: string | undefined;
        endpointName: string | undefined;
        startedTimeStamp: number | undefined;
        status: QueryStatus;
        currentData: SearchResults | undefined;
        isUninitialized: false;
        isSuccess: false;
        isError: false;
        isLoading: true;
        isFetching: boolean;
        data: undefined;
      }
    | {
        originalArgs: string | undefined;
        requestId: string | undefined;
        endpointName: string | undefined;
        startedTimeStamp: number | undefined;
        status: QueryStatus;
        currentData: SearchResults | undefined;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: true;
        error: undefined;
        data: SearchResults;
        fulfilledTimeStamp: number;
      }
    | {
        originalArgs: string | undefined;
        requestId: string | undefined;
        endpointName: string | undefined;
        startedTimeStamp: number | undefined;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: false;
        error: undefined;
        data: SearchResults;
        fulfilledTimeStamp: number;
        currentData: SearchResults;
        status: QueryStatus;
      }
    | {
        data: SearchResults | undefined;
        fulfilledTimeStamp: number | undefined;
        originalArgs: string | undefined;
        requestId: string | undefined;
        endpointName: string | undefined;
        startedTimeStamp: number | undefined;
        currentData: SearchResults | undefined;
        isUninitialized: false;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: true;
        error: FetchBaseQueryError | SerializedError;
        status: QueryStatus;
      };
  count: number;
  name: ChipNames;
  selectedChips: ChipNames[];
};
const AppChip = ({
  handleSelectedChanged,
  searchResult,
  count,
  name,
  selectedChips,
}: Props) => {
  const icon = useMemo(() => {
    if (selectedChips.includes(name)) {
      return "check";
    }
    return "checkbox-blank-outline";
  }, [name, selectedChips]);
  return (
    <>
      {icon === "check" && (
        <Chip
          icon={"check"}
          className="w-fit"
          onPress={() => handleSelectedChanged(name)}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">
              {name}
              {"   "}
              <Text className="rounded-xl text-purple-300">
                {/* {searchResult.data?.nfts.length} */}
                {count}
              </Text>
            </Text>
          </>
        </Chip>
      )}
      {icon === "checkbox-blank-outline" && (
        <Chip
          icon={"checkbox-blank-outline"}
          className="w-fit"
          onPress={() => handleSelectedChanged(name)}
          style={{ width: "auto" }}
        >
          <>
            <Text className="mr-4">
              {name}
              {"   "}
              <Text className="rounded-xl text-purple-300">
                {/* {searchResult.data?.nfts.length} */}
                {count}
              </Text>
            </Text>
          </>
        </Chip>
      )}
    </>
  );
};

export default AppChip;
