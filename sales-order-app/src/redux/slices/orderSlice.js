import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.items.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setOrders,
  setSelectedOrder,
  addOrder,
  updateOrder,
  clearSelectedOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;