import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAuthError,
  resetPassword,
} from "../../../redux/features/auth/authSlice";
import userAuthImg from "../../../assets/images/userAuthImg.png";
import BaltraSubCategoryHeader from "../../baltraSubCategoryProducts/baltraSubCategoryHeader/BaltraSubCategoryHeader";
import MetaData from "../../../components/layout/metaData/MetaData";

const ResetPassword = () => {
  const { loading, error, customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordVisibleOne, setPasswordVisibleOne] = useState(false);
  const [passwordVisibleTwo, setPasswordVisibleTwo] = useState(false);

  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prev) => !prev);
  };

  const onSubmit = (resetData) => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        resetPassword({
          resetData: { ...resetData, contact: customer.contact },
          toast,
          navigate,
        })
      );
    } else {
      return toast.warn("Invalid Input!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra resetPassword" />
      <div className="relative w-full lg:min-h-screen py-8 bg-white flex justify-center items-center">
        <img
          className="absolute top-0 left-0 w-full h-full blur-[1px]"
          src={userAuthImg}
          alt="Background"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full z-10">
          <BaltraSubCategoryHeader />
        </div>
        <div className="relative w-full mt-24 max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 sm:px-10 pb-6 bg-white rounded-sm shadow-sm">
          <form
            className="flex flex-col justify-center items-start w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8 px-2 mt-5 w-full">
              <h1 className="text-2xl font-bold text-zinc-900 mb-1 font-gothamNarrow">
                Reset Password
              </h1>
              <p className="text-sm text-zinc-900 font-gothamNarrow tracking-wide mb-4">
                Remember, keeping your password secure is important to us. Make
                sure to choose a strong password that you haven't used before.
              </p>
              <p className="text-sm text-zinc-900 font-gothamNarrow tracking-wide mb-4">
                If you have any issues, please contact our support team for
                assistance.
              </p>
            </div>

            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="new_password"
              >
                New Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="new_password"
                  name="new_password"
                  type={passwordVisibleOne ? "text" : "password"}
                  placeholder="******************"
                  {...register("new_password", {
                    required: true,
                    minLength: 8,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                  })}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    togglePasswordVisibility(setPasswordVisibleOne)
                  }
                >
                  {passwordVisibleOne ? (
                    <FaEyeSlash className="text-neutral-600" />
                  ) : (
                    <FaEye className="text-neutral-600" />
                  )}
                </div>
              </div>
              {errors.new_password && (
                <p className="text-red-600 text-xs font-gothamNarrow">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="confirm_password"
                  name="confirm_password"
                  type={passwordVisibleTwo ? "text" : "password"}
                  placeholder="******************"
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) =>
                      value === watch("new_password") ||
                      "Passwords do not match.",
                  })}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    togglePasswordVisibility(setPasswordVisibleTwo)
                  }
                >
                  {passwordVisibleTwo ? (
                    <FaEyeSlash className="text-neutral-600" />
                  ) : (
                    <FaEye className="text-neutral-600" />
                  )}
                </div>
              </div>
              {errors.confirm_password && (
                <p className="text-red-600 text-xs font-gothamNarrow">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <div className="w-full px-3 relative mb-4 flex">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-red-600 hover:bg-red-700
               focus:ring-4 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center flex items-center justify-center font-gothamNarrow"
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Save
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
