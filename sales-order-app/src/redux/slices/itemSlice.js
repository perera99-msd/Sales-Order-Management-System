import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [], // REMOVE the hardcoded items - start with empty array
    loading: false,
    error: null,
  },
  reducers: {
    // ADD these reducers to handle API responses
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload; // This will store the 8 items from API
    },
  },
});

// Export the actions
export const {
  setLoading,
  setError,
  setItems,
} = itemSlice.actions;

export default itemSlice.reducer;