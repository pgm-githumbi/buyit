import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryStatus,
} from "@reduxjs/toolkit/query/react";
import loadingHoc from "./components/loadingHoc";
import errorHoc from "./components/errorHoc";
import { FadeLoading } from "react-native-fade-loading";
import { StyleSheet } from "react-native";
import { SerializedError } from "@reduxjs/toolkit";

export interface CoinsSearchResult {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
export interface ExchangesSearchResult {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}
export interface IcoSearchResult {
  categories: { id: number; name: string };
}
export interface NftSearchResult {
  id: number;
  name: string;
  symbol: string;
  thumb: string;
}
export interface CategoriesSearchResult {
  id: number;
  name: string;
}

export interface CoinsSearchResults extends Array<CoinsSearchResult> {}
export interface ExchangesSearchResults extends Array<ExchangesSearchResult> {}
export interface IcoSearchResults extends Array<IcoSearchResult> {}
export interface NftSearchResults extends Array<NftSearchResult> {}
export interface CategoriesSearchResults
  extends Array<CategoriesSearchResult> {}

export interface SearchResults {
  categories: CategoriesSearchResults;
  coins: CoinsSearchResults;
  exchanges: ExchangesSearchResults;
  icos: IcoSearchResults;
  nfts: NftSearchResults;
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/search",
  }),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    search: builder.query<SearchResults, string>({
      query: (searchQuery) => `?query=${searchQuery}`,
      providesTags(result, error, arg, meta) {
        return [{ type: "Search" as const, id: `${arg},${error?.status}` }];
      },
      transformResponse(baseQueryReturnValue: SearchResults, meta, arg) {
        return baseQueryReturnValue;
      },
      keepUnusedDataFor: 60 * 60 * 60, //60 hrs
    }),
  }),
});

const styles = StyleSheet.create({
  box: { width: "90%", height: 35, marginVertical: 5 },
});

export const SearchApiLoadingWrapper = loadingHoc<SearchResults, string>();
export const SearchApiErrorWrapper = errorHoc<SearchResults, string>();

export type SearchApiResult =
  | {
      error: undefined;
      data: undefined;
      fulfilledTimeStamp: undefined;
      originalArgs: undefined;
      requestId: undefined;
      endpointName: string | undefined;
      startedTimeStamp: undefined;
      currentData: SearchResults | undefined;
      isLoading: false;
      isFetching: false;
      isSuccess: false;
      isError: false;
      isUninitialized: true;
      status: QueryStatus;
    }
  | {
      error: FetchBaseQueryError | SerializedError | undefined;
      fulfilledTimeStamp: number | undefined;
      originalArgs: string | undefined;
      requestId: string | undefined;
      endpointName: string | undefined;
      startedTimeStamp: number | undefined;

      currentData: SearchResults | undefined;
      isUninitialized: false;
      isSuccess: false;
      isError: false;
      isLoading: true;
      isFetching: boolean;
      data: undefined;
      status: QueryStatus;
    }
  | {
      originalArgs: string | undefined;
      requestId: string | undefined;
      endpointName: string | undefined;
      startedTimeStamp: number | undefined;
      currentData: SearchResults | undefined;
      isUninitialized: false;
      isLoading: false;
      isError: false;
      isSuccess: true;
      isFetching: true;
      error: undefined;
      data: SearchResults;
      fulfilledTimeStamp: number;
      status: QueryStatus;
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
      status: QueryStatus;
      currentData: SearchResults | undefined;
      isUninitialized: false;
      isLoading: false;
      isFetching: false;
      isSuccess: false;
      isError: true;
      error: FetchBaseQueryError | SerializedError;
    };
