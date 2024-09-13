import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadingHoc from "./components/loadingHoc";
import errorHoc from "./components/errorHoc";
import { FadeLoading } from "react-native-fade-loading";
import { StyleSheet } from "react-native";

export interface CoinsSearchResult {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
export interface CoinsSearchResults extends Array<CoinsSearchResult> {}

export interface ExchangesSearchResult {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}
export interface ExchangesSearchResults extends Array<ExchangesSearchResult> {}

export interface IcoSearchResult {
  categories: { id: number; name: string };
}
export interface IcoSearchResults extends Array<IcoSearchResult> {}

export interface NftSearchResult {
  id: number;
  name: string;
  symbol: string;
  thumb: string;
}
export interface NftSearchResults extends Array<NftSearchResult> {}

export interface SearchResults {
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
    }),
  }),
});

const styles = StyleSheet.create({
  box: { width: "90%", height: 35, marginVertical: 5 },
});

export const searchApiLoadingWrapper = loadingHoc<SearchResults, string>();
export const searchApiErrorWrapper = errorHoc<SearchResults, string>();
