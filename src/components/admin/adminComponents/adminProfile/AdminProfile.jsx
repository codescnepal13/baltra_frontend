import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera, FaInfoCircle, FaLock } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAuthError,
  getProfileMe,
  updateProfile,
} from "../../../../redux/features/auth/authSlice";
import MetaData from "../../../layout/metaData/MetaData";
import FormSkeleton from "../adminLayout/formSkeleton/FormSkeleton";

const InputField = ({ label, disabled, locked, value, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
      {label}
      {locked && <FaLock className="text-gray-300 text-[10px]" />}
    </label>
    <div className="relative">
      <input
        className={`border rounded-lg px-3 h-11 text-sm w-full font-gothamNarrow transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
          ${
            disabled
              ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border-gray-300 hover:border-gray-400 text-gray-800"
          }`}
        disabled={disabled}
        value={value}
        {...props}
      />
    </div>
  </div>
);

const AdminProfile = () => {
  const { customer, loading, isLoading, error, isError } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Watch all fields for live preview
  const watchedFirstname = watch("firstname", "");
  const watchedLastname = watch("lastname", "");

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setImage(file);
      };
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setImage(file);
      };
    }
  }, []);

  useEffect(() => {
    if (customer) {
      Object.keys(customer).forEach((key) => setValue(key, customer[key]));
      setAvatarPreview(customer?.image_url || null);
    }
  }, [customer, setValue]);

  useEffect(() => {
    if (error) dispatch(clearAuthError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getProfileMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearAuthError());
    }
  }, [dispatch, isError]);

  const onSubmit = (editData) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== customer[key]) formData.append(key, value);
    });
    if (image) formData.append("image", image);
    dispatch(updateProfile({ formData, enqueueSnackbar }));
  };

  // Live name from watched fields
  const liveFirstName = watchedFirstname || customer?.firstname || "";
  const liveLastName = watchedLastname || customer?.lastname || "";
  const fullName = [liveFirstName, liveLastName].filter(Boolean).join(" ");
  const initials = [liveFirstName?.[0], liveLastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <>
      <MetaData title="Baltra — Admin Profile" />

      {loading ? (
        <FormSkeleton />
      ) : customer ? (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Info banner */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 max-w-7xl mx-auto">
            <FaInfoCircle
              className="text-blue-400 mt-0.5 flex-shrink-0"
              size={15}
            />
            <p className="text-xs text-blue-600 font-gothamNarrow leading-relaxed">
              Only admins with verified roles can update profile information.
              Fields marked with a lock icon cannot be changed.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Back link */}
            <Link
              to="/baltra-admin-dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 mb-6 group"
            >
              <HiOutlineArrowLeftCircle
                size={20}
                className="group-hover:-translate-x-0.5 transition-transform duration-150"
              />
              Back to Dashboard
            </Link>

            {/* Main card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Red header strip */}
              <div className="h-28 bg-gradient-to-r from-red-700 via-red-600 to-red-500 relative">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              <div className="px-6 sm:px-8 lg:px-10 pb-10">
                {/* Avatar row */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-10">
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <div
                      className={`w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center transition-all duration-150 ${isDragging ? "opacity-60 scale-95" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                    >
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt={fullName || "Profile"}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-gray-300">
                          {initials || (
                            <MdOutlineCloudUpload
                              size={32}
                              className="text-gray-300"
                            />
                          )}
                        </span>
                      )}
                    </div>
                    <label
                      htmlFor="imgFile"
                      className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-150"
                      title="Upload photo"
                    >
                      <FaCamera className="text-white text-xs" />
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

                  {/* Live name preview */}
                  <div className="pb-1 flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-800 font-gothamNarrow truncate">
                      {fullName || "Admin User"}
                    </h2>
                    <p className="text-sm text-gray-400 font-gothamNarrow truncate">
                      {customer?.email}
                    </p>
                    <span className="inline-block mt-1.5 text-xs bg-red-50 text-red-600 border border-red-100 rounded-full px-2.5 py-0.5 font-gothamNarrow">
                      Administrator
                    </span>
                  </div>
                </div>

                {/* Two-column layout: form left, info sidebar right */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form — takes 2/3 */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:col-span-2"
                  >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                      Personal Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <InputField
                        label="First Name"
                        type="text"
                        placeholder="Enter first name"
                        {...register("firstname")}
                      />
                      <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        {...register("lastname")}
                      />
                      <InputField
                        label="Email Address"
                        type="email"
                        placeholder="Email address"
                        disabled
                        locked
                        {...register("email")}
                      />
                      <InputField
                        label="Phone Number"
                        type="text"
                        placeholder="Phone number"
                        disabled
                        locked
                        {...register("contact")}
                      />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Gender
                        </label>
                        <select
                          className="border border-gray-300 rounded-lg px-3 h-11 text-sm text-gray-800 font-gothamNarrow bg-white
                            hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-150"
                          {...register("gender")}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mb-6 font-gothamNarrow">
                      💡 Drag & drop an image onto the avatar to update your
                      photo.
                    </p>

                    <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-4 flex-wrap">
                      <Link
                        to="/baltra-admin-dashboard"
                        className="text-sm text-gray-400 hover:text-gray-700 font-gothamNarrow transition-colors duration-150"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800
                          disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium font-gothamNarrow
                          px-8 py-2.5 rounded-lg transition-colors duration-150 min-w-[140px]"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Sidebar — account info */}
                  <div className="lg:col-span-1 flex flex-col gap-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                      Account Details
                    </p>

                    {/* Info tiles */}
                    {[
                      { label: "Full Name", value: fullName || "—" },
                      { label: "Email", value: customer?.email || "—" },
                      { label: "Phone", value: customer?.contact || "—" },
                      {
                        label: "Gender",
                        value: customer?.gender
                          ? customer.gender.charAt(0).toUpperCase() +
                            customer.gender.slice(1)
                          : "—",
                      },
                      { label: "Role", value: customer?.role || "Admin" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                      >
                        <p className="text-[11px] text-gray-400 font-gothamNarrow uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm text-gray-700 font-gothamNarrow font-medium truncate">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-400 text-sm font-gothamNarrow">
            No profile data found.
          </p>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
