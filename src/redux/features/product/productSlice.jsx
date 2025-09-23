import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/ErrorHandle";
import API from "../../api/api";

/**
 * @typedef {Object} ProductState
 * @property {boolean} loading
 * @property {boolean} success
 * @property {boolean} isLoading
 * @property {boolean} isProcessing
 * @property {boolean} isFetching
 * @property {string} error
 * @property {string} message
 * @property {Array|null} allProducts
 * @property {Object|null} singleProduct
 * @property {Array|null} categoryProducts
 * @property {Object|null} categoryProduct
 *  @property {Array|null} subCategoryProducts
 * @property {Object|null} subCategoryProduct
 * @property {Object|null} categoryInfo
 *  @property {Array|null} allKitchenProducts
 *  @property {Array|null} subCategoryRelatedProducts
 * @property {Object|null} ratingReview
 * @property {Array|null} ratingsReviews
 * @property {Object|null} statRatingReview
 * @property {Array|null} allRelatedProducts
 * @property {Object|null} customerAdd
 * @property {Array|null} customerAddedList
 * @property {Object|null} registerAdd
 * @property {Array|null} baltraSearchProductsList
 * @property {Object|null} loyaltyProduct
 * @property {Object|null} rewardPointValue
 * @property {Object|null} redeemWarranty
 * @property {Array|null} allProductsCatalogList
 * @property {Object|null} addPersonalization
 * @property {Object|null} singleAddedProduct
 * @property {Object|null} bulkQuote
 * @property {Array|null} bulkQuotes

/**
 * @type {ProductState}
 */
const initialState = {
  loading: false,
  isLoading: false,
  isFetching: false,
  success: false,
  error: "",
  message: "",
  singleProduct: null,
  customerAdd: null,
  customerAddedList: [],
  singleAddedProduct: null,
  categoryProducts: [],
  categoryProduct: null,
  subCategoryProducts: [],
  subCategoryProduct: null,
  allKitchenProducts: [],
  categoryInfo: null,
  subCategoryRelatedProducts: [],
  ratingReview: null,
  statRatingReview: {},
  ratingsReviews: [],
  allRelatedProducts: [],
  registerAdd: null,
  baltraSearchProductsList: [],
  loyaltyProduct: null,
  rewardPointValue: null,
  redeemWarranty: null,
  allProductsCatalogList: [],
  addPersonalization: null,
  bulkQuote: null,
  bulkQuotes: [],
  bulkPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
};

// Async thunk to fetch products
export const baltraCategoryProducts = createAsyncThunk(
  "products/baltraCategoryProducts",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get("/products/publiccategory");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//Action(Get ID By SubCategoryProducts)
export const baltraSubCategoryProducts = createAsyncThunk(
  "products/baltraSubCategoryProducts",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/subcategorybycategory/${category_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//baltraSubCategoryRelatedProducts(Main Products)
export const baltraSubCategoryRelatedProducts = createAsyncThunk(
  "products/baltraSubCategoryRelatedProducts",
  async (subcategory_id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/productsbysubcategory/${subcategory_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//SingleProductViewById

export const singleProductView = createAsyncThunk(
  "products/singleProductView",
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/getdatabyidpublic/${product_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//addRatingAndReviews
export const addRatingReview = createAsyncThunk(
  "products/addRatingReview",
  async (
    { data, product_id, enqueueSnackbar },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await API.post(`/products/addrating`, data);
      enqueueSnackbar(response.data.message || "review added successFully!", {
        variant: "success",
      });
      dispatch(allRatingsReviewsById(product_id));
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getRatingsReviewByProductId
export const allRatingsReviewsById = createAsyncThunk(
  "products/getRatingsReviewsById",
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/productratings/${product_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//ProductsRelated
export const baltraProductsRelated = createAsyncThunk(
  "products/allRelatedProducts",
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/relatedproducts/${product_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//CustomerAdd
export const baltraCustomerAdd = createAsyncThunk(
  "products/baltraCustomerAdd",
  async ({ formData, enqueueSnackbar }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(`/stocks/myproduct`, formData);
      enqueueSnackbar(response.data.message || "item added successFully!", {
        variant: "success",
      });
      dispatch(allCustomerProducts());
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//CustomerAllProducts
export const allCustomerProducts = createAsyncThunk(
  "products/allCustomerProducts",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stocks/getmyproduct`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//SingleUserProductPage
export const SingleUserProductPage = createAsyncThunk(
  "customer/SingleUserProductPage",
  async ({ stock_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/stocks/customerproductbyidcustomer/${stock_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

export const deleteCustomerProduct = createAsyncThunk(
  "/products/deleteCustomerProduct",
  async ({ id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/stocks/deletemyproduct/${id}`);

      enqueueSnackbar(response.data.message || "item deleted success", {
        variant: "success",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//RegisteredComplaint
export const addRegisteredComplaint = createAsyncThunk(
  "/products/addRegisteredComplaint",
  async ({ stock_id, formData, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/stocks/registercomplaint/${stock_id}`,
        formData
      );
      enqueueSnackbar(
        response.data.message || "Register Complaint added successFully",
        {
          variant: "success",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

// Baltra SearchProducts Action Thunk

export const baltraSearchProducts = createAsyncThunk(
  "products/all-searchProducts",
  async ({ product_name, sort_order } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (product_name) queryParams.append("product_name", product_name);

      if (sort_order && sort_order !== "all") {
        queryParams.append("sort_order", sort_order);
      }

      const response = await API.get(
        `/products/productsearch${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      // Handle any errors
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getWarrantySection(LoyaltyPoints)
export const getSingleBaltraLoyaltyPoints = createAsyncThunk(
  "products/baltraLoyaltyPoints",
  async ({ stock_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stocks/warrantydetailpage/${stock_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getRewardPointValue
export const getRewardPointValue = createAsyncThunk(
  "products/getRewardPointValue",
  async ({ stock_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stocks/loyaltyredeem/${stock_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//addRedeemPoint
export const addRedeemPoint = createAsyncThunk(
  "products/addRedeemPoint",
  async ({ data, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/stocks/redeemloyaltypoints`, data);

      enqueueSnackbar(response.data.message || "Redeem Warranty Success", {
        variant: "success",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get public Products Catalog
export const allProductsCatalog = createAsyncThunk(
  "products/allProductsCatalog",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getallcataloguespublic`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//Add Baltra Personalization
export const addBaltraPersonalization = createAsyncThunk(
  "products/addBaltraPersonalization",
  async ({ formData, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/personalize`, formData);
      enqueueSnackbar(
        response.data.message || "personalization added successFully!",
        {
          variant: "success",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//addBulkQuote
export const addBulkQuote = createAsyncThunk(
  "products/addBulkQuote",
  async ({ data, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/postquotation`, data);
      enqueueSnackbar(response.data.message || "quote added successFully!", {
        variant: "success",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//allBulkHistoryProducts

export const allBulkHistoryProducts = createAsyncThunk(
  "/products/allBulkHistoryProducts",
  async ({ status } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (status) queryParams.append("status", status);

      const response = await API.get(
        `/products/getallquotationbycustomer${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//singleOrderHistory
export const singleOrderHistory = createAsyncThunk(
  "/products/singleOrderHistory",
  async ({ quote_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/getquotationbyidcustomer/${quote_id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(baltraCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(baltraCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload.data;
        state.categoryInfo = action.payload.first_category_info;
        state.allKitchenProducts = action.payload.subcategory_data;
      })
      .addCase(baltraCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(baltraSubCategoryProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(baltraSubCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryProducts = action.payload.data;
        state.categoryInfo = action.payload.category_info;
      })
      .addCase(baltraSubCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(baltraSubCategoryRelatedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(baltraSubCategoryRelatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryRelatedProducts = action.payload.data;
      })
      .addCase(baltraSubCategoryRelatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(singleProductView.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProductView.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.data;
      })
      .addCase(singleProductView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addRatingReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRatingReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ratingReview = action.payload.data;
      })
      .addCase(addRatingReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(allRatingsReviewsById.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(allRatingsReviewsById.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.ratingsReviews = action.payload.data;
        state.statRatingReview = action.payload.rating_data;
      })
      .addCase(allRatingsReviewsById.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(baltraProductsRelated.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(baltraProductsRelated.fulfilled, (state, action) => {
        state.isFetching = false;
        state.allRelatedProducts = action.payload.related_products;
      })
      .addCase(baltraProductsRelated.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
      .addCase(baltraCustomerAdd.pending, (state) => {
        state.loading = true;
      })
      .addCase(baltraCustomerAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customerAdd = action.payload;
      })
      .addCase(baltraCustomerAdd.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      .addCase(allCustomerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCustomerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerAddedList = action.payload.data;
      })
      .addCase(allCustomerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      .addCase(SingleUserProductPage.pending, (state) => {
        state.loading = true;
      })

      .addCase(SingleUserProductPage.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAddedProduct = action.payload.data;
      })

      .addCase(SingleUserProductPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCustomerProduct.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteCustomerProduct.fulfilled, (state, action) => {
        state.isFetching = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.customerAddedList = state.customerAddedList.filter(
            (item) => item.id !== id
          );
        }
      })
      .addCase(deleteCustomerProduct.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
      .addCase(addRegisteredComplaint.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(addRegisteredComplaint.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.registerAdd = action.payload;
      })
      .addCase(addRegisteredComplaint.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(baltraSearchProducts.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(baltraSearchProducts.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.baltraSearchProductsList = action.payload.data;
      })
      .addCase(baltraSearchProducts.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleBaltraLoyaltyPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleBaltraLoyaltyPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.loyaltyProduct = action.payload.data;
      })
      .addCase(getSingleBaltraLoyaltyPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getRewardPointValue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRewardPointValue.fulfilled, (state, action) => {
        state.loading = false;
        state.rewardPointValue = action.payload.data;
      })
      .addCase(getRewardPointValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addRedeemPoint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRedeemPoint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.redeemWarranty = action.payload.data;
      })
      .addCase(addRedeemPoint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(allProductsCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProductsCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductsCatalogList = action.payload.data;
      })
      .addCase(allProductsCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addBaltraPersonalization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBaltraPersonalization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addPersonalization = action.payload.data;
      })
      .addCase(addBaltraPersonalization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(addBulkQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBulkQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.bulkQuote = action.payload;
      })
      .addCase(addBulkQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allBulkHistoryProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(allBulkHistoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bulkQuotes = action.payload.data;
        state.bulkPagination = action.payload.pagination;
      })
      .addCase(allBulkHistoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(singleOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bulkQuote = action.payload.data;
      })
      .addCase(singleOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearProductError } = productSlice.actions;

export default productSlice.reducer;
