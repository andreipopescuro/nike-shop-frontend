import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    fetchingProducts: false,
    error: false,
  },
  reducers: {
    importCartStart: (state) => {},
    importCartSuccess: (state, action) => {
      state.error = false;
      state.fetchingProducts = false;
      state.products = action.payload.products || [];
      state.quantity = action.payload.quantity || 0;
      state.total = action.payload.total || 0;
    },
    importCartFail: (state) => {
      state.fetchingProducts = false;
      state.error = true;
    },

    addProduct: (state, action) => {
      if (state.products.length > 0) {
        let index = state.products.indexOf(
          state.products.find((item) => item._id === action.payload._id)
        );

        if (index >= 0) {
          state.products[index].quantity += action.payload.quantity;
          state.total += action.payload.price;
          return;
        }
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    deleteProduct: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (item) => item._id !== action.payload.id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    addMoreQuantity: (state, action) => {
      state.products.filter((item) => {
        if (item._id === action.payload.id) return (item.quantity += 1);
      });
      state.total += action.payload.price;
    },
    reduceMoreQuantity: (state, action) => {
      state.products.filter((item) => {
        if (item._id === action.payload.id) return (item.quantity -= 1);
      });
      state.total -= action.payload.price;
    },
    deleteCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  deleteCart,
  addMoreQuantity,
  reduceMoreQuantity,
  importCartStart,
  importCartSuccess,
  importCartFail,
} = cartSlice.actions;

export default cartSlice.reducer;
