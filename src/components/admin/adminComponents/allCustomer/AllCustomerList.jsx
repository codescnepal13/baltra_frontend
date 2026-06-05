import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineChevronDown,
  HiOutlineFunnel,
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineUserMinus,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteCustomerRole,
  deleteMultipleCustomersRole,
  getAllCustomerList,
} from "../../../../redux/features/admin/adminSlice";
import CustomerPagination from "../adminPagination/customerPagination/CustomerPagination";
import DeleteCustomerPopUp from "./deleteCustomerPopUp/DeleteCustomerPopUp";

/* ── Role badge ─────────────────────────────────────────── */
const RoleBadge = ({ role }) => {
  const map = {
    admin: "bg-red-50 text-red-600 ring-red-200",
    customer: "bg-blue-50 text-blue-600 ring-blue-200",
    staff: "bg-violet-50 text-violet-600 ring-violet-200",
  };
  const cls =
    map[role?.toLowerCase()] ?? "bg-gray-100 text-gray-500 ring-gray-200";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ring-1 capitalize ${cls}`}
    >
      {role || "—"}
    </span>
  );
};

/* ── Gender badge ───────────────────────────────────────── */
const GenderBadge = ({ gender }) => {
  if (!gender) return <span className="text-gray-300 text-sm">—</span>;
  const cls =
    gender.toLowerCase() === "male"
      ? "bg-sky-50 text-sky-600 ring-sky-200"
      : "bg-pink-50 text-pink-600 ring-pink-200";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ring-1 capitalize ${cls}`}
    >
      {gender}
    </span>
  );
};

/* ── Filter Select ──────────────────────────────────────── */
const FilterSelect = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none bg-white border-2 border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm font-semibold text-gray-600 focus:outline-none focus:border-red-400 transition-colors cursor-pointer font-gothamNarrow"
    >
      {children}
    </select>
    <HiOutlineChevronDown
      size={14}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

/* ── Main Component ─────────────────────────────────────── */
const AllCustomerList = () => {
  const dispatch = useDispatch();
  const { loading, error, allCustomers } = useSelector((state) => state.admin);
  const CustomerListPagination =
    useSelector((state) => state.admin.customerPagination) || {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 8,
  } = CustomerListPagination;

  const [selectGender, setSelectGender] = useState("All");
  const [selectTier, setSelectTier] = useState("All");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomersId, setSelectedCustomersId] = useState([]);

  const handleSelectAll = (e) => {
    setSelectedCustomersId(
      e.target.checked ? allCustomers.map((c) => c.id) : [],
    );
  };

  const handleSelectCustomer = (e, id) => {
    setSelectedCustomersId((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  };

  const handleMultipleDelete = () => {
    if (!selectedCustomersId.length) return;
    dispatch(
      deleteMultipleCustomersRole({
        customer_ids: selectedCustomersId,
        enqueueSnackbar,
      }),
    ).then(() => {
      fetchCustomers(page);
      setSelectedCustomersId([]);
    });
  };

  const handleOpenModal = (id) => setSelectedCustomerId(id);
  const handleCloseModal = () => setSelectedCustomerId(null);
  const handleDeleteConfirm = () => {
    if (!selectedCustomerId) return;
    dispatch(
      deleteCustomerRole({ customer_id: selectedCustomerId, enqueueSnackbar }),
    ).then(() => fetchCustomers(page));
    setSelectedCustomerId(null);
  };

  const fetchCustomers = useCallback(
    (currentPage = 1) => {
      dispatch(
        getAllCustomerList({
          page: currentPage,
          gender: selectGender === "All" ? "" : selectGender,
          tier: selectTier === "All" ? "" : selectTier,
          firstname: searchCustomerName || "",
        }),
      );
    },
    [dispatch, selectGender, selectTier, searchCustomerName],
  );

  const handlePageChange = (p) => fetchCustomers(p);
  const handleSearch = () => fetchCustomers(1);
  const handleReset = () => {
    setSearchCustomerName("");
    setSelectGender("All");
    setSelectTier("All");
    fetchCustomers(1);
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [fetchCustomers, page]);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [error, dispatch]);

  const allSelected =
    allCustomers?.length > 0 &&
    selectedCustomersId.length === allCustomers.length;

  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-4">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-200">
            <HiOutlineUsers size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
              Customer List
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {allCustomers?.length ?? 0} customers loaded
            </p>
          </div>
        </div>

        {/* Bulk delete */}
        {selectedCustomersId.length > 0 && (
          <button
            onClick={handleMultipleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-sm font-bold shadow-md shadow-red-200 hover:from-red-700 hover:to-rose-600 transition-all"
          >
            <HiOutlineUserMinus size={16} />
            Delete {selectedCustomersId.length} Selected
          </button>
        )}
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5 mb-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <HiOutlineFunnel size={15} className="text-gray-400 shrink-0" />

          {/* Search */}
          <div className="relative flex items-center gap-1.5">
            <div className="relative">
              <HiOutlineMagnifyingGlass
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search customer name…"
                value={searchCustomerName}
                onChange={(e) => setSearchCustomerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9 pr-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white transition-colors w-52 font-gothamNarrow"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              <HiOutlineMagnifyingGlass size={15} />
            </button>
          </div>

          {/* Gender */}
          <FilterSelect
            value={selectGender}
            onChange={(e) => setSelectGender(e.target.value)}
          >
            <option value="All">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </FilterSelect>

          {/* Tier */}
          <FilterSelect
            value={selectTier}
            onChange={(e) => setSelectTier(e.target.value)}
          >
            <option value="All">All Tiers</option>
            <option value="Gold Tier">Gold Tier</option>
            <option value="Platinum Tier">Platinum Tier</option>
            <option value="Silver Tier">Silver Tier</option>
          </FilterSelect>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineArrowPath size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* ── Selected Banner ── */}
      {selectedCustomersId.length > 0 && (
        <div className="flex items-center gap-2 mb-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-bold text-red-700">
            {selectedCustomersId.length} customer
            {selectedCustomersId.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="accent-white w-3 h-3 rounded cursor-pointer"
                  />
                </th>
                {[
                  "S.N.",
                  "Customer",
                  "Email",
                  "Contact",
                  "Gender",
                  "Role",
                  "Joined",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-widest text-gray-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                      <span className="text-xs text-gray-400 font-gothamNarrow">
                        Loading customers…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : allCustomers?.length > 0 ? (
                allCustomers.map((c, index) => {
                  const isSelected = selectedCustomersId.includes(c.id);
                  return (
                    <tr
                      key={`${c.id}-${index}`}
                      className={`transition-colors duration-150 ${
                        isSelected ? "bg-red-50/60" : "hover:bg-gray-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectCustomer(e, c.id)}
                          className="accent-red-500 w-3 h-3 cursor-pointer"
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-3 py-2 text-xs font-bold text-gray-400">
                        {(page - 1) * results_per_page + index + 1}
                      </td>

                      {/* Customer (avatar + name) */}
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2.5">
                          {c.image_url ? (
                            <img
                              src={c.image_url}
                              alt={c.firstname}
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-red-100 shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-rose-200 flex items-center justify-center shrink-0">
                              <HiOutlineUser
                                size={14}
                                className="text-red-500"
                              />
                            </div>
                          )}
                          <span className="text-sm font-semibold text-gray-800 whitespace-nowrap font-gothamNarrow">
                            {c.firstname} {c.lastname}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap font-gothamNarrow">
                        {c.email}
                      </td>

                      {/* Contact */}
                      <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap font-gothamNarrow">
                        {c.contact || "—"}
                      </td>

                      {/* Gender */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <GenderBadge gender={c.gender} />
                      </td>

                      {/* Role */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <RoleBadge role={c.role} />
                      </td>

                      {/* Joined */}
                      <td className="px-3 py-2 text-xs text-gray-400 whitespace-nowrap font-gothamNarrow">
                        {moment(c.date_joined).format("D MMM YYYY")}
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/baltra-admin-dashboard/single-customer-view/${c.id}`}
                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors group"
                            title="Edit"
                          >
                            <HiOutlinePencilSquare
                              size={14}
                              className="text-emerald-600 group-hover:text-emerald-700"
                            />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(c.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors group"
                            title="Delete"
                          >
                            <HiOutlineTrash
                              size={14}
                              className="text-red-500 group-hover:text-red-700"
                            />
                          </button>
                          {selectedCustomerId !== null && (
                            <DeleteCustomerPopUp
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                        <HiOutlineUsers size={24} className="text-red-300" />
                      </div>
                      <p className="text-sm text-gray-400 font-gothamNarrow">
                        No customers found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {total_pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400 font-medium">
              Page {page} of {total_pages}
            </p>
            <CustomerPagination
              currentPage={page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCustomerList;
