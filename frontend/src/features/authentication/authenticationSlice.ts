import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  currentUser: string | undefined;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  currentUser: undefined,
  isLoading: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
});

export default authenticationSlice;