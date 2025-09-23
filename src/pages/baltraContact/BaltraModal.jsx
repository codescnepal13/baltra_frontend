import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ContactImg from "../../assets/images/ContactImg.png";
import {
  addContact,
  clearContactError,
} from "../../redux/features/contact/contactSlice";

const BaltraModal = () => {
  const { loading, error } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (contactData) => {
    if (Object.entries(errors).length === 0) {
      dispatch(addContact({ contactData, enqueueSnackbar }));
      reset();
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearContactError());
    }
  }, [dispatch, error]);
  return (
    <div className="font-gothamNarrow px-5 lg:px-14 mt-24 py-8 bg-white shadow-md flex flex-col lg:flex-row lg:items-start lg:gap-x-20 relative max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto overflow-hidden">
      <div className="flex flex-col justify-start items-start w-full lg:w-1/2">
        <div className="flex flex-col justify-start items-start gap-2 font-gothamNarrow">
          <div className="text-gray-900 text-2xl lg:text-3xl font-semibold leading-10">
            Get in Touch with Us!
          </div>
          <div className="text-gray-700 text-base lg:text-sm leading-6 font-gothamNarrow">
            Reach Out for Support, Inquiries, or Collaborations.
          </div>
        </div>

        <form
          className="flex flex-col gap-6 my-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col font-gothamNarrow">
            <label htmlFor="name" className="text-[#4F4F4F] font-normal">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 focus:outline-none focus:border-red-600 rounded-sm text-sm"
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-xs font-gothamNarrow">
                fullName is required
              </p>
            )}
          </div>
          <div className="flex flex-col font-gothamNarrow">
            <label htmlFor="email" className="text-[#4F4F4F] font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 focus:outline-none focus:border-red-600 rounded-sm text-sm"
              placeholder="abc123@gmail.com"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs font-gothamNarrow">
                Email is required and must be valid format
              </p>
            )}
          </div>
          <div className="flex flex-col font-gothamNarrow">
            <label htmlFor="phone" className="text-[#4F4F4F] font-normal">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 focus:outline-none focus:border-red-600 rounded-sm text-sm"
              placeholder="+977 - 9861490173"
              {...register("phone", {
                required: true,
                pattern: /^\d{10}$/,
              })}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs font-gothamNarrow">
                Mobile number is required and must be 10 digits
              </p>
            )}
          </div>

          <div className="flex flex-col font-gothamNarrow">
            <label htmlFor="note" className="text-[#4F4F4F] font-normal">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              rows="4"
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 focus:outline-none focus:border-red-600 rounded-sm text-sm"
              placeholder="Your message"
              {...register("note", {
                required: true,
              })}
            ></textarea>
            {errors.note && (
              <p className="text-red-600 text-xs font-gothamNarrow">
                Enter your some message
              </p>
            )}
          </div>
          <div className="w-full py-4 bg-red-600 hover:bg-[#ED1C24] flex justify-center items-center gap-4 rounded-sm text-sm cursor-pointer">
            <button
              className="text-white font-normal font-gothamNarrow flex items-center gap-2 relative"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Send message
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>

      <div className="relative w-full lg:w-1/2 font-gothamNarrow mt-10 lg:mt-0 flex flex-col items-start">
        <div className="text-gray-900 text-2xl lg:text-3xl font-semibold leading-10 mb-4">
          Contact Info
        </div>

        <div className="flex flex-col gap-4 text-gray-800">
          <div className="flex items-center gap-4">
            <HiOutlineMail className="text-xl lg:text-2xl" />
            <a
              href="mailto:info@balajeenp.com"
              className="text-lg lg:text-xl font-normal underline"
            >
              info@balajeenp.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-lg lg:text-xl font-normal">
                Sales Queries
              </div>
              <div className="text-lg lg:text-xl font-normal">
                Service Queries
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="text-lg lg:text-xl" />
                <div className="text-lg lg:text-xl font-normal">
                  +977 980-1200501
                </div>
              </div>
              <div className="border-r h-8"></div>

              <div className="flex items-center gap-2">
                <HiOutlinePhone className="text-lg lg:text-xl" />
                <div className="text-lg lg:text-xl font-normal">
                  +977 980-1200505
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <img
            src={ContactImg}
            alt="Contact Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default BaltraModal;
