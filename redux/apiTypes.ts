import {
  fetchBaseQuery,
  TypedUseQueryHookResult,
} from "@reduxjs/toolkit/dist/query/react";

export type QueryResult<ResultType, QueryArg> = TypedUseQueryHookResult<
  ResultType,
  QueryArg,
  ReturnType<typeof fetchBaseQuery>
>;

export type ApiReturnCaseHandlerProps<ResultType, QueryArg> = {
  children: React.ReactNode;
  query: QueryResult<ResultType, QueryArg>;
};
