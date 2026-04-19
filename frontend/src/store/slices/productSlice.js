import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listProducts = createAsyncThunk('products/listProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const getProductDetails = createAsyncThunk('products/getProductDetails', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const createProductReview = createAsyncThunk('products/createProductReview', async ({ productId, review }, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, review, config);
    return true;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: { reviews: [] },
    loading: false,
    error: null,
    successProductReview: false,
    loadingProductReview: false,
    errorProductReview: null,
  },
  reducers: {
    resetProductReview: (state) => {
      state.successProductReview = false;
      state.loadingProductReview = false;
      state.errorProductReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(listProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(listProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(getProductDetails.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getProductDetails.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; })
      .addCase(getProductDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createProductReview.pending, (state) => { state.loadingProductReview = true; state.errorProductReview = null; })
      .addCase(createProductReview.fulfilled, (state) => { state.loadingProductReview = false; state.successProductReview = true; })
      .addCase(createProductReview.rejected, (state, action) => { state.loadingProductReview = false; state.errorProductReview = action.payload; });
  },
});

export const { resetProductReview } = productSlice.actions;

export default productSlice.reducer;
