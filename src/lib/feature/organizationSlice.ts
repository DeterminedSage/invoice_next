import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { billing_address_interface } from "../types";

// Define the initial state using that type
const initialState: billing_address_interface[] = [];

export const organizationSlice = createSlice({
  name: "organizations",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrganization: (
      state,
      action: PayloadAction<billing_address_interface[]>
    ) => {
      // console.log("From organization slice => ", state);
      state.splice(0, state.length, ...action.payload);
      console.log("From organization slice => ", state); //printing the updated state but still rendering the old state
    },
  },
});

export const { setOrganization } = organizationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

const organizationReducer = organizationSlice.reducer;

export default organizationReducer;
