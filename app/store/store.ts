import { configureStore } from "@reduxjs/toolkit";
import {
  categoriesSlice,
  educationSlice,
  leadsSlice,
  projectsSlice,
  stateSlice,
  userSlice,
} from "./slices";
export const store = configureStore({
  reducer: {
    user: userSlice,
    state: stateSlice,
    categories: categoriesSlice,
    leads: leadsSlice,
    education: educationSlice,
    projects: projectsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
