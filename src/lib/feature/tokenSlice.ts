import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
interface token_interface {
  value: string;
}
const initialState: token_interface = {
  value: "",

  
};

export const tokenSlice = createSlice({
  name: "token",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<token_interface>) => {
      Object.assign(state, action.payload);
      console.log("From token slice => ", state);
    },
  },
});

export const { setToken } = tokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.token;

const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
