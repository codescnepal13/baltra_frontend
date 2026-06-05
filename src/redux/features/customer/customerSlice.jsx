import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/ErrorHandle";
import API from "../../api/api";

/**
 * @typedef {Object} CustomerState
 * @property {boolean} loading
 * @property {boolean} isLoading
 * @property {boolean} isProcessing
 * @property {string} error
 * @property {string} isError
 * @property {string} message
 * @property {string} msg
 * @property {Array|null} allCustomerProductsList
 * @property {Object|null} singleCustomerView
 * @property {Object|null} customerVerify
 * @property {Array|null} productComplaints
 * @property {Object|null} productComplaint
 * @property {Object|null} addCrm
 * @property {Array|null} trackingProducts
 * @property {Object|null} trackingProduct
 */
/**
 * @type {CustomerState}
 */
const initialState = {
  loading: false,
  isLoading: false,
  isProcessing: false,
  verificationSuccess: false,
  error: "",
  isError: "",
  message: "",
  msg: "",
  allCustomerProductsList: [],
  singleCustomerView: null,
  customerVerify: null,
  productComplaints: [],
  productComplaint: null,
  addCrm: null,
  trackingProducts: [],
  trackingProduct: null,
  customerProduct_Pagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  complaint_Pagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
};

// Async thunk to fetch products

export const getAllCustomerAddedProductList = createAsyncThunk(
  "customer/getAllCustomerAddedProductList",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stocks/getcustomerproduct?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//single Customer Product List
export const getSingleProductView = createAsyncThunk(
  "customer/getSingleProductView",
  async ({ stock_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stocks/customerproductbyid/${stock_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//delete CustomerProduct
export const deleteCustomerProduct = createAsyncThunk(
  "customer/deleteCustomerProduct",
  async ({ stock_id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/stocks/deleteproductbyadmin/${stock_id}`,
      );
      enqueueSnackbar(
        response.data.message || "customer product deleted successFully!",
        {
          variant: "success",
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//deleteMultipleCustomer
export const deleteMultipleCustomer = createAsyncThunk(
  "customer/admin-deleteMultipleCustomer",
  async ({ stock_ids, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/stocks/deletemultipleproductbyadmin`,
        {
          data: { stock_ids },
        },
      );
      enqueueSnackbar(
        response.data.message || "product deleted successFully!",
        {
          variant: "success",
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//VerifyCustomerProductList
export const verifiedCustomerProduct = createAsyncThunk(
  "customer/verifyCustomerProduct",
  async ({ data, enqueueSnackbar }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(`/stocks/approvemyproduct`, data);

      enqueueSnackbar(response.data.message || "Customer verified success!", {
        variant: "success",
      });
      dispatch(getAllCustomerAddedProductList());
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//getAllProductComplaints
export const allProductComplaints = createAsyncThunk(
  "customer/allProductComplaints",
  async ({ page } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page);

      const response = await API.get(
        `/stocks/getallcomplaints${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//getSingleProductComplaint
export const getSingleProductComplaint = createAsyncThunk(
  "customer/getSingleProductComplaint",
  async ({ complaint_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/stocks/getcomplaintbyid/${complaint_id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//deleteProductComplaint
export const deleteProductComplaint = createAsyncThunk(
  "customer/deleteProductComplaint",
  async ({ complaint_id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/stocks/deletecomplaintbyid/${complaint_id}`,
      );
      enqueueSnackbar(response.data.message || "product complaint deleted!", {
        variant: "success",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//deleteMultipleProductComplaints
export const deleteMultipleProductComplaints = createAsyncThunk(
  "customer/deleteMultipleProductComplaints",
  async ({ complaint_ids, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/stocks/deletemultiplecomplaints`, {
        data: { complaint_ids },
      });
      enqueueSnackbar(
        response.data.message || "product complaint deleted successFully!",
        {
          variant: "success",
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//addCrmContent
export const addCrmContent = createAsyncThunk(
  "customer/addCrmContent",
  async ({ CRMConfig, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/stocks/customerservicerequesttocrm`,
        CRMConfig,
      );

      enqueueSnackbar(response.data.message || "CRM added successFully!", {
        variant: "success",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: getErrorMessage(error) });
    }
  },
);

//getAllTrackingProducts
export const getAllTrackingProducts = createAsyncThunk(
  "customer/getAllTrackingProducts",
  async (
    { job_no, model_no, model_name, serial_no, status } = {},
    { rejectWithValue },
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (status) queryParams.append("status", status);
      if (job_no) queryParams.append("job_no", job_no);
      if (model_no) queryParams.append("model_no", model_no);
      if (model_name) queryParams.append("model_name", model_name);
      if (serial_no) queryParams.append("serial_no", serial_no);

      const query = queryParams.toString();
      const response = await API.get(
        `/stocks/getallcomplaintsbycustomer${query ? `?${query}` : ""}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

//singleTrackingProductByID
export const singleTrackingProductByID = createAsyncThunk(
  "customer/singleTrackingProductByID",
  async ({ complaint_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/stocks/getcomplaintbyidcustomer/${complaint_id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  },
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearCustomerError: (state) => {
      state.error = "";
      state.isError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomerAddedProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomerAddedProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomerProductsList = action.payload.data;
        state.customerProduct_Pagination =
          action.payload.customerProduct_Pagination;
      })
      .addCase(getAllCustomerAddedProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleProductView.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProductView.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomerView = action.payload.data;
      })
      .addCase(getSingleProductView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteCustomerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { stock_id },
        } = action.meta;
        if (stock_id) {
          state.allCustomerProductsList = state.allCustomerProductsList.filter(
            (item) => item.id !== stock_id,
          );
        }
      })
      .addCase(deleteCustomerProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      })
      .addCase(deleteMultipleCustomer.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleCustomer.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { stock_ids },
        } = action.meta;
        if (Array.isArray(stock_ids) && stock_ids.length > 0) {
          state.allCustomerProductsList = state.allCustomerProductsList.filter(
            (item) => !stock_ids.includes(item.product_id),
          );
        }
      })
      .addCase(deleteMultipleCustomer.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = action.payload.message;
      })

      .addCase(verifiedCustomerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifiedCustomerProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationSuccess = true;
        state.verifiedCustomerProduct = action.payload.data;
      })
      .addCase(verifiedCustomerProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.verificationSuccess = false;
        state.error = action.payload.message;
      })
      .addCase(allProductComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProductComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.productComplaints = action.payload.data;
        state.complaint_Pagination = action.payload.complaint_Pagination;
      })
      .addCase(allProductComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getSingleProductComplaint.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProductComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.productComplaint = action.payload.data;
      })
      .addCase(getSingleProductComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteProductComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { complaint_id },
        } = action.meta;
        if (complaint_id) {
          state.productComplaints = state.productComplaints.filter(
            (item) => item.id !== complaint_id,
          );
        }
      })
      .addCase(deleteProductComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleProductComplaints.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleProductComplaints.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { complaint_ids },
        } = action.meta;
        if (Array.isArray(complaint_ids) && complaint_ids.length > 0) {
          state.productComplaints = state.productComplaints.filter(
            (item) => !complaint_ids.includes(item.product_id),
          );
        }
      })
      .addCase(deleteMultipleProductComplaints.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(addCrmContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCrmContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addCrm = action.payload.serviceData;
      })
      .addCase(addCrmContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.msg;
      })
      .addCase(getAllTrackingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrackingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.trackingProducts = action.payload.data;
      })
      .addCase(getAllTrackingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(singleTrackingProductByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleTrackingProductByID.fulfilled, (state, action) => {
        state.loading = false;
        state.trackingProduct = action.payload.data;
      })
      .addCase(singleTrackingProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearCustomerError } = customerSlice.actions;

export default customerSlice.reducer;
