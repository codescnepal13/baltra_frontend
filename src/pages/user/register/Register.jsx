import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAuthImg from "../../../assets/images/userAuthImg.png";
import MetaData from "../../../components/layout/metaData/MetaData";
import {
  baltraRegister,
  clearAuthError,
} from "../../../redux/features/auth/authSlice";
import BaltraSubCategoryHeader from "../../baltraSubCategoryProducts/baltraSubCategoryHeader/BaltraSubCategoryHeader";

const Register = () => {
  const { customer, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  useEffect(() => {
    if (customer) {
      setValue("contact", customer.contact);
    }
  }, [customer, setValue]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibilityTwo = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const onSubmit = (registerData) => {
    if (Object.keys(errors).length === 0) {
      dispatch(baltraRegister({ registerData, enqueueSnackbar, navigate }));
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
      <MetaData title="Baltra signUp" />
      <div className="relative w-full min-h-screen py-8 bg-white flex justify-center items-center">
        <img
          className="absolute top-0 left-0 w-full h-full blur-[1px]"
          src={userAuthImg}
          alt="Background"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full z-10">
          <BaltraSubCategoryHeader />
        </div>
        <div className="relative w-full mt-10 lg:mt-24 py-4 max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 sm:px-10 pb-6 bg-white rounded-sm shadow-sm">
          <form
            className="flex flex-col justify-center items-start w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8 px-2 w-full">
              <h1 className="text-2xl font-bold text-zinc-900 mb-1 font-gothamNarrow">
                Sign Up
              </h1>
              <p className="text-sm font-normal text-zinc-900 font-gothamNarrow tracking-wide">
                Welcome to Baltra, please enter your details to register.
              </p>
            </div>
            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full px-3">
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
            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Enter your First Name"
                  {...register("firstname", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.firstname && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    First name is required and cannot be empty
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Enter Your Last Name"
                  {...register("lastname", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.lastname && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Last name is required and cannot be empty
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="district"
                >
                  District
                </label>
                <input
                  className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="district"
                  name="district"
                  type="text"
                  placeholder="Enter your district"
                  {...register("district", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.district && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    District is required and cannot be empty
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter Your city"
                  {...register("city", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.city && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    City is required and cannot be empty
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Email is required and cannot be empty
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="customerAddress"
                >
                  Address
                </label>
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="customerAddress"
                  name="customerAddress"
                  type="text"
                  placeholder="Enter Your Address"
                  {...register("customerAddress", {
                    required: true,
                    validate: (value) => value.trim() !== "",
                  })}
                />
                {errors.customerAddress && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Address is required and cannot be empty
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap mb-4 font-gothamNarrow w-full">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="block font-gothamNarrow appearance-none text-sm w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="gender"
                  name="gender"
                  {...register("gender", { required: true })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Gender is required
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-sm font-semibold font-gothamNarrow text-neutral-600 mb-2"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  className="appearance-none font-gothamNarrow text-sm block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="dob"
                  name="dob"
                  type="text"
                  placeholder="01/02/2000"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  {...register("dob", { required: true })}
                />

                {errors.dob && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    Date of Birth is required
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
            <div className="mb-4 w-full px-3">
              <label
                className="block text-sm font-semibold text-neutral-600 mb-2 font-gothamNarrow"
                htmlFor="password1"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-4 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="password1"
                  name="password1"
                  type={passwordVisible1 ? "text" : "password"}
                  placeholder="******************"
                  {...register("password1", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibilityTwo}
                >
                  {passwordVisible1 ? (
                    <FaEyeSlash className="text-neutral-600" />
                  ) : (
                    <FaEye className="text-neutral-600" />
                  )}
                </div>
              </div>
              {errors.password1 && (
                <p className="text-red-600 text-xs font-gothamNarrow">
                  {errors.password1.type === "validate"
                    ? "Passwords do not match"
                    : "Confirm Password is required"}
                </p>
              )}
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  className="font-gothamNarrow form-checkbox mr-2 w-4 h-4 text-black bg-[#C2C2C2] border-black rounded accent-red-500"
                  id="terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label
                  htmlFor="terms-checkbox"
                  className="font-gothamNarrow text-sm text-[#4F4F4F] tracking-wider"
                >
                  <div className="text-sm text-[#4F4F4F] tracking-wider">
                    By clicking "SIGN UP", I agree to Baltra
                    <a
                      href="/baltra-term-of-use"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Use{" "}
                    </a>
                    and{" "}
                    <a
                      href="/baltra/privacy-policy"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </div>
                </label>
              </div>
            </div>
            <div className="w-full px-3 relative flex">
              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className={`w-full text-white ${
                  termsAccepted ? "bg-red-600 hover:bg-red-700" : "bg-gray-300"
                } focus:outline-none font-medium rounded-sm text-sm px-4 py-4 text-center flex items-center justify-center relative font-gothamNarrow`}
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Sign Up
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
