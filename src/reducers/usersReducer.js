import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
  usersList: [
    { username: "harshsh31", password: "foobar" },
    { username: "foo", password: "bar" },
  ],
  error: false,
  userDetails: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    addUserDetails(state, action) {
      state.userDetails = { ...action.payload };
    },
    setErrorUser(state, action) {
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;

export const userActions = usersSlice.actions;
