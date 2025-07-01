import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaKey } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const { customer, error, isError, isLoading, isProcessing } = useSelector(
    (state) => state.auth
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      toast.warn("Membership is already active.");
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
  }, [dispatch]);

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
      toast.error(error);
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
      <div className="w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-32 flex justify-center items-start py-12">
        <div className="bg-white rounded-sm backdrop-blur-2xl flex flex-col lg:flex-row lg:justify-between w-full max-w-screen-2xl mx-auto gap-8">
          <div className="flex flex-col justify-start items-start gap-6 lg:w-1/2">
            <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
              <div className="relative">
                <div className="my-5">
                  <div className="w-48 h-48 border-2 rounded-full border-gray-400 relative mx-auto">
                    <label
                      htmlFor="imgFile"
                      className="w-full h-full rounded-full flex items-center justify-center cursor-pointer"
                    >
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="profile"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-gothamNarrow">
                          <MdOutlineCloudUpload size={32} />
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start pt-8 items-start lg:mt-0 lg:ml-4">
                <div className="text-gray-800 text-[28px] sm:text-[34px] font-semibold font-gothamNarrow">
                  {customer?.firstname} {customer?.lastname}
                </div>
                <div className="text-gray-800 text-xl sm:text-2xl font-normal font-gothamNarrow mt-2">
                  {customer?.email}
                </div>
                <div className="text-gray-800 text-xl sm:text-2xl font-normal font-gothamNarrow">
                  Joined: {moment(customer?.createdAt).format("DD/MM/YYYY")}
                </div>

                {/* Membership section with rounded toggle */}
                <div className="flex items-center justify-between w-full mt-2">
                  <div className="text-gray-800 text-xl sm:text-2xl font-semibold font-gothamNarrow">
                    Reward Points:
                  </div>

                  {/* Rounded Toggle Button */}
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer font-gothamNarrow">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isMember}
                        disabled={!isToggleEnabled}
                        onChange={handleMembershipToggle}
                      />
                      <div className="w-11 h-6 bg-gray-300 focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      <span
                        className={`ml-6 text-lg font-medium font-gothamNarrow ${
                          isMember ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isMember ? "Active" : "Inactive"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-x-4 items-center mt-6">
              <div className="w-full sm:w-[216px] h-[53px] px-8 py-4 bg-slate-950 border border-slate-950 flex justify-center items-center gap-2">
                <button
                  type="submit"
                  className="text-white text-sm font-normal font-gothamNarrow"
                >
                  Switch Account
                </button>
              </div>
              <div className="w-full sm:w-[216px] h-[53px] group bg-gradient-to-br px-8 py-4 border border-slate-950 flex justify-center items-center gap-2">
                <button
                  type="submit"
                  className="text-[#000C22] text-sm font-semibold font-gothamNarrow"
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

          <div className="flex flex-col justify-start items-start gap-6 lg:w-1/2 mt-8 lg:mt-0">
            <div className="self-stretch h-20 flex justify-between items-center">
              <div>
                {changeComponent ? (
                  <>
                    <div className="text-zinc-900 text-2xl sm:text-3xl font-bold font-gothamNarrow leading-[36px] sm:leading-[48px]">
                      Change Password
                    </div>
                    <div className="text-zinc-900 text-base sm:text-lg font-normal font-gothamNarrow">
                      You can change your Password
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-zinc-900 text-2xl sm:text-3xl font-bold font-gothamNarrow leading-[36px] sm:leading-[48px]">
                      My Profile
                    </div>
                    <div className="text-zinc-900 text-base sm:text-lg font-normal font-gothamNarrow">
                      Store all important data
                    </div>
                  </>
                )}
              </div>

              <button
                className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
                onClick={handleReplace}
              >
                <FaKey size={20} />
                <span className="text-sm sm:text-base font-gothamNarrow whitespace-nowrap">
                  {changeComponent ? "View Profile" : "Change Password"}
                </span>
              </button>
            </div>

            {changeComponent ? (
              <EditPassword />
            ) : (
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      FirstName
                    </div>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter Your firstName"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("firstname")}
                    />
                  </div>

                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      LastName
                    </div>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Your lastname"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("lastname")}
                    />
                  </div>

                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      Email
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("email")}
                      readOnly
                    />
                  </div>
                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      Address
                    </div>
                    <input
                      type="text"
                      name="customerAddress"
                      placeholder="Enter Your Address"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("customerAddress")}
                    />
                  </div>
                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      District
                    </div>
                    <input
                      type="text"
                      name="district"
                      placeholder="Enter Your district"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("district")}
                    />
                  </div>
                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      City
                    </div>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("city")}
                    />
                  </div>

                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      Phone
                    </div>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="+977-9861884972"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("contact")}
                      readOnly
                    />
                  </div>

                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      Gender
                    </div>
                    <div className="relative w-full">
                      <select
                        className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal pr-10"
                        id="gender"
                        name="gender"
                        {...register("gender")}
                      >
                        <option value="" disabled selected>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>

                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        ⌄
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[86px] flex flex-col justify-start items-start gap-2">
                    <div className="text-[#4F4F4F] font-semibold font-gothamNarrow">
                      Date Of Birth
                    </div>
                    <input
                      type="date"
                      name="dob"
                      className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                      {...register("dob")}
                    />
                  </div>

                  <div className="w-full flex justify-center lg:justify-start">
                    <button
                      type="submit"
                      className="relative w-full sm:w-[395px] h-[53px] px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 hover:bg-red-700 text-white font-normal font-gothamNarrow justify-center flex gap-x-4 items-center"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        </span>
                      )}
                      <span>Save Changes</span>
                      <FaArrowRightLong />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
