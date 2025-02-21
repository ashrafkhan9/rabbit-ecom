import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  }
);

// Async thunk to create a new product
export const createProducts = createAsyncThunk(
  "adminProducts/createProducts",
  async () => {
    const response = await axios.post(
      `${API_URL}/api/admin/products`,
      {}, // if no data is needed, pass an empty object
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to update an existing product
export const updateProducts = createAsyncThunk(
  "adminProducts/updateProducts",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to delete a product
export const deleteProducts = createAsyncThunk(
  "adminProducts/deleteProducts",
  async ({ id }) => {
    const response = await axios.delete(
      `${API_URL}/api/admin/products/${id}`, // Updated endpoint
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data; // or return { id } if that's what your reducer expects
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Product
      .addCase(createProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update Product
      .addCase(updateProducts.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      });
  },
});

export default adminProductSlice.reducer;
