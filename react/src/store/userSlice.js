import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  errorMessage: "",
  currentUser: null,
  token: null,
};

// Fetch API
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    // const response = await fetch("http://127.0.0.1:8000/api/token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const jsonData = await response.json();
    // if (response.status === 501) {
    //   return rejectWithValue(jsonData);
    // }
    // return jsonData;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      if (!response.ok) {
        // console.log(rejectWithValue(jsonData));
        return rejectWithValue(jsonData);
      }
      // const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

// Config slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    });

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      console.log(action.payload.message);
    });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Select state currentUser from slice
export const selectUser = (state) => state.user.currentUser;
export const selectToken = (state) => state.user.token;
export const selectLoading = (state) => state.user.isLoading;
export const selectErrorMessage = (state) => state.user.errorMessage;

// Export reducer
export default userSlice.reducer;
