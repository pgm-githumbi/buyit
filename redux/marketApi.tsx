import { addValues } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useMemo } from "react";
import { ApiReturnCaseHandlerProps } from "./apiTypes";
import { Text } from "@/components/Themed";
import loadingHoc from "./components/loadingHoc";
import errorHoc from "./components/errorHoc";
import { FadeLoading } from "react-native-fade-loading";
import { StyleSheet } from "react-native";

export interface Market {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: { [coin: string]: number };
    total_volume: { [coin: string]: number };
    crypto_mrkt_cap?: number;
    crypto_24h_vol?: number;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/global",
  }),
  tagTypes: ["markets"],
  endpoints: (builder) => ({
    totalMarketCap: builder.query<Market, void>({
      query(arg) {
        return ``;
      },
      providesTags(result, error, arg, meta) {
        return [];
      },
    }),
  }),
});

export const useTotalMarketCapValue = () => {
  const queryRes = marketApi.useTotalMarketCapQuery();

  const { crypto_24h_vol, crypto_mrkt_cap } = useMemo(() => {
    if (queryRes?.data) {
      const crypto_mrkt_cap = addValues(queryRes.data?.data.total_market_cap);
      const crypto_24h_vol = addValues(queryRes.data?.data.total_volume);
      return { crypto_24h_vol, crypto_mrkt_cap };
    }
    return { crypto_24h_vol: undefined, crypto_mrkt_cap: undefined };
  }, [
    queryRes?.data,
    queryRes?.data?.data.total_market_cap,
    queryRes?.data?.data.total_volume,
  ]);

  return {
    ...queryRes,
    data: {
      data: {
        ...(queryRes?.data?.data || {}),
        crypto_mrkt_cap,
        crypto_24h_vol,
      },
    },
  };
};

const styles = StyleSheet.create({
  box: { width: "90%", height: 20, marginVertical: 5 },
});

export const LoadingWrapper = loadingHoc<Market, null>(
  <>
    <FadeLoading
      visible={false}
      style={styles.box}
      primaryColor="slategrey"
      secondaryColor="slategray"
      duration={1000}
      animated
      children={""}
    />
  </>
);
export const ErrorWrapper = errorHoc<Market, null>();
