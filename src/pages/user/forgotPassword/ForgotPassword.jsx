import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAuthImg from "../../../assets/images/userAuthImg.png";
import MetaData from "../../../components/layout/metaData/MetaData";
import {
  clearAuthError,
  forgotPassword,
} from "../../../redux/features/auth/authSlice";
import BaltraSubCategoryHeader from "../../baltraSubCategoryProducts/baltraSubCategoryHeader/BaltraSubCategoryHeader";

const ForgotPassword = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (forgotData) => {
    if (Object.keys(errors).length === 0) {
      dispatch(forgotPassword({ forgotData, enqueueSnackbar, navigate }));
    } else {
      return enqueueSnackbar("Invalid Input", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="Baltra forgotPassword" />
      <div className="relative lg:min-h-screen bg-white flex justify-center items-center">
        {/* Background Image */}
        <img
          className="absolute top-0 left-0 w-full h-full object-cover blur-[1px]"
          src={userAuthImg}
          alt="Background"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full z-10">
          <BaltraSubCategoryHeader />
        </div>
        {/* Form Container */}
        <div className="relative w-full mt-24 max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 sm:px-10 py-6 bg-white rounded-sm shadow-sm">
          <form
            className="flex flex-col justify-center items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Title and Description */}
            <div className="mb-8 px-2 ">
              <h1 className="text-2xl font-bold text-zinc-900 mb-1 font-gothamNarrow">
                Forgot Password
              </h1>
              <p className="text-sm text-zinc-900 font-gothamNarrow tracking-wide mb-4 my-2">
                Don't worry! Just enter your valid mobile number below, and
                we'll send you a OTP to reset your password.
              </p>
              <p className="text-sm text-zinc-900 font-gothamNarrow tracking-wide mb-4">
                If you have any issues, please contact our support team for
                assistance.
              </p>
            </div>

            {/* Combined Select and Input for Country Code and Mobile Number */}
            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full px-3 mt-2">
              <div className="relative w-full lg:w-1/4 lg:block hidden">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="countryCode"
                >
                  Country Code
                </label>
                <select
                  className="block appearance-none text-sm font-gothamNarrow w-full bg-neutral-50 text-neutral-600 border border-stone-200 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="countryCode"
                  name="countryCode"
                >
                  <option value="+977">+977 (Nepal)</option>
                </select>
              </div>

              <div className="relative w-full lg:w-3/4 lg:pl-3">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="mobile"
                >
                  Mobile Number
                </label>
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-200 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="contact"
                  name="contact"
                  type="number"
                  placeholder="Enter Your mobile Number"
                  {...register("contact", {
                    required: true,
                    pattern: /^\d{10}$/,
                  })}
                />
                {errors.contact && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Mobile number is required and must be 10 digits
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative mb-4 w-full px-3 my-2 flex">
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700
                 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center font-gothamNarrow flex items-center justify-center relative"
                disabled={loading}
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Proceed
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
