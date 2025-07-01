import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  getProfileMe,
  updateProfile,
} from "../../../../redux/features/auth/authSlice";
import FormSkeleton from "../adminLayout/formSkeleton/FormSkeleton";
import { toast } from "react-toastify";
import { MdOutlineCloudUpload } from "react-icons/md";
import MetaData from "../../../layout/metaData/MetaData";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

const AdminProfile = () => {
  const { customer, loading, isLoading, error, isError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Handle file input for the avatar
  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setImage(file);
      };
    }
  }, []);


  useEffect(() => {
    if (customer) {
      Object.keys(customer).forEach((key) => {
        setValue(key, customer[key]);
      });
      setAvatarPreview(customer?.image_url || null);
    }
  }, [customer, setValue]);

 
  useEffect(() => {
    if (error) {
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);


  useEffect(() => {
    dispatch(getProfileMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearAuthError());
    }
  }, [dispatch, isError]);

  const onSubmit = (editData) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== customer[key]) {
        formData.append(key, value);
      }
    });
    if (image) {
      formData.append("image", image);
    }
    dispatch(updateProfile({ formData, toast }));
  };

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-admin-profile-information" />
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs text-black font-outfit flex-grow md:text-sm">
          Only admins with verified roles can update profile information.
        </p>
      </div>
      {loading ? (
        <FormSkeleton />
      ) : customer ? (
        <div className="bg-[#ffffff] py-5">
          <div className="flex justify-between mb-4 px-6">
            <Link
              to="/baltra-admin-dashboard"
              className="flex items-center"
            >
              <HiOutlineArrowLeftCircle size={24} className="mr-2" />
              View Admin Dashboard
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex px-8 my-8 h-screen"
          >
            <div className="lg:w-1/2 ">
              {/* First Name */}
              <div className="mb-4">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  First Name
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    placeholder="Please enter firstname"
                    {...register("firstname")}
                  />
                </label>
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Last Name
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    placeholder="Please enter lastname"
                    {...register("lastname")}
                  />
                </label>
              </div>

              {/* Email */}
              <div className="mb-4 w-full ">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Email Address
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    placeholder="Please enter your email"
                    {...register("email")}
                    disabled
                  />
                </label>
              </div>

              {/* Phone Number */}
              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Phone Number
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    placeholder="Please enter your phoneNo"
                    {...register("contact")}
                    disabled
                  />
                </label>
              </div>

              {/* Gender */}
              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Gender
                  <select
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    {...register("gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>

              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-3 px-8 rounded-sm mt-2 relative font-gothamNarrow"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Save Changes
              </button>
            </div>
            <div className="lg:w-1/3 relative hidden sm:block">
              <div className="absolute inset-y-0 right-0 p-5">
                <div className="my-5">
                  <div className="md:w-56 md:h-56 border border-gray-400 relative mx-auto">
                    <>
                      <label
                        htmlFor="imgFile"
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                      >
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="profile"
                            className="object-cover w-full h-full cursor-pointer"
                          />
                        ) : (
                          <span>
                            <MdOutlineCloudUpload size={28} />
                          </span>
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
                    </>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-lg font-medium">No data found</h2>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
