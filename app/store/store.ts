import { configureStore } from "@reduxjs/toolkit";
import {
  categoriesSlice,
  educationSlice,
  experienceSlice,
  leadsSlice,
  projectsSlice,
  serviceDetailsSlice,
  servicesSlice,
  stateSlice,
  technologiesSlice,
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
    technologies: technologiesSlice,
    experience: experienceSlice,
    services: servicesSlice,
    serviceDetails: serviceDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
