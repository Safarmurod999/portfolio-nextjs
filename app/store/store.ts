import { configureStore } from "@reduxjs/toolkit";
import { stateSlice, userSlice } from "./slices";
export const store = configureStore({
  reducer: { user: userSlice, state: stateSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
