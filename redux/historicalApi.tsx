import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useMemo } from "react";
import { REHYDRATE } from "redux-persist";
import errorHoc from "./components/errorHoc";
import loadingHoc from "./components/loadingHoc";

export interface HistoryResp {
  prices: [unix_timestamp: number, value: number][];
  market_caps: [unix_timestamp: Number, value: number][];
  total_volumes: [unix_timestamp: number, value: number][];
}
type HookProps = {
  coin_id: string;
  days: number;
};
export const historicalApi = createApi({
  reducerPath: "historicalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/",
  }),
  tagTypes: ["historical"],
  endpoints: (builder) => ({
    historicalData: builder.query<HistoryResp, HookProps>({
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
    if (type === REHYDRATE && payload) {
      return (payload as unknown as any)[reducerPath];
    }
  },
});

export const useHistoricalPrice = ({ coin_id, days }: HookProps) => {
  const query = historicalApi.useHistoricalDataQuery({ coin_id, days });

  const defaultResult: HistoryResp["prices"] = [
    [1711843200000, 69702.3087473573],
    [1711929600000, 69702.3087473573],
    [1711983682000, 69702.3087473573],
  ];

  const result = query.data?.prices || defaultResult;

  return useMemo(
    () => ({
      ...query,
      prices: result.map((value) => ({
        date: new Date(value[0]),
        value: value[1],
      })),
    }),
    [query.data?.prices, result, query.error]
  );
};

export const HistApiErrorWrapper = errorHoc<HistoryResp, HookProps>();
export const HistApiLoadingWrapper = loadingHoc<HistoryResp, HookProps>();
