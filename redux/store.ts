import { configureStore } from "@reduxjs/toolkit";
import { coinListApi } from "./coinListApi";
import { marketApi } from "./marketApi";
import { historicalApi } from "./historicalApi";
const store = configureStore({
  reducer: {
    [coinListApi.reducerPath]: coinListApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
    [historicalApi.reducerPath]: historicalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(coinListApi.middleware)
      .concat(marketApi.middleware)
      .concat(historicalApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
