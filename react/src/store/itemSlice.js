import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  searchData: null,
};

// Fetch API
export const searchItem = createAsyncThunk(
  "item/search",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/item/search?keyword=${data.keyword}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      if (!response.ok) {
        return rejectWithValue(jsonData);
      }
      return jsonData;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

// Config slice
export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    // storeItem: (state) => (state.searchData = state.searchData),
  },
  extraReducers: (builder) => {
    // Start request
    builder.addCase(searchItem.pending, (state) => {
      state.isLoading = true;
    });
    // Request successful
    builder.addCase(searchItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchData = action.payload.items;
      // console.log(action.payload.items);
      console.log("success item search");
    });
    // Request error
    builder.addCase(searchItem.rejected, (state, action) => {
      state.isLoading = false;
      console.log("reject item");
    });
  },
});

// Export actions
// export const { searchItem } = itemSlice.actions;

// Select state from slice

export const selectSearchData = (state) => state.item.searchData;
export const selectLoading = (state) => state.item.isLoading;

// Export reducer
export default itemSlice.reducer;
