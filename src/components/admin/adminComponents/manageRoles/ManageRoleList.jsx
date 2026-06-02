import { useState } from "react";
import {
  FaPencilAlt,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ─── Dummy data ───────────────────────────────────────────────────────────────
const DUMMY_USERS = [
  {
    id: 1,
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@baltra.com",
    mobile: "9841234567",
    role: "Admin",
    address: "Lazimpat, Ward 2",
    gender: "Male",
    dob: "1990-04-15",
    district: "Kathmandu",
    city: "Kathmandu",
  },
  {
    id: 2,
    firstName: "Sita",
    lastName: "Thapa",
    email: "sita.thapa@baltra.com",
    mobile: "9852345678",
    role: "Manager",
    address: "Newroad, Ward 5",
    gender: "Female",
    dob: "1993-08-22",
    district: "Kathmandu",
    city: "Kathmandu",
  },
  {
    id: 3,
    firstName: "Bikash",
    lastName: "Karki",
    email: "bikash.karki@baltra.com",
    mobile: "9863456789",
    role: "Editor",
    address: "Putalisadak, Ward 3",
    gender: "Male",
    dob: "1995-01-10",
    district: "Kathmandu",
    city: "Kathmandu",
  },
  {
    id: 4,
    firstName: "Priya",
    lastName: "Rai",
    email: "priya.rai@baltra.com",
    mobile: "9874567890",
    role: "Viewer",
    address: "Indrachowk, Ward 7",
    gender: "Female",
    dob: "1997-11-05",
    district: "Bhaktapur",
    city: "Bhaktapur",
  },
  {
    id: 5,
    firstName: "Rohan",
    lastName: "Adhikari",
    email: "rohan.adhikari@baltra.com",
    mobile: "9885678901",
    role: "Manager",
    address: "Pulchowk, Ward 1",
    gender: "Male",
    dob: "1992-06-30",
    district: "Lalitpur",
    city: "Patan",
  },
  {
    id: 6,
    firstName: "Anita",
    lastName: "Gurung",
    email: "anita.gurung@baltra.com",
    mobile: "9896789012",
    role: "Editor",
    address: "Banepa, Ward 4",
    gender: "Female",
    dob: "1996-03-18",
    district: "Kavrepalanchok",
    city: "Banepa",
  },
  {
    id: 7,
    firstName: "Sunil",
    lastName: "Tamang",
    email: "sunil.tamang@baltra.com",
    mobile: "9807890123",
    role: "Admin",
    address: "Chabahil, Ward 9",
    gender: "Male",
    dob: "1988-09-25",
    district: "Kathmandu",
    city: "Kathmandu",
  },
  {
    id: 8,
    firstName: "Nisha",
    lastName: "Shrestha",
    email: "nisha.shrestha@baltra.com",
    mobile: "9818901234",
    role: "Viewer",
    address: "Balkhu, Ward 6",
    gender: "Female",
    dob: "1999-12-01",
    district: "Kathmandu",
    city: "Kirtipur",
  },
];

// ─── Role badge config ────────────────────────────────────────────────────────
const ROLE_STYLES = {
  Admin: "bg-red-50 text-red-500 border border-red-100",
  Manager: "bg-blue-50 text-blue-500 border border-blue-100",
  Editor: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Viewer: "bg-gray-100 text-gray-500 border border-gray-200",
};

const GENDER_STYLES = {
  Male: "bg-sky-50 text-sky-500",
  Female: "bg-pink-50 text-pink-500",
};

// ─── Avatar initials ──────────────────────────────────────────────────────────
const Avatar = ({ firstName, lastName, gender }) => {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const bg =
    gender === "Female"
      ? "bg-pink-100 text-pink-500"
      : "bg-blue-100 text-blue-500";
  return (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${bg}`}
    >
      {initials}
    </div>
  );
};

// ─── Column definitions ───────────────────────────────────────────────────────
const COLUMNS = [
  "S.N.",
  "User",
  "Email",
  "Mobile",
  "Role",
  "District",
  "City",
  "Gender",
  "DOB",
  "Actions",
];

// ─── Main component ───────────────────────────────────────────────────────────
const ManageRoleList = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // Filter logic
  const filtered = DUMMY_USERS.filter((u) => {
    const matchSearch =
      search === "" ||
      `${u.firstName} ${u.lastName} ${u.email} ${u.mobile}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const allSelected =
    filtered.length > 0 && selectedIds.length === filtered.length;
  const hasSelected = selectedIds.length > 0;

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? filtered.map((u) => u.id) : []);
  };

  const handleSelectOne = (e, id) => {
    setSelectedIds((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  };

  const handleReset = () => {
    setSearch("");
    setRoleFilter("All");
    setSelectedIds([]);
  };

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Manage Roles
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            View and manage user roles across the platform
          </p>
        </div>
        <Link
          to="/baltra-admin-dashboard/add-role"
          className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-medium tracking-[0.02em] px-3.5 py-2 rounded-lg transition-colors"
        >
          <FaUserShield size={12} />
          Assign Role
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={11}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, mobile..."
              className="pl-8 pr-3 py-1.5 text-[12.5px] tracking-[0.01em] text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 w-52 placeholder:text-gray-300 transition-all"
            />
          </div>

          {/* Role filter pills */}
          <div className="flex items-center gap-1">
            {["All", "Admin", "Manager", "Editor", "Viewer"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`
                  px-2.5 py-1 text-[11px] font-medium tracking-[0.03em] rounded-lg transition-colors
                  ${
                    roleFilter === r
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSyncAlt size={10} />
            Reset
          </button>

          {/* Bulk delete */}
          {hasSelected && (
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
              <FaTrashAlt size={11} />
              Delete ({selectedIds.length})
            </button>
          )}

          {/* Result count */}
          <span className="ml-auto text-[11px] text-gray-300 tracking-[0.03em]">
            {filtered.length} of {DUMMY_USERS.length} users
          </span>
        </div>

        {/* Selected banner */}
        {hasSelected && (
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
            <span className="text-[11.5px] font-medium tracking-[0.02em] text-blue-600">
              {selectedIds.length} user{selectedIds.length > 1 ? "s" : ""}{" "}
              selected
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-[12.5px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allSelected}
                    className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((user, index) => {
                  const isChecked = selectedIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        isChecked ? "bg-red-50/40" : "hover:bg-gray-50/70"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleSelectOne(e, user.id)}
                          className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-4 py-2 text-gray-400 tabular-nums w-10">
                        {index + 1}
                      </td>

                      {/* User */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            firstName={user.firstName}
                            lastName={user.lastName}
                            gender={user.gender}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                        {user.email}
                      </td>

                      {/* Mobile */}
                      <td className="px-4 py-2 text-gray-600 font-mono tracking-[0.03em] whitespace-nowrap">
                        +977 {user.mobile}
                      </td>

                      {/* Role badge */}
                      <td className="px-4 py-2">
                        <span
                          className={`
                            inline-flex items-center px-2 py-0.5 rounded-md
                            text-[11px] font-semibold tracking-[0.04em]
                            ${ROLE_STYLES[user.role] ?? "bg-gray-100 text-gray-500"}
                          `}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* District */}
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                        {user.district}
                      </td>

                      {/* City */}
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                        {user.city}
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-2">
                        <span
                          className={`
                            inline-flex items-center px-2 py-0.5 rounded-md
                            text-[11px] font-medium tracking-[0.03em]
                            ${GENDER_STYLES[user.gender] ?? "bg-gray-100 text-gray-500"}
                          `}
                        >
                          {user.gender}
                        </span>
                      </td>

                      {/* DOB */}
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tabular-nums tracking-[0.01em]">
                        {new Date(user.dob).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Edit role"
                          >
                            <FaPencilAlt size={12} />
                          </button>
                          <button
                            onClick={() => setDeletingId(user.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete user"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaSearch className="text-gray-300" size={14} />
                      </div>
                      <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                        No users found
                      </p>
                      <button
                        onClick={handleReset}
                        className="text-[11.5px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer: summary row */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-[11px] text-gray-300 tracking-[0.03em]">
            Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-gray-400 tracking-[0.03em]">
            {Object.entries(
              DUMMY_USERS.reduce((acc, u) => {
                acc[u.role] = (acc[u.role] || 0) + 1;
                return acc;
              }, {}),
            ).map(([role, count]) => (
              <span key={role}>
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle ${
                    role === "Admin"
                      ? "bg-red-400"
                      : role === "Manager"
                        ? "bg-blue-400"
                        : role === "Editor"
                          ? "bg-emerald-400"
                          : "bg-gray-400"
                  }`}
                />
                {role} · {count}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoleList;
