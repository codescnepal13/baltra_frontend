import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import {
  changePassword,
  clearAuthError,
} from "../../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleOne, setPasswordVisibleOne] = useState(false);
  const [passwordVisibleTwo, setPasswordVisibleTwo] = useState(false);

  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prev) => !prev);
  };

  const renderError = useCallback(
    (fieldName) => {
      return (
        errors[fieldName] && (
          <p className="text-red-500 text-sm font-gothamNarrow tracking-wider">
            {errors[fieldName].type === "required" &&
              `${fieldName} is required`}
            {errors[fieldName].type === "pattern" &&
              `Invalid ${fieldName} format`}
            {errors[fieldName].type === "validate" &&
              `${fieldName} does not match`}
          </p>
        )
      );
    },
    [errors]
  );

  const onSubmit = (editPasswordData) => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        changePassword({
          editPasswordData,
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
      <div className="relative w-full  bg-white flex justify-center items-center">
        <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl pb-6 bg-white rounded-sm shadow-sm">
          <form
            className="flex flex-col justify-center items-start w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="old_password"
              >
                Old Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="old_password"
                  name="old_password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******************"
                  {...register("old_password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility(setPasswordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-neutral-600" />
                  ) : (
                    <FaEye className="text-neutral-600" />
                  )}
                </div>
              </div>
              {renderError("old_password")}
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
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
              {renderError("new_password")}
            </div>
            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="confirm_newpassword"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="confirm_newpassword"
                  name="confirm_newpassword"
                  type={passwordVisibleTwo ? "text" : "password"}
                  placeholder="******************"
                  {...register("confirm_newpassword", {
                    required: "confirmPassword is required",
                    validate: (value) =>
                      value === watch("new_password") ||
                      "Password do not match",
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
              {renderError("confirm_newpassword")}
            </div>

            <div className="w-full px-3 relative mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 text-white bg-red-600 hover:bg-red-700
               focus:ring-4 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center font-gothamNarrow relative"
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                <span>Save</span>
                <FaArrowRightLong />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPassword;
