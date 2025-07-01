import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";
import { getErrorMessage } from "../../../utils/ErrorHandle";

/**
 * @typedef {Object} ContactState
 * @property {boolean} loading
 * @property {boolean} isLoading
 * @property {boolean} isProcessing
 * @property {string} error
 * @property {string} message
 * @property {object | null} contact
 * @property {Array | null} allContacts
 */

/**
 * @type {ContactState}
 */

//Action Dispatch
export const addContact = createAsyncThunk(
  "contact/addForm",
  async ({ contactData, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/contactus/contactus`, contactData);
      toast.success(response.data.message || "Thank you for your message");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//get all Contact List

export const getAllContactList = createAsyncThunk(
  "/admin-getAllContactList",
  async ({ name = "", phone = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      let queryParams = new URLSearchParams();
      if (name) queryParams.append("name", name);
      if (phone) queryParams.append("phone", phone);
      if (page) queryParams.append("page", page);
      const response = await API.get(
        `/contactus/getcontactform${
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
export const getSingleContact = createAsyncThunk(
  "contact/singleView",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/contactus/indvform/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete ContactData
export const deleteContactData = createAsyncThunk(
  "/contact/deleteContact",
  async ({ contact_id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/contactus/deleteform/${contact_id}`);
      toast.success(response.data.message || "contact deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//deleteMultipleContacts
export const deleteMultipleContacts = createAsyncThunk(
  "/contact/deleteMultipleContacts",
  async ({ contact_ids, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/contactus/deletemultiplecontactus`, {
        data: { contact_ids },
      });

      toast.success(response.data.message || "contact deleted SuccessFully!");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
const initialState = {
  loading: false,
  isLoading: false,
  error: "",
  message: "",
  contact: null,
  allContacts: [],
  contactPagination: {
    page: null,
    total_pages: null,
    results_per_page: null,
  },
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllContactList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.allContacts = action.payload.data;
        state.contactPagination = action.payload.contactPagination;
      })
      .addCase(getAllContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.data;
      })
      .addCase(getSingleContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteContactData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { contact_id },
        } = action.meta;
        if (contact_id) {
          state.allContacts = state.allContacts.filter(
            (item) => item.id !== contact_id
          );
        }
      })
      .addCase(deleteContactData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMultipleContacts.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteMultipleContacts.fulfilled, (state, action) => {
        state.isProcessing = false;
        const {
          arg: { contact_ids },
        } = action.meta;
        if (Array.isArray(contact_ids) && contact_ids.length > 0) {
          state.allContacts = state.allContacts.filter(
            (item) => !contact_ids.includes(item.contact_id)
          );
        }
      })
      .addCase(deleteMultipleContacts.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearContactError } = contactSlice.actions;

export default contactSlice.reducer;
