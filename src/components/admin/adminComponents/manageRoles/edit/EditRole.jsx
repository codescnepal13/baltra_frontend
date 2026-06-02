import { useState } from "react";
import { FaSyncAlt, FaUserShield } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ROLES = [
  {
    value: "admin",
    label: "Admin",
    desc: "Full system access",
    icon: "🔐",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-400",
    activeBg: "bg-red-50",
  },
  {
    value: "customer",
    label: "Customer",
    desc: "Basic platform access",
    icon: "👤",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-400",
    activeBg: "bg-blue-50",
  },
  {
    value: "product_incharge",
    label: "Product Incharge",
    desc: "Manage products & inventory",
    icon: "📦",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-400",
    activeBg: "bg-emerald-50",
  },
  {
    value: "service_incharge",
    label: "Service Incharge",
    desc: "Handle service operations",
    icon: "🛠️",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-400",
    activeBg: "bg-orange-50",
  },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "",
  dob: "",
  district: "",
  city: "",
  address: "",
  role: "",
};

const EditRole = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => setForm(INITIAL_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.role) return alert("Please select a role.");
    console.log("Submitted:", form);
    // TODO: API call here
  };

  const inputCls =
    "w-full pl-3 pr-3 py-3 text-[12.5px] tracking-[0.01em] text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300 transition-all";

  const labelCls =
    "block text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1";

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Edit Role
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Edit a role and permissions for a user
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-sm">
            🛡️
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

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. Aarav"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="e.g. Sharma"
                className={inputCls}
                required
              />
            </div>
          </div>

          {/* Email & Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@baltra.com"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Mobile Number</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                className={inputCls}
                required
              />
            </div>
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputCls}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={inputCls}
                required
              />
            </div>
          </div>

          {/* District & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>District</label>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g. Kathmandu"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Kathmandu"
                className={inputCls}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelCls}>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address, Ward no."
              className={inputCls}
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Role selection */}
          <div>
            <p className={labelCls}>Assign Role</p>
            <p className="text-[11.5px] text-gray-400 tracking-[0.01em] mb-3">
              Select the role this user will have on the platform
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((role) => {
                const isActive = form.role === role.value;
                return (
                  <label
                    key={role.value}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg border-[1.5px] cursor-pointer transition-all
                      ${
                        isActive
                          ? `${role.border} ${role.activeBg}`
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={isActive}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-7 h-7 rounded-lg ${role.bg} flex items-center justify-center text-sm flex-shrink-0`}
                    >
                      {role.icon}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-[12px] font-semibold ${role.color}`}
                      >
                        {role.label}
                      </span>
                      <span className="text-[10.5px] text-gray-400 mt-0.5">
                        {role.desc}
                      </span>
                    </div>
                    <div
                      className={`
                        ml-auto w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all
                        ${isActive ? `bg-red-500 border-red-500` : "border-gray-300"}
                      `}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaSyncAlt size={10} />
              Reset
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-medium tracking-[0.02em] px-4 py-1.5 rounded-lg transition-colors"
            >
              <FaUserShield size={12} />
              Assign Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
