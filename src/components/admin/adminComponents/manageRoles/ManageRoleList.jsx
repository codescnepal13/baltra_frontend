import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
  FaUserShield,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allRoleListAdmin,
  clearAdminError,
  deleteMultipleUserRole,
} from "../../../../redux/features/admin/adminSlice";

// ─── Role badge config ────────────────────────────────────────────────────────
const ROLE_STYLES = {
  admin: "bg-red-50 text-red-500 border border-red-100",
  customer: "bg-blue-50 text-blue-500 border border-blue-100",
  service_incharge: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  product_incharge: "bg-amber-50 text-amber-600 border border-amber-100",
};

const ROLE_LABELS = {
  admin: "Admin",
  service_incharge: "Service Incharge",
  product_incharge: "Product Incharge",
};

const ROLE_DOT = {
  admin: "bg-red-400",
  service_incharge: "bg-emerald-400",
  product_incharge: "bg-amber-400",
};

const GENDER_STYLES = {
  Male: "bg-sky-50 text-sky-500",
  Female: "bg-pink-50 text-pink-500",
};

const ROLE_FILTERS = ["All", "admin", "service_incharge", "product_incharge"];

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ firstName = "", lastName = "", gender }) => {
  const initials =
    `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
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

// ─── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 1;
  const left = currentPage - delta;
  const right = currentPage + delta;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <FaChevronLeft size={10} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-[11px] text-gray-300">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded-lg text-[11.5px] font-medium transition-colors ${
              currentPage === p
                ? "bg-red-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <FaChevronRight size={10} />
      </button>
    </div>
  );
};

// ─── Confirm Modal ────────────────────────────────────────────────────────────
const ConfirmModal = ({ count, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-80 mx-4">
      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
        <FaTrashAlt className="text-red-400" size={14} />
      </div>
      <h3 className="text-[14px] font-semibold text-gray-800 text-center tracking-[-0.01em]">
        Delete {count > 1 ? `${count} users` : "user"}?
      </h3>
      <p className="text-[12px] text-gray-400 text-center mt-1 mb-5 tracking-[0.01em]">
        This action cannot be undone.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl text-[12.5px] font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-xl text-[12.5px] font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Columns ──────────────────────────────────────────────────────────────────
const COLUMNS = [
  "S.N.",
  "User",
  "Email",
  "Mobile",
  "Role",
  "Gender",
  "Joined",
  "Actions",
];

// ─── Main Component ───────────────────────────────────────────────────────────
const ManageRoleList = () => {
  const dispatch = useDispatch();
  const { loading, error, userRoleList } = useSelector((state) => state.admin);
  const userRolePagination =
    useSelector((state) => state.admin.userRolePagination) || {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 8,
  } = userRolePagination;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  // confirmDelete shape is always: { user_ids: string[] }
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Debounced search ─────────────────────────────────────────────────────
  // const debouncedSetSearch = useCallback(
  //   _debounce((val) => {
  //     setDebouncedSearch(val);
  //     setCurrentPage(1);
  //   }, 400),
  //   [],
  // );

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  //   debouncedSetSearch(e.target.value);
  // };

  // ── Fetch on page / search change ────────────────────────────────────────
  useEffect(() => {
    dispatch(
      allRoleListAdmin({
        page: currentPage,
        ...(debouncedSearch ? { serial_number: debouncedSearch } : {}),
      }),
    );
  }, [dispatch, currentPage, debouncedSearch]);

  // ── Error handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [error, dispatch]);

  // ── Sync local page when reducer clamps it after deletion ─────────────────
  // Reducer sets pagination.page = Math.min(current, newTotalPages).
  // This effect picks that up → updates currentPage → re-triggers fetch above.
  useEffect(() => {
    const slicePage = userRolePagination?.page ?? 1;
    if (slicePage !== currentPage) {
      setCurrentPage(slicePage);
    }
  }, [userRolePagination?.page]);

  // ── Client-side role filter (server handles search + pagination) ──────────
  const filtered = useMemo(() => {
    if (!Array.isArray(userRoleList)) return [];
    if (roleFilter === "All") return userRoleList;
    return userRoleList.filter((u) => u.role === roleFilter);
  }, [userRoleList, roleFilter]);

  // ── Selection ────────────────────────────────────────────────────────────
  const allSelected =
    filtered.length > 0 && selectedIds.length === filtered.length;
  const hasSelected = selectedIds.length > 0;

  const handleSelectAll = (e) =>
    setSelectedIds(e.target.checked ? filtered.map((u) => u.id) : []);

  const handleSelectOne = (e, id) =>
    setSelectedIds((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );

  // ── Delete handler ────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    const { user_ids } = confirmDelete;
    setConfirmDelete(null); // close modal immediately for snappy UX

    try {
      await dispatch(
        deleteMultipleUserRole({ user_ids, enqueueSnackbar }),
      ).unwrap();

      setSelectedIds([]);

      // Reducer already clamped pagination.page.
      // The useEffect above will sync currentPage and re-fetch automatically.
      // Only force an explicit re-fetch if page didn't change (still page 1).
      const nextPage = userRolePagination?.page ?? 1;
      dispatch(allRoleListAdmin({ page: nextPage }));
    } catch (err) {
      enqueueSnackbar(err?.message ?? "Delete failed", { variant: "error" });
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setRoleFilter("All");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handlePageChange = (p) => {
    setCurrentPage(p);
    setSelectedIds([]);
  };

  // ── Role counts for footer ────────────────────────────────────────────────
  const roleCounts = useMemo(() => {
    if (!Array.isArray(userRoleList)) return {};
    return userRoleList.reduce((acc, u) => {
      if (u.role) acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});
  }, [userRoleList]);

  return (
    <>
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
            {/* <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={11}
              />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search name, email, mobile..."
                className="pl-8 pr-3 py-1.5 text-[12.5px] tracking-[0.01em] text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 w-52 placeholder:text-gray-300 transition-all"
              />
            </div> */}

            {/* Role filter pills */}
            <div className="flex items-center gap-1 flex-wrap">
              {ROLE_FILTERS.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRoleFilter(r);
                    setSelectedIds([]);
                  }}
                  className={`
                    px-2.5 py-1 text-[11px] font-medium tracking-[0.03em] rounded-lg transition-colors whitespace-nowrap
                    ${
                      roleFilter === r
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }
                  `}
                >
                  {r === "All" ? "All" : ROLE_LABELS[r]}
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

            {/* Bulk delete — passes user_ids */}
            {hasSelected && (
              <button
                onClick={() => setConfirmDelete({ user_ids: selectedIds })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <FaTrashAlt size={11} />
                Delete ({selectedIds.length})
              </button>
            )}

            {/* Result count */}
            <span className="ml-auto text-[11px] text-gray-300 tracking-[0.03em]">
              {filtered.length} of {userRoleList?.length ?? 0} users
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
                      className="accent-red-500 w-3 h-3 cursor-pointer"
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
                {loading ? (
                  Array.from({ length: results_per_page }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="w-3 h-3 rounded bg-gray-100" />
                      </td>
                      {COLUMNS.map((col) => (
                        <td key={col} className="px-4 py-3">
                          <div className="h-3 rounded bg-gray-100 w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length > 0 ? (
                  filtered.map((user, index) => {
                    const userId = user.id;
                    const isChecked = selectedIds.includes(userId);
                    const roleKey = user.role ?? "";

                    return (
                      <tr
                        key={userId}
                        className={`transition-colors ${
                          isChecked ? "bg-red-50/40" : "hover:bg-gray-50/70"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleSelectOne(e, userId)}
                            className="accent-red-500 w-3 h-3 cursor-pointer"
                          />
                        </td>

                        {/* S.N. */}
                        <td className="px-4 py-2 text-gray-400 tabular-nums w-10">
                          {(currentPage - 1) * results_per_page + index + 1}
                        </td>

                        {/* User */}
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2.5">
                            <Avatar
                              firstName={user.firstname ?? ""}
                              lastName={user.lastname ?? ""}
                              gender={user.gender}
                            />
                            <span className="font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                              {user.firstname} {user.lastname}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                          {user.email}
                        </td>

                        {/* Mobile */}
                        <td className="px-4 py-2 text-gray-600 font-mono tracking-[0.03em] whitespace-nowrap">
                          {user.contact ? `+977 ${user.contact}` : "—"}
                        </td>

                        {/* Role badge */}
                        <td className="px-4 py-2">
                          <span
                            className={`
                              inline-flex items-center px-2 py-0.5 rounded-md
                              text-[11px] font-semibold tracking-[0.04em]
                              ${ROLE_STYLES[roleKey] ?? "bg-gray-100 text-gray-500 border border-gray-200"}
                            `}
                          >
                            {ROLE_LABELS[roleKey] ?? roleKey}
                          </span>
                        </td>

                        {/* Gender */}
                        <td className="px-4 py-2">
                          {user.gender ? (
                            <span
                              className={`
                                inline-flex items-center px-2 py-0.5 rounded-md
                                text-[11px] font-medium tracking-[0.03em]
                                ${GENDER_STYLES[user.gender] ?? "bg-gray-100 text-gray-500"}
                              `}
                            >
                              {user.gender}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>

                        {/* Joined */}
                        <td className="px-4 py-2 text-gray-500 whitespace-nowrap tabular-nums tracking-[0.01em]">
                          {user.date_joined
                            ? moment(user.date_joined).format("D MMM YYYY")
                            : "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1">
                            <Link
                              to={`/baltra-admin-dashboard/edit-role/${userId}`}
                              className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                              title="Edit role"
                            >
                              <FaPencilAlt size={12} />
                            </Link>
                            {/* Single delete — same user_ids shape as bulk */}
                            <button
                              onClick={() =>
                                setConfirmDelete({ user_ids: [userId] })
                              }
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
                    <td colSpan={9} className="text-center py-14">
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

          {/* Table footer — role counts */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-300 tracking-[0.03em]">
              Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-3 text-[11px] text-gray-400 tracking-[0.03em]">
              {Object.entries(roleCounts).map(([role, count]) => (
                <span key={role}>
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle ${
                      ROLE_DOT[role] ?? "bg-gray-400"
                    }`}
                  />
                  {ROLE_LABELS[role] ?? role} · {count}
                </span>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {total_pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-[11px] text-slate-400 font-medium tracking-[0.02em]">
                Page {currentPage} of {total_pages}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Confirm delete modal — reads confirmDelete.user_ids */}
      {confirmDelete && (
        <ConfirmModal
          count={confirmDelete.user_ids.length}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </>
  );
};

export default ManageRoleList;
