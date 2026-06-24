import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  clearAuthError,
} from "../../../../redux/features/auth/authSlice";

/* ── Requirement row ───────────────────────────────────────── */
const RequirementItem = ({ met, text }) => (
  <div
    className={`flex items-center gap-2.5 ${met ? "text-green-600" : "text-slate-400"}`}
  >
    <span
      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
        met ? "bg-green-100" : "bg-slate-100"
      }`}
    >
      {met ? (
        <FaCheck className="w-2 h-2 text-green-600" />
      ) : (
        <FaTimes className="w-2 h-2 text-slate-400" />
      )}
    </span>
    <span className="text-xs font-gothamNarrow">{text}</span>
  </div>
);

/* ── Password input ────────────────────────────────────────── */
const PasswordField = ({
  id,
  label,
  placeholder,
  visible,
  onToggle,
  registration,
  error,
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-gothamNarrow">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="block w-full bg-white text-slate-800 border border-slate-200 focus:outline-none rounded-xl py-3 px-4 text-sm font-gothamNarrow focus:border-red-500 focus:ring-0"
        {...registration}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
      >
        {visible ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
      </button>
    </div>
    {error && (
      <p className="text-red-500 text-xs font-gothamNarrow mt-1.5">{error}</p>
    )}
  </div>
);

/* ── Main component ────────────────────────────────────────── */
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

  const [vis, setVis] = useState({ old: false, new: false, confirm: false });
  const toggle = (key) => setVis((v) => ({ ...v, [key]: !v[key] }));

  const newPassword = watch("new_password") || "";

  const checks = {
    length: newPassword.length >= 8,
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[@$!%*?&]/.test(newPassword),
  };

  const allMet = Object.values(checks).every(Boolean);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  const getErrorMsg = useCallback(
    (field) => {
      const e = errors[field];
      if (!e) return null;
      if (e.message) return e.message;
      if (e.type === "required")
        return `${field.replace(/_/g, " ")} is required`;
      if (e.type === "pattern") return "Password does not meet requirements";
      if (e.type === "validate") return "Passwords do not match";
      return null;
    },
    [errors],
  );

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        changePassword({ editPasswordData: data, enqueueSnackbar, navigate }),
      );
    } else {
      enqueueSnackbar("Please fix the errors before submitting", {
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <span className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
          <FaLock size={14} className="text-red-500" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-gothamNarrow">
            Change Password
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          id="old_password"
          label="Current Password"
          placeholder="Enter your current password"
          visible={vis.old}
          onToggle={() => toggle("old")}
          registration={register("old_password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          error={getErrorMsg("old_password")}
        />

        <PasswordField
          id="new_password"
          label="New Password"
          placeholder="Enter your new password"
          visible={vis.new}
          onToggle={() => toggle("new")}
          registration={register("new_password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          error={getErrorMsg("new_password")}
        />

        {/* Live password requirements — only shown while typing */}
        {newPassword.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <RequirementItem met={checks.length} text="8+ characters" />
            <RequirementItem met={checks.lowercase} text="Lowercase letter" />
            <RequirementItem met={checks.uppercase} text="Uppercase letter" />
            <RequirementItem met={checks.number} text="Number (0–9)" />
            <RequirementItem
              met={checks.special}
              text="Special character (@$!%*?&)"
            />
          </div>
        )}

        <PasswordField
          id="confirm_newpassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          visible={vis.confirm}
          onToggle={() => toggle("confirm")}
          registration={register("confirm_newpassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === watch("new_password") || "Passwords do not match",
          })}
          error={getErrorMsg("confirm_newpassword")}
        />

        {/* Security tip */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <FaShieldAlt
            size={13}
            className="text-amber-500 mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-amber-700 leading-relaxed font-gothamNarrow">
            Use a unique password you don't use anywhere else. A password
            manager can help you generate and remember strong passwords.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md font-gothamNarrow"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Update Password
                <FaArrowRight size={12} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
