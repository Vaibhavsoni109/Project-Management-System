import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";
// import { user } from "../../assets/data";
// import { user } from "../../assets/data";


const initialState = {
  user: localStorage.getItem("userinfo")
    ? JSON.parse(localStorage.getItem("userinfo"))
    : user,

  isSidebarOpen: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("userinfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;