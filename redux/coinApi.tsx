import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StyleSheet } from "react-native";
import loadingHoc from "./components/loadingHoc";
import errorHoc from "./components/errorHoc";
import { FadeLoading } from "react-native-fade-loading";

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string;

  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: string;
  public_notice: string;
  additional_notices: string;

  description: {
    en: string;
  };
  links: {
    homepage: string[];
    whitepaper: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: string;
  sentiment_votes_down_percentage: string;
  watchlist_portfolio_users: string;
  market_cap_rank: number;
}

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/",
  }),
  tagTypes: ["coinData"],
  endpoints: (builder) => ({
    getCoin: builder.query<CoinData, string>({
      query: (coin_id) => `${coin_id}`,
      providesTags(result, error, arg, meta) {
        return [{ type: "coinData", id: `${arg}` }];
      },
      keepUnusedDataFor: 3600 * 60, // 60 hours
      transformResponse(baseQueryReturnValue: CoinData, meta, arg) {
        console.log("data shape", baseQueryReturnValue);
        return baseQueryReturnValue;
      },
    }),
  }),
});

const styles = StyleSheet.create({
  box: { width: "90%", height: 3, marginVertical: 5 },
});

export const CoinLoading = loadingHoc<CoinData, string>(
  <>
    {
      <FadeLoading
        visible={false}
        style={styles.box}
        primaryColor="slategrey"
        secondaryColor="slategray"
        duration={5000}
        animated
        children={""}
      />
    }
  </>
);
export const CoinError = errorHoc<CoinData, string>();
