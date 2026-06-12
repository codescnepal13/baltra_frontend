import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSyncAlt, FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings, MdBuild, MdInventory2 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminError,
  EditUserRole,
  getSingleUserRole,
} from "../../../../../redux/features/admin/adminSlice";

/* ─── Role definitions ───────────────────────────────────────────────────── */
const ROLES = [
  {
    value: "admin",
    label: "Admin",
    desc: "Full system access",
    icon: MdAdminPanelSettings,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-400",
    activeBg: "bg-red-50",
    dot: "bg-red-500 border-red-500",
  },

  {
    value: "product_incharge",
    label: "Product Incharge",
    desc: "Manage products & inventory",
    icon: MdInventory2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-400",
    activeBg: "bg-emerald-50",
    dot: "bg-emerald-500 border-emerald-500",
  },
  {
    value: "service_incharge",
    label: "Service Incharge",
    desc: "Handle service operations",
    icon: MdBuild,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-400",
    activeBg: "bg-orange-50",
    dot: "bg-orange-500 border-orange-500",
  },
];

/* ─── Reusable field components ──────────────────────────────────────────── */
const labelCls =
  "block text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1";

const inputCls = (hasError) =>
  `w-full pl-3 pr-3 py-3 text-[12.5px] tracking-[0.01em] text-gray-700 border rounded-lg outline-none transition-all placeholder:text-gray-300
  ${
    hasError
      ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/30"
      : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500/10"
  }`;

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  ) : null;

const Field = ({ label, error, children, optional }) => (
  <div>
    <label className={labelCls}>
      {label}
      {optional && (
        <span className="ml-1.5 normal-case tracking-normal font-normal text-gray-300">
          (optional)
        </span>
      )}
    </label>
    {children}
    <FieldError message={error?.message} />
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   EditRole
══════════════════════════════════════════════════════════════════════════ */
const EditRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ✅ Get id from URL params — /baltra-admin-dashboard/edit-role/:id
  const { id } = useParams();

  const { error, isError, isLoading, userRole } = useSelector(
    (state) => state.admin,
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      gender: "",
      dob: "",
      district: "",
      city: "",
      address: "",
      role: "",
    },
  });

  const selectedRole = watch("role");

  // ✅ Fetch single user on mount using id from params
  useEffect(() => {
    if (id) {
      dispatch(getSingleUserRole(id));
    }
  }, [dispatch, id]);

  // ✅ Populate form once userRole loads — all fields complete
  useEffect(() => {
    if (userRole) {
      reset({
        firstname: userRole.firstname || "",
        lastname: userRole.lastname || "",
        email: userRole.email || "",
        contact: userRole.contact || "",
        gender: userRole.gender || "",
        dob: userRole.dob
          ? new Date(userRole.dob).toISOString().split("T")[0]
          : "",
        district: userRole.district || "",
        city: userRole.city || "",
        address: userRole.address || "",
        role: userRole.role || "",
      });
    }
  }, [userRole, reset]);

  // ✅ Error handlers — split correctly, not nested
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error, enqueueSnackbar]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, isError, enqueueSnackbar]);

  // ✅ Submit — strip empty fields before sending
  const onSubmit = (data) => {
    const formData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== ""),
    );
    dispatch(EditUserRole({ id, formData, enqueueSnackbar, navigate }));
  };

  // ✅ Reset back to loaded user data (not blank defaults)
  const handleReset = () => {
    if (userRole) {
      reset({
        firstname: userRole.firstname || "",
        lastname: userRole.lastname || "",
        email: userRole.email || "",
        contact: userRole.contact || "",
        gender: userRole.gender || "",
        dob: userRole.dob
          ? new Date(userRole.dob).toISOString().split("T")[0]
          : "",
        district: userRole.district || "",
        city: userRole.city || "",
        address: userRole.address || "",
        role: userRole.role || "",
      });
    } else {
      reset();
    }
  };

  /* ────────────────────────────────────────────────────────────────────── */
  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Edit Role
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Edit a user's role and permissions
          </p>
        </div>
        <Link
          to="/baltra-admin-dashboard/all/manage-roles"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Roles
        </Link>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Card header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-sm">
            <FaUserShield />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800 tracking-[-0.01em]">
              User Details & Role
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5 tracking-[0.01em]">
              Update user info and role assignment
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 py-5 space-y-4"
          noValidate
        >
          {/* ── Name ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstname}>
              <input
                {...register("firstname", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                placeholder="e.g. Aarav"
                className={inputCls(errors.firstname)}
              />
            </Field>

            <Field label="Last Name" error={errors.lastname}>
              <input
                {...register("lastname", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                placeholder="e.g. Sharma"
                className={inputCls(errors.lastname)}
              />
            </Field>
          </div>

          {/* ── Email & Mobile ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="user@baltra.com"
                className={inputCls(errors.email)}
              />
            </Field>

            <Field label=" MobileNumber" error={errors.contact}>
              <input
                {...register("contact", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                placeholder="98XXXXXXXX"
                maxLength={10}
                className={inputCls(errors.contact)}
              />
            </Field>
          </div>

          {/* ── Gender */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Field label="Gender" error={errors.gender} optional>
                  <select {...field} className={inputCls(errors.gender)}>
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
              )}
            />

            <Field label="Date of Birth" error={errors.dob} optional>
              <input
                type="date"
                {...register("dob", {
                  validate: (v) => {
                    if (!v) return true;
                    const d = new Date(v);
                    const now = new Date();
                    if (d >= now) return "DOB must be in the past";
                    const age = now.getFullYear() - d.getFullYear();
                    if (age > 120) return "Enter a valid date of birth";
                    return true;
                  },
                })}
                max={new Date().toISOString().split("T")[0]}
                className={inputCls(errors.dob)}
              />
            </Field>
          </div>

          {/* ── District & City ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="District" error={errors.district} optional>
              <input
                {...register("district")}
                placeholder="e.g. Kathmandu"
                className={inputCls(errors.district)}
              />
            </Field>

            <Field label="City" error={errors.city} optional>
              <input
                {...register("city")}
                placeholder="e.g. Kathmandu"
                className={inputCls(errors.city)}
              />
            </Field>
          </div>

          {/* ── Address ─────────────────────────────────────────────── */}
          <Field label="Address" error={errors.address} optional>
            <input
              {...register("address")}
              placeholder="Street address, Ward no."
              className={inputCls(errors.address)}
            />
          </Field>

          <hr className="border-gray-100" />

          {/* ── Role selection ───────────────────────────────────────── */}
          <div>
            <p className={labelCls}>Assign Role</p>
            <p className="text-[11.5px] text-gray-400 tracking-[0.01em] mb-3">
              Select the role this user will have on the platform
            </p>

            <Controller
              name="role"
              control={control}
              rules={{ required: "Please select a role" }}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((role) => {
                    const isActive = field.value === role.value;
                    const Icon = role.icon;

                    return (
                      <label
                        key={role.value}
                        className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg border-[1.5px]
        cursor-pointer transition-all select-none
        ${
          isActive
            ? `${role.border} ${role.activeBg}`
            : errors.role
              ? "border-red-300 hover:border-red-400 bg-red-50/20"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }
      `}
                      >
                        <input
                          type="radio"
                          value={role.value}
                          checked={isActive}
                          onChange={() => field.onChange(role.value)}
                          className="sr-only"
                        />

                        <div
                          className={`w-7 h-7 rounded-lg ${role.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`text-sm ${role.color}`} />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span
                            className={`text-[12px] font-semibold ${role.color}`}
                          >
                            {role.label}
                          </span>

                          <span className="text-[10.5px] text-gray-400 mt-0.5 truncate">
                            {role.desc}
                          </span>
                        </div>

                        <div
                          className={`
          ml-auto w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all
          ${isActive ? role.dot : "border-gray-300 bg-white"}
        `}
                        />
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <FieldError message={errors.role?.message} />
          </div>

          {/* ── Footer actions ───────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading || isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSyncAlt size={10} />
              Reset
            </button>

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-[12.5px] font-medium tracking-[0.02em] px-4 py-1.5 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isLoading || isSubmitting ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <FaUserShield size={12} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
