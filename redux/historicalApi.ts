import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useMemo, useRef } from "react";
import { REHYDRATE } from "redux-persist";
import { RootState } from "./store";
import { PayloadAction, Action } from "@reduxjs/toolkit";

export interface HistoryResp {
  prices: [unix_timestamp: number, value: number][];
  market_caps: [unix_timestamp: Number, value: number][];
  total_volumes: [unix_timestamp: number, value: number][];
}
export const historicalApi = createApi({
  reducerPath: "historicalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/",
  }),
  tagTypes: ["historical"],
  endpoints: (builder) => ({
    historicalData: builder.query<
      HistoryResp,
      { coin_id: string; days: number }
    >({
      query({ coin_id, days }) {
        return `${coin_id}/market_chart?vs_currency=usd&days=${days}`;
      },
      providesTags(result, error, arg, meta) {
        return [
          { type: "historical" as const, id: `${arg.coin_id},${arg.days}` },
        ];
      },
      keepUnusedDataFor: 60 * 60, // 1 hour
    }),
  }),
  extractRehydrationInfo({ type, payload }, { reducerPath }) {
    if (type === REHYDRATE) {
      return (payload as unknown as any)[reducerPath];
    }
  },
});

export const useHistoricalPrice = ({
  coin_id,
  days,
}: {
  coin_id: string;
  days: number;
}) => {
  const query = historicalApi.useHistoricalDataQuery({ coin_id, days });

  const defaultResult: HistoryResp["prices"] = [
    [1711843200000, 69702.3087473573],
    [1711929600000, 69702.3087473573],
    [1711983682000, 69702.3087473573],
  ];

  const result = query.data?.prices || defaultResult;

  return useMemo(
    () =>
      result.map((value) => ({
        date: new Date(value[0]),
        value: value[1],
      })),
    [query.data?.prices, query.data?.prices.length]
  );
};
