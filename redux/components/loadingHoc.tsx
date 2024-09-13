import { StyleSheet } from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import { ApiReturnCaseHandlerProps } from "../apiTypes";

type WrapperProps<ResultType, QueryArg> = {
  loadingComponent?: React.ReactNode;
} & ApiReturnCaseHandlerProps<ResultType, QueryArg>;

export const loadingHoc =
  <ResultType, QueryArg>(loadingComponentHocLevel?: React.ReactNode) =>
  ({
    children,
    query,
    loadingComponent,
  }: WrapperProps<ResultType, QueryArg>) => {
    const defaultLoading = <Text className="text-sky-400">Loading...</Text>;
    const load = loadingComponent || loadingComponentHocLevel || defaultLoading;
    return (
      <>
        {query.isLoading && load}
        {!query.isLoading && children}
      </>
    );
  };

export default loadingHoc;

const styles = StyleSheet.create({});
