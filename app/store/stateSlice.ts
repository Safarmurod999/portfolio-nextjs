import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  toggleSidebar: boolean;
  toggleNavbar: boolean;
}

const initialState: DataState = {
  toggleNavbar: false,
  toggleSidebar: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    handleNavbar(state) {
      state.toggleNavbar = !state.toggleNavbar;
      return state;
    },
    handleSidebar(state) {
      state.toggleSidebar = !state.toggleSidebar;      
      return state;
    },
  },
});

export default stateSlice.reducer;
export const { handleNavbar, handleSidebar } = stateSlice.actions;
