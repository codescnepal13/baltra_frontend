import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLongArrowAltRight,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  clearAuthError,
} from "../../../../redux/features/auth/authSlice";

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

  const newPassword = watch("new_password");

  // Password validation checks
  const passwordChecks = {
    length: newPassword?.length >= 8,
    lowercase: /[a-z]/.test(newPassword || ""),
    uppercase: /[A-Z]/.test(newPassword || ""),
    number: /\d/.test(newPassword || ""),
    special: /[@$!%*?&]/.test(newPassword || ""),
  };

  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prev) => !prev);
  };

  const renderError = useCallback(
    (fieldName) => {
      return (
        errors[fieldName] && (
          <p className="text-red-500 text-sm font-gothamNarrow tracking-wider mt-1">
            {errors[fieldName].type === "required" &&
              `${fieldName.replace("_", " ")} is required`}
            {errors[fieldName].type === "pattern" &&
              `Invalid ${fieldName.replace("_", " ")} format`}
            {errors[fieldName].type === "validate" &&
              `${fieldName.replace("_", " ")} does not match`}
            {errors[fieldName].message && errors[fieldName].message}
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
          enqueueSnackbar,
          navigate,
        })
      );
    } else {
      enqueueSnackbar("Invalid Input", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  const RequirementItem = ({ met, text }) => (
    <div
      className={`flex items-center space-x-3 py-2 ${
        met ? "text-green-600" : "text-gray-500"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          met ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        {met ? (
          <FaCheck className="w-3 h-3 text-green-600" />
        ) : (
          <FaTimes className="w-3 h-3 text-gray-400" />
        )}
      </div>
      <span className="text-sm font-gothamNarrow">{text}</span>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[600px] items-center">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <FaLock className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Change Password
                </h2>
                <p className="text-gray-600">
                  Update your password to keep your account secure
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Old Password */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2 font-gothamNarrow"
                    htmlFor="old_password"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-4 text-sm font-gothamNarrow bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-red-600 transition-all duration-200 pr-12"
                      id="old_password"
                      name="old_password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your current password"
                      {...register("old_password", {
                        required: true,
                        minLength: 8,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() =>
                        togglePasswordVisibility(setPasswordVisible)
                      }
                    >
                      {passwordVisible ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {renderError("old_password")}
                </div>

                {/* New Password */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2 font-gothamNarrow"
                    htmlFor="new_password"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-4 text-sm font-gothamNarrow bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-red-600 transition-all duration-200 pr-12"
                      id="new_password"
                      name="new_password"
                      type={passwordVisibleOne ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("new_password", {
                        required: true,
                        minLength: 8,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() =>
                        togglePasswordVisibility(setPasswordVisibleOne)
                      }
                    >
                      {passwordVisibleOne ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {renderError("new_password")}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2 font-gothamNarrow"
                    htmlFor="confirm_newpassword"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-4 text-sm font-gothamNarrow bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-red-600 transition-all duration-200 pr-12"
                      id="confirm_newpassword"
                      name="confirm_newpassword"
                      type={passwordVisibleTwo ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...register("confirm_newpassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === watch("new_password") ||
                          "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() =>
                        togglePasswordVisibility(setPasswordVisibleTwo)
                      }
                    >
                      {passwordVisibleTwo ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {renderError("confirm_newpassword")}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  )}
                  <span className="font-gothamNarrow">Update Password</span>
                  <FaLongArrowAltRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Illustration & Requirements */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Illustration */}
              <div className="text-center mb-8">
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg mb-6">
                    <FaShieldAlt className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FaCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Secure Your Account
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create a strong password to protect your personal information
                  and keep your account safe from unauthorized access.
                </p>
              </div>

              {/* Password Requirements */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaLock className="w-5 h-5 text-red-500 mr-2" />
                  Password Requirements
                </h4>
                <div className="space-y-1">
                  <RequirementItem
                    met={passwordChecks.length}
                    text="At least 8 characters long"
                  />
                  <RequirementItem
                    met={passwordChecks.lowercase}
                    text="One lowercase letter (a-z)"
                  />
                  <RequirementItem
                    met={passwordChecks.uppercase}
                    text="One uppercase letter (A-Z)"
                  />
                  <RequirementItem
                    met={passwordChecks.number}
                    text="One number (0-9)"
                  />
                  <RequirementItem
                    met={passwordChecks.special}
                    text="One special character (@$!%*?&)"
                  />
                </div>
              </div>

              {/* Security Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-blue-800 mb-1 font-gothamNarrow">
                      Security Tip
                    </h5>
                    <p className="text-xs text-blue-700 leading-relaxed font-gothamNarrow">
                      Use a unique password that you don't use anywhere else.
                      Consider using a password manager to generate and store
                      strong passwords.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
