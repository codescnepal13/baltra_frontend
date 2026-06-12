import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSyncAlt, FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings, MdBuild, MdInventory2 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  assignRoleByAdmin,
  clearAdminError,
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

/* ─── PasswordField — input with show/hide toggle ────────────────────────── */
const PasswordField = ({ label, error, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
    <FieldError message={error?.message} />
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   AddRole
══════════════════════════════════════════════════════════════════════════ */
const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error } = useSelector((state) => state.admin);

  // show/hide toggles for the two password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const selectedRole = watch("role");
  const passwordValue = watch("password"); // used for confirmPassword cross-validation

  /* ── Redux error → snackbar ────────────────────────────────────────── */
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error, enqueueSnackbar]);

  /* ── Submit ────────────────────────────────────────────────────────── */
  const onSubmit = (data) => {
    // Remove confirmPassword — API doesn't need it
    const { confirmPassword, ...rest } = data;
    const formData = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== ""),
    );
    dispatch(assignRoleByAdmin({ formData, enqueueSnackbar, navigate }));
  };

  /* ── Reset ─────────────────────────────────────────────────────────── */
  const handleReset = () => {
    reset();
    setShowPassword(false);
    setShowConfirm(false);
  };

  /* ────────────────────────────────────────────────────────────────────── */

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Assign Role
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Assign a role and permissions to a user
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
              Fill in user info and select a role
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

            <Field label="Mobile Number" error={errors.contact}>
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

          <hr className="border-gray-100" />

          {/* ── Password & Confirm Password ──────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <PasswordField label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "At least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Must include uppercase, lowercase & number",
                    },
                  })}
                  placeholder="Min. 8 characters"
                  className={`${inputCls(errors.password)} pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={13} />
                  ) : (
                    <FaEye size={13} />
                  )}
                </button>
              </div>
            </PasswordField>

            <PasswordField
              label="Confirm Password"
              error={errors.confirmPassword}
            >
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) =>
                      v === passwordValue || "Passwords do not match",
                  })}
                  placeholder="Re-enter password"
                  className={`${inputCls(errors.confirmPassword)} pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                </button>
              </div>
            </PasswordField>
          </div>

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
              disabled={loading || isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSyncAlt size={10} />
              Reset
            </button>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-[12.5px] font-medium tracking-[0.02em] px-4 py-1.5 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Assigning…
                </>
              ) : (
                <>
                  <FaUserShield size={12} />
                  Assign Role
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
