import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import userAuthImg from "../../../assets/images/userAuthImg.png";
import {
  clearAuthError,
  verifyOTP,
} from "../../../redux/features/auth/authSlice";
import BaltraSubCategoryHeader from "../../baltraSubCategoryProducts/baltraSubCategoryHeader/BaltraSubCategoryHeader";
import { FaArrowRight } from "react-icons/fa";
import MetaData from "../../../components/layout/metaData/MetaData";

const VerifyOTP = () => {
  const { loading, error, customer } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (value, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    if (value !== "" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (customer && customer.otp_created) {
      const sendDate = new Date(customer.otp_created).getTime();
      const expirationTime = 5 * 60 * 1000;
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - sendDate;

      if (elapsedTime > expirationTime) {
        setOtpExpired(true);
      } else {
        setResendTimer(Math.floor((expirationTime - elapsedTime) / 1000));
      }
    }
  }, [customer]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

  const onSubmit = (data) => {
    const otp = otpDigits.join("");
    if (otp.length < 6) {
      setError("otp", {
        type: "manual",
        message: "Please enter all OTP digits.",
      });
      return;
    }

    clearErrors("otp");
    const OTPData = {
      contact: customer.contact,
      otp: parseInt(otp),
    };

    dispatch(verifyOTP({ OTPData, toast, navigate }));
  };

  const handleResendCode = () => {
    console.log("Resend code requested");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra VerifyOTP" />
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
            className="flex flex-col justify-center items-center w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Title and Description */}
            <div className="mb-8 px-2 w-full text-center">
              <h1 className="text-2xl font-bold text-zinc-900 mb-1 font-gothamNarrow">
                OTP Verification
              </h1>
              <p className="text-sm text-zinc-900 font-gothamNarrow tracking-wide">
                A six digit code has been sent to mobile number below
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center items-center gap-2 mb-4">
              {otpDigits.map((digit, index) => (
                <Controller
                  key={index}
                  name={`otp-${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      className="p-3 bg-transparent font-gothamNarrow rounded border border-gray-300 text-[#000000] focus:outline-none focus:border-red-500 text-lg sm:text-xl lg:text-2xl text-center w-12 sm:w-12 lg:w-16 h-12 sm:h-16 lg:h-16"
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e.target.value, index);
                      }}
                    />
                  )}
                />
              ))}
            </div>

            {/* Error Message */}
            {errors?.otp && (
              <div className="text-red-600 text-sm mb-4 font-gothamNarrow">
                {errors.otp.message}
              </div>
            )}

            {/* Resend Code */}
            <div className="text-sm text-zinc-900 font-gothamNarrow mb-4">
              Didn't receive code?{" "}
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={handleResendCode}
              >
                Resend
              </button>
              :
              {resendTimer > 0 && (
                <span className="ml-1 text-black font-semibold font-gothamNarrow">
                  {Math.floor(resendTimer / 60)}:
                  {resendTimer % 60 < 10
                    ? `0${resendTimer % 60}`
                    : resendTimer % 60}
                  min
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4 w-full px-3 my-5 relative flex">
              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-sm flex items-center justify-center font-gothamNarrow"
                disabled={loading}
              >
                {loading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Submit
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
