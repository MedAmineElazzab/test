import { UserPatched } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";

// Define the initial user state as an empty object
const initialUser: UserPatched = {};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    updateUser: (state: any, action: any) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { updateUser } = userSlice.actions;
