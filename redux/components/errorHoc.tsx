import { StyleSheet } from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import { ApiReturnCaseHandlerProps } from "../apiTypes";

type WrapperProps<ResultType, QueryArg> = {
  errorComponent?: React.ReactNode;
} & ApiReturnCaseHandlerProps<ResultType, QueryArg>;

export const errorHoc =
  <ResultType, QueryArg>(errorComponentHocLevel?: React.ReactNode) =>
  ({ children, query, errorComponent }: WrapperProps<ResultType, QueryArg>) => {
    const defaultErr = <Text className="text-sky-400">Loading...</Text>;
    const err = errorComponent || errorComponentHocLevel || defaultErr;
    return (
      <>
        {query.isError && err}
        {!query.isError && children}
      </>
    );
  };

export default errorHoc;

const styles = StyleSheet.create({});
