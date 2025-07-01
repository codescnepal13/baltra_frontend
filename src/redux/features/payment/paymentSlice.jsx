import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/ErrorHandle";
import API from "../../api/api";

/**
 * @typedef {Object} PaymentState
 * @property {boolean} loading
 * @property {boolean} success
 * @property {boolean} isLoading
 * @property {Object|null} addEsewaIntent

 */
/**
 * @type {PaymentState}
 */
const initialState = {
  loading: false,
  isLoading: false,
  success: false,
  error: "",
  message: "",
  addEsewaIntent: null,
};

// Async thunk to fetch Extend Warranty
export const addEsewaPayment = createAsyncThunk(
  "payment/addEsewaPay",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.post("/products/publiccategory");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEsewaPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEsewaPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.addEsewaIntent = action.payload.message;
      })
      .addCase(addEsewaPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearPaymentError } = paymentSlice.actions;

export default paymentSlice.reducer;
