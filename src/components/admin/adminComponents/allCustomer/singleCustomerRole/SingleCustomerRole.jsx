import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaArrowLeft,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminError,
  getSingleCustomer,
  updateCustomerRole,
} from "../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

const SingleCustomerRole = () => {
  const { singleCustomer, loading, isLoading, error } = useSelector(
    (state) => state.admin
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setImage(file);
    };
  }, []);

  useEffect(() => {
    if (singleCustomer) {
      Object.keys(singleCustomer).forEach((key) => {
        setValue(key, singleCustomer[key]);
      });
      setAvatarPreview(singleCustomer?.image_url);
    }
  }, [singleCustomer, setValue]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleCustomer(id));
    }
  }, [dispatch, id]);

  const onSubmit = (editData) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== singleCustomer[key]) {
        formData.append(key, value);
      }
    });
    if (image) {
      formData.append("image", image);
    }
    dispatch(updateCustomerRole({ id, formData, enqueueSnackbar, navigate }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-SingleCustomerView" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/baltra-admin-dashboard/all-customer-List"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            <FaArrowLeft size={20} className="mr-2" />
            Back to Customer List
          </Link>
        </div>
      </div>

      {loading ? (
        <FormSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Customer Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                      singleCustomer?.is_verified
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {singleCustomer?.firstname} {singleCustomer?.lastname}
                  </h1>
                  <p className="text-gray-600 mt-1">Customer ID: #{id}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        singleCustomer?.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {singleCustomer?.role?.charAt(0).toUpperCase() +
                        singleCustomer?.role?.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        singleCustomer?.is_verified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {singleCustomer?.is_verified ? "Verified" : "Unverified"}
                    </span>
                    {singleCustomer?.membership && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                        Premium Member
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Customer Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaUser className="mr-2" />
                      Personal Information
                    </h3>

                    {/* Read-only fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={singleCustomer?.firstname || ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={singleCustomer?.lastname || ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="text"
                          value={formatDate(singleCustomer?.dob)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={
                            singleCustomer?.gender?.charAt(0).toUpperCase() +
                              singleCustomer?.gender?.slice(1) || "N/A"
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <input
                        type="text"
                        value={formatDate(singleCustomer?.date_joined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Address Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Address
                        </label>
                        <input
                          type="text"
                          value={singleCustomer?.customerAddress || "N/A"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                          readOnly
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            District
                          </label>
                          <input
                            type="text"
                            value={singleCustomer?.district || "N/A"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={singleCustomer?.city || "N/A"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-red-600"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Editable Fields */}
                <div className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Profile Image
                    </h3>
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <label
                          htmlFor="imgFile"
                          className="w-full h-full flex items-center justify-center cursor-pointer"
                        >
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <FaUser className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <span className="text-sm text-gray-500">
                                Upload Image
                              </span>
                            </div>
                          )}
                        </label>
                        <input
                          id="imgFile"
                          type="file"
                          name="image"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileInputChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Click to upload a new profile image
                      </p>
                    </div>
                  </div>

                  {/* Editable Contact Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaEnvelope className="mr-2" />
                      Contact & Role Management
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          {...register("contact", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message:
                                "Please enter a valid 10-digit phone number",
                            },
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                          placeholder="Enter phone number"
                        />
                        {errors.contact && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.contact.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role *
                        </label>
                        <select
                          {...register("role", {
                            required: "Role is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        {errors.role && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Link
                      to="/baltra-admin-dashboard/all-customer-List"
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:focus:outline-none focus:border-red-600 transition-colors duration-200 font-medium min-w-[120px] flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCustomerRole;
