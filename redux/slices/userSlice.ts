import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getItem } from "@/lib/utils";
import { setItem } from "@/lib/utils";

const cart = getItem("cart");

interface InitialStateType {
  user: any;
}

const initialState: InitialStateType = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      setItem("user", action.payload);
    }
  },
});

export const {
  setUser
} = userSlice.actions;

export default userSlice.reducer;
