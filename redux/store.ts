import { configureStore } from "@reduxjs/toolkit";
import { coinListApi } from "./coinListApi";
import { marketApi } from "./marketApi";
import { historicalApi } from "./historicalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { persistStore } from "redux-persist";
import { searchApi } from "./searchApi";
import { coinApi } from "./coinApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reducer = persistCombineReducers(persistConfig, {
  [coinListApi.reducerPath]: coinListApi.reducer,
  [marketApi.reducerPath]: marketApi.reducer,
  [historicalApi.reducerPath]: historicalApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [coinApi.reducerPath]: coinApi.reducer,
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100028,

        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    })
      .concat(coinListApi.middleware)
      .concat(marketApi.middleware)
      .concat(historicalApi.middleware)
      .concat(searchApi.middleware)
      .concat(coinApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
