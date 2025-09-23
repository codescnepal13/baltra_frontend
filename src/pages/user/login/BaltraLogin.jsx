import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userAuthImg from "../../../assets/images/userAuthImg.png";
import MetaData from "../../../components/layout/metaData/MetaData";
import {
  baltraLogin,
  clearAuthError,
} from "../../../redux/features/auth/authSlice";
import BaltraSubCategoryHeader from "../../baltraSubCategoryProducts/baltraSubCategoryHeader/BaltraSubCategoryHeader";

const BaltraLogin = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (loginData) => {
    if (Object.keys(errors).length === 0) {
      const { contact, password } = loginData;
      dispatch(
        baltraLogin({
          loginData: { contact, password },
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
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData
        title="Login | Baltra - Access Your Account"
        description="Log in to your Baltra account to manage your orders, track shipments, and access exclusive offers on kitchen and home appliances."
        keywords="Baltra Login, User Login, Account Access, Baltra Sign In, Secure Login, Baltra Account, Customer Portal, Track Orders, Baltra Dashboard"
        image="https://www.baltra.com/images/baltraAllProductsBanner.png"
        url="https://www.baltra.com/baltra-account-signin"
        twitterCard="summary_large_image"
        twitterSite="@baltra"
        ogTitle="Login | Baltra Appliances"
        ogDescription="Sign in to your Baltra account to manage your profile, orders, and personalized recommendations for the best kitchen and home appliances."
        ogImage="https://www.baltra.com/images/baltraAllProductsBanner.png"
        ogUrl="https://www.baltra.com/baltra-account-signin"
      />

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
        <div className="relative w-full mt-16 max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 sm:px-10 pb-6 bg-white rounded-sm shadow-sm">
          <form
            className="flex flex-col justify-center items-start w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8 px-2 mt-5 w-full">
              <h1 className="text-2xl font-bold text-zinc-900 mb-1 font-gothamNarrow">
                Sign In
              </h1>
              <p className="text-sm font-normal text-zinc-900 font-gothamNarrow tracking-wide">
                Welcome to Baltra, Please enter your valid credentials
              </p>
            </div>
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
                  placeholder="Enter Your Number"
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

            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******************"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-neutral-600" />
                  ) : (
                    <FaEye className="text-neutral-600" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-gothamNarrow">
                  Password is required and must be at least 8 characters
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 w-full px-3">
              <div className="flex items-center">
                <input
                  id="rememberPassword"
                  type="checkbox"
                  className="mr-2 leading-tight accent-red-500"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="rememberPassword"
                  className="text-sm font-gothamNarrow text-neutral-600 "
                >
                  Remember Password
                </label>
              </div>
              <Link
                to="/baltra-forgot-Password"
                className="text-sm font-gothamNarrow text-neutral-600 hover:text-[#DA5959]"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="w-full px-3 relative mb-4 flex">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-red-600 hover:bg-red-700
                 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center font-gothamNarrow flex items-center justify-center relative"
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                <span
                  className={`${
                    loading ? "opacity-0" : "opacity-100"
                  } flex items-center`}
                >
                  Sign In
                  <FaArrowRight className="ml-2" />
                </span>
              </button>
            </div>

            <div className="w-full px-3 text-center">
              <p className="text-sm font-gothamNarrow text-neutral-600">
                Don't have an account?{" "}
                <Link
                  to="/baltra-account-mobileVerify"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BaltraLogin;
