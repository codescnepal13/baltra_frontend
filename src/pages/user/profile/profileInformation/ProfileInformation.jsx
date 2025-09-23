import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaKey } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LogoutPopUp from "../../../../components/layout/logoutPopUp/LogoutPopUp";
import {
  clearAuthError,
  getProfileMe,
  setLogout,
  updateMemberShipStatus,
  updateProfile,
} from "../../../../redux/features/auth/authSlice";
import EditPassword from "../editPassword/EditPassword";

const ProfileInformation = () => {
  const { customer, error, isError, isLoading } = useSelector(
    (state) => state.auth
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [isMember, setIsMember] = useState(customer?.membership || false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(!customer?.membership);

  useEffect(() => {
    setIsMember(customer?.membership);
    setIsToggleEnabled(!customer?.membership);
  }, [customer]);

  // Handle membership toggle change
  const handleMembershipToggle = () => {
    const data = {
      customer_id: customer?.id,
      enable_membership: true,
    };

    if (customer?.membership === true) {
      enqueueSnackbar("Membership is already active", {
        variant: "error",
      });

      return;
    }

    if (!isMember) {
      setIsMember(true);
      dispatch(updateMemberShipStatus({ data, toast }));
    }
  };

  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [changeComponent, setChangeComponent] = useState(false);

  const handleReplace = () => {
    setChangeComponent((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const handleLogout = useCallback(() => {
    setOpenModal(false);
    dispatch(setLogout());
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setImage(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  useEffect(() => {
    if (customer) {
      Object.keys(customer).forEach((key) => {
        setValue(key, customer[key]);
      });
      setAvatarPreview(customer?.image_url);
    }
  }, [customer, setValue]);

  useEffect(() => {
    if (error) {
      dispatch(clearAuthError());
    }
  }, [error]);

  useEffect(() => {
    dispatch(getProfileMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, {
        variant: "error",
      });
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
    dispatch(updateProfile({ formData, enqueueSnackbar }));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        {/* Header Section */}

        {/* Main Content */}
        <div className="max-w-8xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-32 py-12">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-8 lg:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8">
                {/* Left Side - Profile Info */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 flex-1">
                  {/* Profile Image */}
                  <div className="relative group">
                    <div className="w-36 h-36 border-4 border-white rounded-full shadow-2xl bg-white p-1 relative overflow-hidden">
                      <label
                        htmlFor="imgFile"
                        className="w-full h-full rounded-full flex items-center justify-center cursor-pointer overflow-hidden relative group"
                      >
                        {avatarPreview ? (
                          <>
                            <img
                              src={avatarPreview}
                              alt="profile"
                              className="object-cover w-full h-full rounded-full transition-all duration-500 group-hover:scale-110"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-full flex items-center justify-center">
                              <MdOutlineCloudUpload className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                            <MdOutlineCloudUpload className="text-4xl text-slate-400" />
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
                    {/* Edit Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-red-500">
                      <MdOutlineCloudUpload className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="text-center lg:text-left">
                    <div className="mb-4">
                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        {customer?.firstname} {customer?.lastname}
                      </h2>
                      <div className="flex flex-col gap-1">
                        <p className="text-red-100 text-lg">
                          {customer?.email}
                        </p>
                        <p className="text-red-200 text-sm">
                          Member since{" "}
                          {moment(customer?.createdAt).format("MMMM YYYY")}
                        </p>
                      </div>
                    </div>

                    {/* Membership Status Card */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30 max-w-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">
                            Reward Points
                          </h3>
                          <p className="text-red-100 text-sm">
                            {isMember ? "Premium Member" : "Standard Member"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isMember}
                              disabled={!isToggleEnabled}
                              onChange={handleMembershipToggle}
                            />
                            <div className="w-14 h-7 bg-white bg-opacity-30 focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500 peer-checked:bg-opacity-80"></div>
                          </label>
                          <span
                            className={`font-bold text-sm ${
                              isMember ? "text-green-200" : "text-red-200"
                            }`}
                          >
                            {isMember ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="flex flex-col gap-3 lg:min-w-[240px]">
                  <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-xl px-6 py-3 hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
                    <button
                      type="submit"
                      className="text-white font-semibold w-full text-center"
                    >
                      Switch Account
                    </button>
                  </div>
                  <div className="bg-red-800 hover:bg-red-900 border border-red-700 rounded-xl px-6 py-3 transition-all duration-300 cursor-pointer">
                    <button
                      type="submit"
                      className="text-white font-semibold w-full text-center"
                      onClick={() => setOpenModal(true)}
                    >
                      Log Out
                    </button>
                    {openModal && (
                      <LogoutPopUp
                        onClose={handleClose}
                        handleDelete={handleLogout}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 lg:p-12">
              {/* Section Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 pb-6 border-b border-slate-200">
                <div className="mb-4 lg:mb-0">
                  {changeComponent ? (
                    <>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">
                        Change Password
                      </h3>
                      <p className="text-slate-600 text-lg">
                        Update your password to keep your account secure
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">
                        Personal Information
                      </h3>
                      <p className="text-slate-600 text-lg">
                        Keep your profile information up to date
                      </p>
                    </>
                  )}
                </div>

                <button
                  className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-200 hover:border-red-200"
                  onClick={handleReplace}
                >
                  <FaKey size={18} />
                  <span className="whitespace-nowrap">
                    {changeComponent ? "View Profile" : "Change Password"}
                  </span>
                </button>
              </div>

              {/* Content */}
              {changeComponent ? (
                <div className="w-full">
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4 lg:p-8 border border-slate-200">
                    <EditPassword />
                  </div>
                </div>
              ) : (
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                            Personal Details
                          </h4>

                          <div className="space-y-5">
                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                First Name
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                placeholder="Enter Your firstName"
                                className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                {...register("firstname")}
                              />
                            </div>

                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastname"
                                placeholder="Enter Your lastname"
                                className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                {...register("lastname")}
                              />
                            </div>

                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="block w-full bg-slate-50 text-slate-500 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight cursor-not-allowed"
                                {...register("email")}
                                readOnly
                              />
                            </div>

                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="contact"
                                placeholder="+977-9861884972"
                                className="block w-full bg-slate-50 text-slate-500 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight cursor-not-allowed"
                                {...register("contact")}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                            Location & Details
                          </h4>

                          <div className="space-y-5">
                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Address
                              </label>
                              <input
                                type="text"
                                name="customerAddress"
                                placeholder="Enter Your Address"
                                className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                {...register("customerAddress")}
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="group">
                                <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                  District
                                </label>
                                <input
                                  type="text"
                                  name="district"
                                  placeholder="Enter Your district"
                                  className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                  {...register("district")}
                                />
                              </div>

                              <div className="group">
                                <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  placeholder="Enter Your City"
                                  className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                  {...register("city")}
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Gender
                              </label>
                              <div className="relative">
                                <select
                                  className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300 appearance-none cursor-pointer"
                                  id="gender"
                                  name="gender"
                                  {...register("gender")}
                                >
                                  <option value="" disabled>
                                    Select Gender
                                  </option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                  <svg
                                    className="w-5 h-5 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div className="group">
                              <label className="text-slate-700 font-semibold text-sm mb-3 block">
                                Date Of Birth
                              </label>
                              <input
                                type="date"
                                name="dob"
                                className="block w-full bg-white text-slate-700 border-2 border-slate-200 rounded-xl py-4 px-5 text-sm leading-tight focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 hover:border-slate-300"
                                {...register("dob")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mt-12">
                      <button
                        type="submit"
                        className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-12 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex gap-4 items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          </span>
                        )}
                        <span
                          className={isLoading ? "opacity-0" : "opacity-100"}
                        >
                          Save Changes
                        </span>
                        <FaArrowRightLong
                          className={isLoading ? "opacity-0" : "opacity-100"}
                        />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfileInformation);
