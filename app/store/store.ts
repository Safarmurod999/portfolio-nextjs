import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./mainSlice";
import stateReducer from "./stateSlice";
export const store = configureStore({
  reducer: { data: dataReducer, state: stateReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
