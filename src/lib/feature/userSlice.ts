import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { user_interface } from "../types";

// Define the initial state using that type
const initialState: user_interface = {
  _id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user_interface>) => {
      Object.assign(state, action.payload);
      console.log("From user slice => ", state);
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

const userReducer = userSlice.reducer;

export default userReducer;
