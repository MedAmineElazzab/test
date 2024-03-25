import { createSlice } from "@reduxjs/toolkit";
const defaultTheme =
  typeof window !== "undefined"
    ? window.localStorage.getItem("theme")
    : "light";
// Slice
const slice = createSlice({
  name: "app",
  initialState: {
    theme: defaultTheme,
  },
  reducers: {
    setTheme: (state: any, action: any) => {
      state.theme = action.payload;
      if (typeof window !== "undefined")
        window.localStorage.setItem("theme", action.payload);
    },
  },
});
export default slice.reducer;
// Actions
export const { setTheme } = slice.actions;
