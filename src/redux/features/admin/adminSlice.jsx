import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/ErrorHandle";
import API from "../../api/api";

/**
 * @typedef {Object} AdminState
 * @property {boolean} loading
 * @property {boolean} isLoading
 * @property {boolean} isProcessing
 * @property {string} error
 * @property {string} message
 * @property {object | null} singleCustomer
 * @property {Array | null} allCustomers
 * @property {object | null} user
 * @property {Array | null} allUsers
 * @property {Array | null} allUsers
 * @property {object | null} categoryProduct
 * @property {Array | null} allCategoryProducts
 * @property {object | null} subCategoryProduct
 * @property {Array | null} allSubCategoryProducts
 * @property {Array | null} dropdownCategories
 * @property {Array | null} dropdownSubCategories
 * @property {object | null} addProduct
 * @property {object | null} qrProduct
 * @property {Array | null} allQrList
 * @property {Array | null} allProducts
 * @property {Array | null} subCategoryList
 * @property {object | null} warrantyPackage
 * @property {Array | null} allWarrantyPackagesList
 * @property {Array | null} allProductCatalogList
 * @property {object | null} productCatalog
 * @property {Array | null} allCustomizedProducts
 * @property {object | null} personalizationSingleView
 * @property {Array | null} bulkQuoteProducts
 * @property {object | null} bulkQuoteProduct
 * @property {Array | null} complaintStatus
 *
 * @type {AdminState}
 */

//all UsersList
export const getAllUserList = createAsyncThunk(
  "admin/allAdminUserList",
  async ({ firstname, gender, page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (firstname) queryParams.append("firstname", firstname);
      if (gender) queryParams.append("gender", gender);
      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/user/getallusers${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get single View
export const getSingleUser = createAsyncThunk(
  "admin/singleUserView",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user/getuserbyid/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//updateUserRole
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/user/updateuser/${id}`, formData);
      toast.success(response.data.message || "user data updated");
      navigate("/baltra-admin-dashboard/all-user-List");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//delete UserRole
export const deleteUserRole = createAsyncThunk(
  "/admin/deleteUserRole",
  async ({ user_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/user/deleteusers/${user_id}`);
      toast.success(response.data.message || "user deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleUserRole

export const deleteMultipleUsersRole = createAsyncThunk(
  "/admin/deleteMultipleUsersRole",
  async ({ user_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/user/deletemultipleusers`, {
        data: { user_ids },
      });

      toast.success(response.data.message || "user deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
//get all Customers List

//Previous
// export const getAllCustomerList = createAsyncThunk(
//   "admin/allAdminCustomerList",
//   async ({ firstname, gender, page } = {}, { rejectWithValue }) => {
//     try {
//       let queryParams = new URLSearchParams();
//       if (firstname) queryParams.append("firstname", firstname);
//       if (gender) queryParams.append("gender", gender);
//       if (page) queryParams.append("page", page);
//       const response = await API.get(
//         `/user/getallcustomers${
//           queryParams.toString() ? `?${queryParams.toString()}` : ""
//         }`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue({ message: getErrorMessage(error) });
//     }
//   }
// );

//new With Tier
export const getAllCustomerList = createAsyncThunk(
  "admin/allAdminCustomerList",
  async ({ firstname, gender, tier, page } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (firstname) queryParams.append("firstname", firstname);
      if (gender) queryParams.append("gender", gender);
      if (tier) queryParams.append("tier", tier);
      if (page) queryParams.append("page", page);

      const response = await API.get(
        `/user/getallcustomers${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get all single List
export const getSingleCustomer = createAsyncThunk(
  "admin/singleCustomerView",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user/getcustomerbyid/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//updateCustomerRole
export const updateCustomerRole = createAsyncThunk(
  "admin/updateCustomerRole",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/user/updatecustomer/${id}`, formData);
      toast.success(response.data.message || "customer data updated");
      navigate("/baltra-admin-dashboard/all-customer-List");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//delete User Role
export const deleteCustomerRole = createAsyncThunk(
  "/admin/deleteCustomerRole",
  async ({ customer_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/user/deletecustomers/${customer_id}`);
      toast.success(response.data.message || "customer deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

// deleteMultipleCustomersRole;
export const deleteMultipleCustomersRole = createAsyncThunk(
  "/admin/deleteMultipleCustomersRole",
  async ({ customer_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/user/deletemultiplecustomers`, {
        data: { customer_ids },
      });

      toast.success(response.data.message || "customer deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//add Category Product Section

export const addCategory = createAsyncThunk(
  "/admin/add-Category",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/addcategory`, formData);
      toast.success(response.data.message || "category added success!");
      navigate("/baltra-admin-dashboard/all-category-List");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//allCategoryProducts
export const categoryProductsList = createAsyncThunk(
  "/admin-allCategoryProducts",
  async ({ name = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (name) queryParams.append("name", name);
      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/products/getcategory${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//singleCategoryProductId
export const categoryProductById = createAsyncThunk(
  "/admin-categoryProductById",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/getcategorybyid/${category_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteCategory
export const deleteCategory = createAsyncThunk(
  "/admin/deleteCategory",
  async ({ category_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deletecategory/${category_id}`
      );
      toast.success(response.data.message || "category delete success!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//editCategory
export const editCategory = createAsyncThunk(
  "/admin-editCategory",
  async ({ category_id, formData, toast }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/products/updatecategory/${category_id}`,
        formData
      );
      toast.success(response.data.message || "category update success1");

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//Add Sub Category
export const addSubCategory = createAsyncThunk(
  "/admin-subCategoryProduct",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/addsubcategory`, formData);
      toast.success(response.data.message || "subCategory added SuccessFully!");
      navigate("/baltra-admin-dashboard/all-sub-category-List");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//AllSubCategoryProducts

export const subCategoryProductsList = createAsyncThunk(
  "/admin-allSubCategoryProducts",
  async ({ name = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (name) queryParams.append("name", name);
      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/products/getsubcategory${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//singleCategory
export const dropdownCategory = createAsyncThunk(
  "/admin-dropdownCategory",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getcategorylist`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

export const dropdownSubCategory = createAsyncThunk(
  "/admin-dropdownSubCategory",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/getsubcategorylist/${category_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//subCategoryDropDownList
export const dropdownSubCategoryList = createAsyncThunk(
  "/admin-dropdownSubCategoryList",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getsubcategories`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteSubCategory
export const deleteSubCategory = createAsyncThunk(
  "/admin-deletesubCategory",
  async ({ subcategory_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deletesubcategory/${subcategory_id}`
      );
      toast.success(response.data.message || "subCategory deleted success!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//SubCategoryEdit
export const editSubCategory = createAsyncThunk(
  "/admin-editSubCategory",
  async ({ id, formData, toast }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/products/updatesubcategory/${id}`,
        formData
      );
      toast.success(response.data.message || "subCategory update Success!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//subCategoryID
export const subCategoryById = createAsyncThunk(
  "/admin-subCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getsubcategorybyid/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//addProductByAmin
export const addBaltraProduct = createAsyncThunk(
  "/admin-addProduct",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/postproducts`, formData);
      toast.success(response.data.message || "product added SuccessFully!");
      navigate("/baltra-admin-dashboard/all-products-list");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getAllProductsByAmdmin
export const allBaltraProducts = createAsyncThunk(
  "/admin-allBaltraProducts",
  async ({ category_name, page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page);
      if (category_name) queryParams.append("category_name", category_name);
      const response = await API.get(
        `/products/getdata${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//singleProductView
export const singleProductView = createAsyncThunk(
  "/admin-singleProductView",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getdatabyid/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteBaltraProductsByAdmin
export const deleteBaltraProduct = createAsyncThunk(
  "/admin-deleteBaltraProduct",
  async ({ product_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deleteproducts/${product_id}`
      );
      toast.success(response.data.message || "product delete SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getSingleProductById
export const singleProductById = createAsyncThunk(
  "/admin-singleProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//edit Product
export const editProduct = createAsyncThunk(
  "/admin/edit-Product",
  async ({ product_id, formData, toast }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/products/updateproduct/${product_id}`,
        formData
      );
      toast.success(response.data.message || "product Update SuccessFully!");

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//addBulkImport
export const addBulkImport = createAsyncThunk(
  "/admin-addBulkImport",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/bulkproductqr`, formData);
      toast.success(response.data.message || "bulk added successFully!");
      navigate("/baltra-admin-dashboard/all-QrProducts-list");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteQrProduct
export const deleteBaltraQrProduct = createAsyncThunk(
  "/admin-deleteBaltraQrProduct",
  async ({ product_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deleteqrproduct/${product_id}`
      );
      toast.success(response.data.message || "qr deleted SuccessFully!");

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleQrProduct
export const deleteMultipleQrProduct = createAsyncThunk(
  "/admin-deleteQrMultipleProduct",
  async ({ product_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/deleteqrproduct-multiple`, {
        data: { product_ids },
      });
      toast.success(response.data.message || "Bulk remove successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleCategoryOnce(deleteMultipleCategoryProduct)
export const deleteMultipleCategoryProduct = createAsyncThunk(
  "/admin-deleteMultipleCategoryProduct",
  async ({ category_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/deleteselectedcategory`, {
        data: { category_ids },
      });
      toast.success(response.data.message || "category remove successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleSubCategoryProduct
export const deleteMultipleSubCategoryProduct = createAsyncThunk(
  "/admin-deleteMultipleSubCategoryProduct",
  async ({ subcategory_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/deleteselectedsubcategory`, {
        data: { subcategory_ids },
      });
      toast.success(
        response.data.message || "SubCategory remove successfully!"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleProduct
export const deleteMultipleProduct = createAsyncThunk(
  "/admin-deleteMultipleProduct",
  async ({ product_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/deletemultipleproducts`, {
        data: { product_ids },
      });
      toast.success(response.data.message || "Product remove successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//AddQRProduct
export const addQrProduct = createAsyncThunk(
  "/admin-addQrProduct",
  async ({ addQrValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/postqr`, addQrValue);
      toast.success(response.data.message || "product added SuccessFully!");
      navigate("/baltra-admin-dashboard/all-QrProducts-list");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get All QrList
export const getAllQrList = createAsyncThunk(
  "/admin-getAllQrList",
  async (page = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();

      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/products/getproductqr${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
// Redux Thunk for downloading ZIP
export const downloadAllQrInPDF = createAsyncThunk(
  "admin/downloadAllQrInPDF",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/products/exportproductqr", {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//downloadSelectQrInPDF

// export const downloadSelectQrInPDF = createAsyncThunk(
//   "admin/downloadSelectQrInPDF",
//   async (selectedProductsId, { rejectWithValue }) => {
//     try {
//       const response = await API.get(
//         "/products/exportproductqrbyid",
//         { ids: selectedProductsId },
//         { responseType: "blob" }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue({ message: error.message });
//     }
//   }
// );

export const downloadSelectQrInPDF = createAsyncThunk(
  "admin/downloadSelectQrInPDF",
  async (selectedProductsId, { rejectWithValue }) => {
    try {
      // Join the selectedProductIds into a comma-separated string
      const idsQuery = selectedProductsId.join(",");

      // Send the ids as query parameters in the GET request
      const response = await API.get(
        `/products/exportproductqrbyid?ids=${idsQuery}`,
        {
          responseType: "blob",
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// //downloadAllQrInPDF
// export const downloadAllQrInPDF = createAsyncThunk(
//   "admin/downloadAllQrInPDF",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/products/exportproductqr", {
//         responseType: "blob",
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue({ message: error.message });
//     }
//   }
// );

//addWarrantyPackage
export const addWarrantyPackage = createAsyncThunk(
  "/admin/add-WarrantyPackage",
  async ({ warrantyValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/products/extendwarrantyform`,
        warrantyValue
      );
      toast.success(
        response.data.message || "Warranty Package added successFully!"
      );
      navigate(`/baltra-admin-dashboard/all/warranty-package-list`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//get SingleWarrantyById
export const singleWarrantyProduct = createAsyncThunk(
  "admin/singleWarrantyProduct",
  async ({ form_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/products/getwarrantyformbyid/${form_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//editWarrantyProduct

export const editWarrantyForm = createAsyncThunk(
  "admin/editWarrantyForm",
  async ({ form_id, warrantyValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/products/updatewarrantyform/${form_id}`,
        warrantyValue
      );
      toast.success(response.data.message || "Warranty update Success!");
      navigate("/baltra-admin-dashboard/all/warranty-package-list");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//getAllWarrantyPackages

export const getAllWarrantyPackages = createAsyncThunk(
  "/admin-getAllWarrantyPackages",
  async ({ type = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (type) queryParams.append("type", type);
      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/products/getextendwarrantyforms${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteSingleWarranty

export const deleteWarrantyCard = createAsyncThunk(
  "admin/deleteWarrantyCard",
  async ({ form_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deleteextendwarrantyform/${form_id}`
      );
      toast.success(response.data.message || "warranty deleted success!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

//deleteMultipleWarrantyPackage

export const deleteMultipleWarrantyPackage = createAsyncThunk(
  "/admin/deleteMultipleWarrantyPackage",
  async ({ form_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/multipledeleteextendwarrantyform`,
        {
          data: { form_ids },
        }
      );

      toast.success(response.data.message || "Warranty deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//Add Product Catalog
export const addProductCatalog = createAsyncThunk(
  "/admin/addProductCatalog",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/uploadcatalogue`, formData);

      toast.success(response.data.message || "Catalog added SuccessFully!");
      navigate("/baltra-admin-dashboard/all/e-catalog-list");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//gell All Product catalog
export const allProductCatalog = createAsyncThunk(
  "/admin/allProductCatalog",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getallcatalogues`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//delete Product Catalog
export const deleteProductCatalog = createAsyncThunk(
  "/admin/deleteProductCatalog",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/deletecatalogue/${id}`);
      toast.success(
        response.data.message || "product catalog deleted SuccessFully!"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get all Customized Products
export const allCustomizedPersonalization = createAsyncThunk(
  "/admin/allCustomizedPersonalization",
  async ({ placement } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (placement) queryParams.append("placement", placement);

      const response = await API.get(
        `/customer/getpersonalizedata${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//single PersonalizationView
export const singlePersonalizationView = createAsyncThunk(
  "/admin/singlePersonalizationView",
  async ({ personalization_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/customer/getpersonalizationbyid/${personalization_id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deletecustomizedProduct(deleteCustomizedProduct)
export const deleteCustomizedProduct = createAsyncThunk(
  "/admin/deleteCustomizedProduct",
  async ({ personalization_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/customer/deletepersonalization/${personalization_id}`
      );
      toast.success(response.data.message || "customize product deleted!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//verifiedCustomizedProduct
export const verifiedCustomizedProduct = createAsyncThunk(
  "/admin/verifiedCustomizedProduct",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/approvepersonalization`, data);
      toast.success(response.data.message || "customize product updated!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//allBulkQuoteProducts
export const allBulkQuoteProducts = createAsyncThunk(
  "/admin/allBulkQuoteProducts",
  async ({ status } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (status) queryParams.append("status", status);

      const response = await API.get(
        `/products/getallquotation${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//singleBulkQuote
export const singleBulkQuote = createAsyncThunk(
  "/admin/singleBulkQuote",
  async ({ quote_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/getquotationbyid/${quote_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteBulkQuoteProduct
export const deleteBulkQuoteProduct = createAsyncThunk(
  "/admin/deleteBulkQuoteProduct",
  async ({ quote_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/products/deletequotation/${quote_id}`
      );
      toast.success(response.data.message || "Bulk Quote Delete SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//verifiedBulkQuoteProduct
export const verifiedBulkQuoteProduct = createAsyncThunk(
  "/admin/verifiedBulkQuoteProduct",
  async ({ quote_id, data, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(
        `/products/approvequotation/${quote_id}`,
        data
      );
      toast.success(
        response.data.message || "Bulk Quote verified SuccessFully!"
      );
      dispatch(allBulkQuoteProducts());
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//trackingStatus
export const trackingComplaintStatus = createAsyncThunk(
  "/admin/trackingComplaintStatus",
  async ({ serial_number, page } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (serial_number) queryParams.append("serial_number", serial_number);
      if (page) queryParams.append("page", page);

      const response = await API.get(
        `/stocks/warrantytable${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

const initialState = {
  loading: false,
  isLoading: false,
  isProcessing: false,
  error: "",
  isError: "",
  message: "",
  singleCustomer: null,
  allCustomers: [],
  user: null,
  allUsers: [],
  dropdownCategories: [],
  dropdownSubCategories: [],
  categoryProduct: null,
  allCategoryProducts: [],
  subCategoryProduct: null,
  allSubCategoryProducts: [],
  addProduct: null,
  allProducts: [],
  qrProduct: null,
  allQrList: [],
  subCategoryList: [],
  warrantyPackage: null,
  allWarrantyPackagesList: [],
  productCatalog: null,
  allProductCatalogList: [],
  allCustomizedProducts: [],
  personalizationSingleView: null,
  bulkQuoteProducts: [],
  bulkQuoteProduct: null,
  complaintStatus: [],
  myProductPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  customerPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  userPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  categoryPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  subCategoryPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  productPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  warrantyPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  bulkPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
  warrantyComplaintPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
};

const adminSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = "";
      state.isError = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllCustomerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomerList.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomers = action.payload.data;
        state.customerPagination = action.payload.categoryPagination;
      })
      .addCase(getAllCustomerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomer = action.payload.data;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCustomerRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { customer_id },
        } = action.meta;
        if (customer_id) {
          state.allCustomers = state.allCustomers.filter(
            (item) => item.id !== customer_id
          );
        }
      })
      .addCase(deleteCustomerRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteMultipleCustomersRole.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleCustomersRole.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { customer_ids },
        } = action.meta;
        if (Array.isArray(customer_ids) && customer_ids.length > 0) {
          state.allCustomers = state.allCustomers.filter(
            (item) => !customer_ids.includes(item.customer_id)
          );
        }
      })
      .addCase(deleteMultipleCustomersRole.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(updateCustomerRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.allCustomers = state.allCustomers.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      })
      .addCase(updateCustomerRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.data;
        state.userPagination = action.payload.categoryPagination;
      })
      .addCase(getAllUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { user_id },
        } = action.meta;
        if (user_id) {
          state.allUsers = state.allUsers.filter((item) => item.id !== user_id);
        }
      })
      .addCase(deleteUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleUsersRole.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleUsersRole.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { user_ids },
        } = action.meta;
        if (Array.isArray(user_ids) && user_ids.length > 0) {
          state.allCustomers = state.allCustomers.filter(
            (item) => !user_ids.includes(item.user_id)
          );
        }
      })
      .addCase(deleteMultipleUsersRole.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.allUsers = state.allUsers.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProduct = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(categoryProductsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategoryProducts = action.payload.data;
        state.categoryPagination = action.payload.category_Pagination;
      })
      .addCase(categoryProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(categoryProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProduct = action.payload.data;
      })
      .addCase(categoryProductById.rejected, (state) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { category_id },
        } = action.meta;
        if (category_id) {
          state.allCategoryProducts = state.allCategoryProducts.map((item) =>
            item.id === category_id ? action.payload.data : item
          );
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(dropdownSubCategoryList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dropdownSubCategoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryList = action.payload.data;
      })
      .addCase(dropdownSubCategoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { category_id },
        } = action.meta;
        if (category_id) {
          state.allCategoryProducts = state.allCategoryProducts.filter(
            (item) => item.id !== category_id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      })
      .addCase(subCategoryProductsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(subCategoryProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubCategoryProducts = action.payload.data;
        state.subCategoryPagination = action.payload.subcategory_Pagination;
      })
      .addCase(subCategoryProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(dropdownCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(dropdownCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.dropdownCategories = action.payload.data;
      })
      .addCase(dropdownCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(dropdownSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(dropdownSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.dropdownSubCategories = action.payload.data;
      })
      .addCase(dropdownSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryProduct = action.payload;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { subcategory_id },
        } = action.meta;
        if (subcategory_id) {
          state.allSubCategoryProducts = state.allSubCategoryProducts.filter(
            (item) => item.id !== subcategory_id
          );
        }
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(subCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(subCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryProduct = action.payload.data;
      })
      .addCase(subCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.allSubCategoryProducts = state.allSubCategoryProducts.map(
            (item) => (item.id === id ? action.payload.data : item)
          );
        }
      })
      .addCase(editSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(addBaltraProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBaltraProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addProduct = action.payload.data;
      })
      .addCase(addBaltraProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(allBaltraProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(allBaltraProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
        state.productPagination = action.payload.product_Pagination;
      })
      .addCase(allBaltraProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(singleProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.addProduct = action.payload.data;
      })
      .addCase(singleProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addBulkImport.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(addBulkImport.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.qrProduct = action.payload;
      })
      .addCase(addBulkImport.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { product_id },
        } = action.meta;
        if (product_id) {
          state.allProducts = state.allProducts.map((item) =>
            item.id === product_id ? action.payload.data : item
          );
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteBaltraProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBaltraProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { product_id },
        } = action.meta;
        if (product_id) {
          state.allProducts = state.allProducts.filter(
            (item) => item.id !== product_id
          );
        }
      })

      .addCase(deleteBaltraProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(singleProductView.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProductView.fulfilled, (state, action) => {
        state.loading = false;
        state.addProduct = action.payload.data;
      })
      .addCase(singleProductView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addQrProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQrProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.qrProduct = action.payload;
      })
      .addCase(addQrProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllQrList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllQrList.fulfilled, (state, action) => {
        state.loading = false;
        state.allQrList = action.payload.data;
        state.myProductPagination = action.payload.myproduct_pagination;
      })
      .addCase(getAllQrList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteBaltraQrProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBaltraQrProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { product_id },
        } = action.meta;
        if (product_id) {
          state.allQrList = state.allQrList.filter(
            (item) => item.product_id !== product_id
          );
        }
      })
      .addCase(deleteBaltraQrProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleQrProduct.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleQrProduct.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { product_ids },
        } = action.meta;
        if (Array.isArray(product_ids) && product_ids.length > 0) {
          state.allQrList = state.allQrList.filter(
            (item) => !product_ids.includes(item.product_id)
          );

          // if (
          //   state.allQrList.length === 0 &&
          //   state.myProductPagination.page > 1
          // ) {
          //   state.myProductPagination.page -= 1;
          //   state.allQrList = [];
          // }
        }
      })

      .addCase(deleteMultipleQrProduct.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })

      .addCase(deleteMultipleCategoryProduct.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleCategoryProduct.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { category_ids },
        } = action.meta;
        if (Array.isArray(category_ids) && category_ids.length > 0) {
          state.allCategoryProducts = state.allCategoryProducts.filter(
            (item) => !category_ids.includes(item.product_id)
          );
        }
      })
      .addCase(deleteMultipleCategoryProduct.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })

      .addCase(deleteMultipleSubCategoryProduct.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleSubCategoryProduct.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { subcategory_ids },
        } = action.meta;
        if (Array.isArray(subcategory_ids) && subcategory_ids.length > 0) {
          state.allSubCategoryProducts = state.allSubCategoryProducts.filter(
            (item) => !subcategory_ids.includes(item.product_id)
          );
        }
      })
      .addCase(deleteMultipleSubCategoryProduct.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleProduct.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleProduct.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { product_ids },
        } = action.meta;
        if (Array.isArray(product_ids) && product_ids.length > 0) {
          state.allSubCategoryProducts = state.allSubCategoryProducts.filter(
            (item) => !product_ids.includes(item.product_id)
          );
        }
      })
      .addCase(deleteMultipleProduct.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(addWarrantyPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWarrantyPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.warrantyPackage = action.payload;
      })
      .addCase(addWarrantyPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(singleWarrantyProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleWarrantyProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warrantyPackage = action.payload.data;
      })
      .addCase(singleWarrantyProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllWarrantyPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWarrantyPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.allWarrantyPackagesList = action.payload.data;
        state.warrantyPagination = action.payload.warrantyPagination;
      })
      .addCase(getAllWarrantyPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(editWarrantyForm.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(editWarrantyForm.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { form_id },
        } = action.meta;
        if (form_id) {
          state.allWarrantyPackagesList = state.allWarrantyPackagesList.map(
            (item) => (item.id === form_id ? action.payload.data : item)
          );
        }
      })
      .addCase(editWarrantyForm.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(deleteWarrantyCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWarrantyCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { form_id },
        } = action.meta;
        if (form_id) {
          state.allWarrantyPackagesList = state.allWarrantyPackagesList.filter(
            (item) => item.id !== form_id
          );
        }
      })
      .addCase(deleteWarrantyCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleWarrantyPackage.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleWarrantyPackage.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { form_ids },
        } = action.meta;
        if (Array.isArray(form_ids) && form_ids.length > 0) {
          state.allWarrantyPackagesList = state.allWarrantyPackagesList.filter(
            (item) => !form_ids.includes(item.warranty_id)
          );
        }
      })
      .addCase(deleteMultipleWarrantyPackage.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(addProductCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.productCatalog = action.payload.data;
      })
      .addCase(addProductCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allProductCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProductCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductCatalogList = action.payload.data;
      })
      .addCase(allProductCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteProductCatalog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCatalog.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { id },
        } = action.meta;
        state.allProductCatalogList = state.allProductCatalogList.filter(
          (item) => item.id !== id
        );
      })
      .addCase(deleteProductCatalog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(allCustomizedPersonalization.pending, (state) => {
        state.loading = true;
      })
      .addCase(allCustomizedPersonalization.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomizedProducts = action.payload.data;
      })
      .addCase(allCustomizedPersonalization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCustomizedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomizedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { personalization_id },
        } = action.meta;
        if (personalization_id) {
          state.allCustomizedProducts = state.allCustomizedProducts.filter(
            (item) => item.id !== personalization_id
          );
        }
      })
      .addCase(deleteCustomizedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      })
      .addCase(verifiedCustomizedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifiedCustomizedProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data;
        const personalization_id = updatedProduct.personalization_id;

        state.isLoading = false;

        state.allCustomizedProducts = state.allCustomizedProducts.map((item) =>
          item.personalization_id === personalization_id ? updatedProduct : item
        );
      })

      .addCase(verifiedCustomizedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(singlePersonalizationView.pending, (state) => {
        state.loading = true;
      })
      .addCase(singlePersonalizationView.fulfilled, (state, action) => {
        state.loading = false;
        state.personalizationSingleView = action.payload.data;
      })
      .addCase(singlePersonalizationView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allBulkQuoteProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(allBulkQuoteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bulkQuoteProducts = action.payload.data;
        state.bulkPagination = action.payload.pagination;
      })
      .addCase(allBulkQuoteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteBulkQuoteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBulkQuoteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const { quote_id } = action.meta.arg;
        if (quote_id) {
          state.bulkQuoteProducts = state.bulkQuoteProducts.filter(
            (item) => item.quote_id !== quote_id
          );
        }
      })
      .addCase(deleteBulkQuoteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      })
      .addCase(verifiedBulkQuoteProduct.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(verifiedBulkQuoteProduct.fulfilled, (state, action) => {
        state.isProcessing = false;
        const { quote_id } = action.meta.arg;
        if (quote_id) {
          state.bulkQuoteProducts = state.bulkQuoteProducts.map((item) =>
            item.quote_id === quote_id ? action.payload.data : item
          );
        }
      })
      .addCase(verifiedBulkQuoteProduct.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(singleBulkQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleBulkQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.bulkQuoteProduct = action.payload.data;
      })
      .addCase(singleBulkQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(trackingComplaintStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(trackingComplaintStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.complaintStatus = action.payload.data;
        state.warrantyComplaintPagination =
          action.payload.allwarranty_pagination;
      })

      .addCase(trackingComplaintStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;

export default adminSlice.reducer;
