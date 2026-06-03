import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineCalendarDays,
  HiOutlineCamera,
  HiOutlineCheckBadge,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminError,
  getSingleCustomer,
  updateCustomerRole,
} from "../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

/* ── Reusable read-only field ───────────────────────────── */
const ReadField = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 font-gothamNarrow flex items-center gap-1.5">
      {Icon && <Icon size={11} className="text-red-400" />}
      {label}
    </span>
    <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 font-gothamNarrow">
      {value || "—"}
    </div>
  </div>
);

/* ── Editable input field ───────────────────────────────── */
const EditField = ({ label, error, required, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 font-gothamNarrow">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </span>
    {children}
    {error && (
      <p className="text-xs text-red-500 font-gothamNarrow flex items-center gap-1 mt-0.5">
        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
        {error}
      </p>
    )}
  </div>
);

/* ── Section card wrapper ───────────────────────────────── */
const SectionCard = ({ title, icon: Icon, accentColor, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div
      className={`flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 ${accentColor}`}
    >
      {Icon && <Icon size={15} className="text-red-500" />}
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-600 font-gothamNarrow">
        {title}
      </h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

/* ── Main component ─────────────────────────────────────── */
const SingleCustomerRole = () => {
  const { singleCustomer, loading, isLoading, error } = useSelector(
    (state) => state.admin,
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setImage(file);
    };
  }, []);

  useEffect(() => {
    if (singleCustomer) {
      Object.keys(singleCustomer).forEach((key) =>
        setValue(key, singleCustomer[key]),
      );
      setAvatarPreview(singleCustomer?.image_url);
    }
  }, [singleCustomer, setValue]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(getSingleCustomer(id));
  }, [dispatch, id]);

  const onSubmit = (editData) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== singleCustomer[key]) formData.append(key, value);
    });
    if (image) formData.append("image", image);
    dispatch(updateCustomerRole({ id, formData, enqueueSnackbar, navigate }));
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const capitalize = (s) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "N/A";

  const inputCls =
    "w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white transition-colors font-gothamNarrow";

  if (loading) return <FormSkeleton />;

  return (
    <>
      <MetaData title="Baltra — Single Customer View" />

      <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-4">
        {/* ── Back ── */}
        <Link
          to="/baltra-admin-dashboard/all-customer-List"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors mb-5 group"
        >
          <HiOutlineArrowLeftCircle
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Customer List
        </Link>

        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 p-6 mb-6 shadow-lg shadow-red-200">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 right-28 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute top-4 right-56 w-10 h-10 rounded-full bg-white/10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl border-4 border-white/30 overflow-hidden bg-white/20 shadow-lg">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <HiOutlineUser size={32} className="text-white/70" />
                  </div>
                )}
              </div>
              {/* Verified dot */}
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow ${singleCustomer?.is_verified ? "bg-emerald-500" : "bg-gray-400"}`}
              >
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-red-200 text-[10px] font-extrabold uppercase tracking-widest mb-1">
                Customer Profile
              </p>
              <h1 className="text-2xl font-extrabold text-white tracking-tight truncate">
                {singleCustomer?.firstname} {singleCustomer?.lastname}
              </h1>
              <p className="text-red-200 text-xs mt-1 flex items-center gap-1.5">
                <HiOutlineIdentification size={12} />
                Customer ID: #{id}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {/* Role badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ring-1 ${
                    singleCustomer?.role === "admin"
                      ? "bg-violet-100 text-violet-700 ring-violet-200"
                      : "bg-white/20 text-white ring-white/30"
                  }`}
                >
                  <HiOutlineShieldCheck size={11} />
                  {capitalize(singleCustomer?.role)}
                </span>
                {/* Verified badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ring-1 ${
                    singleCustomer?.is_verified
                      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                      : "bg-red-100 text-red-700 ring-red-200"
                  }`}
                >
                  <HiOutlineCheckBadge size={11} />
                  {singleCustomer?.is_verified ? "Verified" : "Unverified"}
                </span>
                {singleCustomer?.membership && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                    ★ Premium Member
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* ── Left: Read-only info ── */}
            <div className="space-y-5">
              {/* Personal Information */}
              <SectionCard
                title="Personal Information"
                icon={HiOutlineUser}
                accentColor="bg-red-50/60"
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <ReadField
                    label="First Name"
                    value={singleCustomer?.firstname}
                  />
                  <ReadField
                    label="Last Name"
                    value={singleCustomer?.lastname}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <ReadField
                    label="Date of Birth"
                    value={formatDate(singleCustomer?.dob)}
                    icon={HiOutlineCalendarDays}
                  />
                  <ReadField
                    label="Gender"
                    value={capitalize(singleCustomer?.gender)}
                  />
                </div>
                <ReadField
                  label="Member Since"
                  value={formatDate(singleCustomer?.date_joined)}
                  icon={HiOutlineCalendarDays}
                />
              </SectionCard>

              {/* Address */}
              <SectionCard
                title="Address Information"
                icon={HiOutlineMapPin}
                accentColor="bg-rose-50/60"
              >
                <div className="space-y-3">
                  <ReadField
                    label="Full Address"
                    value={singleCustomer?.customerAddress}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <ReadField
                      label="District"
                      value={singleCustomer?.district}
                    />
                    <ReadField label="City" value={singleCustomer?.city} />
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* ── Right: Editable fields ── */}
            <div className="space-y-5">
              {/* Profile Image Upload */}
              <SectionCard
                title="Profile Image"
                icon={HiOutlineCamera}
                accentColor="bg-pink-50/60"
              >
                <div className="flex flex-col items-center gap-3">
                  <label
                    htmlFor="imgFile"
                    className="relative w-36 h-36 rounded-2xl border-2 border-dashed border-red-200 overflow-hidden bg-red-50/40 hover:bg-red-50 hover:border-red-400 transition-all cursor-pointer group"
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                        <HiOutlineCamera
                          size={24}
                          className="text-red-300 group-hover:text-red-500 transition-colors"
                        />
                        <span className="text-xs text-red-400 font-semibold font-gothamNarrow">
                          Upload Image
                        </span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    {avatarPreview && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <HiOutlineCamera size={22} className="text-white" />
                      </div>
                    )}
                    <input
                      id="imgFile"
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </label>
                  <p className="text-[11px] text-gray-400 font-gothamNarrow">
                    Click to change profile photo
                  </p>
                </div>
              </SectionCard>

              {/* Contact & Role */}
              <SectionCard
                title="Contact & Role Management"
                icon={HiOutlineEnvelope}
                accentColor="bg-red-50/60"
              >
                <div className="space-y-4">
                  <EditField
                    label="Email Address"
                    required
                    error={errors.email?.message}
                  >
                    <div className="relative">
                      <HiOutlineEnvelope
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Enter email address"
                        className={`${inputCls} pl-9`}
                      />
                    </div>
                  </EditField>

                  <EditField
                    label="Phone Number"
                    required
                    error={errors.contact?.message}
                  >
                    <div className="relative">
                      <HiOutlinePhone
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        type="tel"
                        {...register("contact", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit number",
                          },
                        })}
                        placeholder="Enter phone number"
                        className={`${inputCls} pl-9`}
                      />
                    </div>
                  </EditField>

                  <EditField label="Role" required error={errors.role?.message}>
                    <div className="relative">
                      <HiOutlineShieldCheck
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <select
                        {...register("role", { required: "Role is required" })}
                        className={`${inputCls} pl-9 appearance-none`}
                      >
                        <option value="customer">Customer</option>
                      </select>
                    </div>
                  </EditField>
                </div>
              </SectionCard>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1">
                <Link
                  to="/baltra-admin-dashboard/all-customer-List"
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors text-center font-gothamNarrow"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-sm font-bold text-white shadow-md shadow-red-200 hover:from-red-700 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all font-gothamNarrow"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleCustomerRole;
