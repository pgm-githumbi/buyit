import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadingHoc from "./components/loadingHoc";
import errorHoc from "./components/errorHoc";
import { FadeLoading } from "react-native-fade-loading";
import { StyleSheet } from "react-native";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
}

export const coinListApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/markets",
  }),
  tagTypes: ["Coins"],
  endpoints: (builder) => ({
    getAll: builder.query<Coin[], void>({
      query: () => `?vs_currency=usd&order=market_cap_desc`,
      providesTags(result, error, arg, meta) {
        return [{ type: "Coins", id: "LIST" }];
      },
    }),
  }),
});

const styles = StyleSheet.create({
  box: { width: "90%", height: 3, marginVertical: 5 },
});

export const CoinListLoading = loadingHoc<Coin[], void>(
  <>
    {Array.from(Array(10).keys()).map((index) => (
      <FadeLoading
        key={index}
        visible={false}
        style={styles.box}
        primaryColor="slategrey"
        secondaryColor="slategray"
        duration={5000}
        animated
        children={""}
      />
    ))}
  </>
);
export const CoinListError = errorHoc<Coin[], void>();
