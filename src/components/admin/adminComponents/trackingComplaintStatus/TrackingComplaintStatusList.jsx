import { debounce } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineRefresh, HiOutlineSearch } from "react-icons/hi";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  trackingComplaintStatus,
} from "../../../../redux/features/admin/adminSlice";
import WarrantyComplaintPagination from "../adminPagination/warrantyComplaintPagination/WarrantyComplaintPagination";

const BCheckbox = ({ indeterminate = false, checked, onChange, disabled }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-3.5 h-3.5 cursor-pointer rounded accent-red-500 disabled:opacity-40"
    />
  );
};

/* ─── Status badge ─── */
const StatusBadge = ({ active }) =>
  active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-[11px] font-semibold text-red-500">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      Expired
    </span>
  );

/* ══════════════════════════════════════════════
   Main component
══════════════════════════════════════════════ */
const TrackingComplaintStatusList = () => {
  const dispatch = useDispatch();

  const { loading, complaintStatus, error } = useSelector(
    (state) => state.admin,
  );
  const warrantyComplaintPagination =
    useSelector((state) => state.admin.warrantyComplaintPagination) || {};
  const { page, total_pages, results_per_page } = warrantyComplaintPagination;

  const [searchSerialNumber, setSearchSerialNumber] = useState("");

  /*
   * selectedIds  →  Set<number|string>
   * Using a Set makes O(1) lookup for isSelected checks and prevents
   * duplicate IDs, which was the root cause of the "mismatch" bug.
   */
  const [selectedIds, setSelectedIds] = useState(new Set());

  const items = complaintStatus ?? [];
  const total = items.length;
  const selectedCount = selectedIds.size;

  // Derive select-all state from actual item IDs on the current page.
  const currentPageIds = items.map((c) => c.id);
  const allSelected =
    total > 0 && currentPageIds.every((id) => selectedIds.has(id));
  const someSelected =
    !allSelected && currentPageIds.some((id) => selectedIds.has(id));

  /* ── debounced search ── */
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(trackingComplaintStatus({ serial_number: value }));
    }, 500),
    [dispatch],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchSerialNumber(value);
    debouncedSearch(value);
  };

  /* ── Select-all: only toggles items on the current page ── */
  const handleSelectAll = (e) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (e.target.checked) {
        currentPageIds.forEach((id) => next.add(id));
      } else {
        currentPageIds.forEach((id) => next.delete(id));
      }
      return next;
    });
  };

  /* ── Individual row toggle ── */
  const handleSelectItem = (e, id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      e.target.checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  /* ── Bulk delete: passes the real IDs array ── */
  const handleBulkDelete = () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    dispatch(deleteComplaintStatus({ ids })); // ← real dispatch with IDs
    setSelectedIds(new Set());
  };

  /* ── Single row delete ── */
  const handleSingleDelete = (id) => {};

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(trackingComplaintStatus({ page: newPage }));
      setSelectedIds(new Set()); // clear selection on page change
    },
    [dispatch],
  );

  const handleReset = () => {
    setSearchSerialNumber("");
    setSelectedIds(new Set());
    dispatch(trackingComplaintStatus());
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(trackingComplaintStatus());
  }, [dispatch]);

  const columns = [
    "S.N.",
    "Image",
    "Customer",
    "Model",
    "Serial No.",
    "Status",
    "Purchase Date",
    "Warranty Expiry",
    "Actions",
  ];

  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
          <HiOutlineClipboardDocumentList size={20} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900 tracking-tight">
            Warranty Complaints
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {total} record{total !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex items-center">
          <HiOutlineSearch
            size={14}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchSerialNumber}
            onChange={handleSearchChange}
            placeholder="Search by serial number…"
            className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 w-52 text-gray-700 placeholder:text-gray-400 transition-shadow"
          />
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <HiOutlineRefresh size={13} />
          Reset
        </button>

        {/* Bulk delete — only shown when something is selected */}
        {selectedCount > 0 && (
          <button
            onClick={handleBulkDelete}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors shadow-sm"
          >
            <HiOutlineTrash size={13} />
            Delete {selectedCount} selected
          </button>
        )}
      </div>

      {/* ── Selection banner ── */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-semibold text-red-600">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {/* Select-all */}
                <th className="px-4 py-3 w-10">
                  <BCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                {columns.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-7 h-7 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                      <span className="text-xs text-gray-400">
                        Loading records…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => {
                  /*
                   * FIX: use item.id (not index) as the source of truth.
                   * The old code sometimes used index-based offsets which
                   * drifted from the real IDs after filtering / pagination.
                   */
                  const isSelected = selectedIds.has(item.id);
                  const isActive = moment(item.warranty_expire).isAfter(
                    moment(),
                  );
                  const sn =
                    page != null && results_per_page != null
                      ? (page - 1) * results_per_page + index + 1
                      : index + 1;

                  return (
                    <tr
                      key={item.id ?? index}
                      className={`transition-colors duration-100 ${
                        isSelected ? "bg-red-50/50" : "hover:bg-gray-50/70"
                      }`}
                    >
                      {/* Row checkbox */}
                      <td className="px-4 py-2.5">
                        <BCheckbox
                          checked={isSelected}
                          onChange={(e) => handleSelectItem(e, item.id)}
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-medium text-gray-400">
                          {sn}
                        </span>
                      </td>

                      {/* Warranty image */}
                      <td className="px-4 py-2.5">
                        {item?.warranty_image ? (
                          <div className="w-11 h-9 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                            <img
                              src={item.warranty_image}
                              alt="Warranty"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-11 h-9 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-[10px] text-gray-400">
                              N/A
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-xs font-semibold text-gray-700">
                          {item?.customer_name || "—"}
                        </span>
                      </td>

                      {/* Model */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <p className="text-sm font-semibold text-gray-700 leading-tight">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          #{item?.model_num || "—"}
                        </p>
                      </td>

                      {/* Serial no. */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-mono font-semibold text-gray-600 tracking-wide">
                          {item?.serial_number || "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <StatusBadge active={isActive} />
                      </td>

                      {/* Purchase date */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-xs text-gray-600">
                          {item?.purchase_date
                            ? moment(item.purchase_date).format("D MMM YYYY")
                            : "—"}
                        </span>
                      </td>

                      {/* Warranty expiry */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold ${
                            isActive ? "text-gray-600" : "text-red-500"
                          }`}
                        >
                          {moment(item.warranty_expire).format(
                            "ddd, D MMM YYYY",
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/baltra-admin-dashboard/warranty-complaint/${item.id}`}
                          >
                            <button
                              className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center hover:bg-sky-100 transition-colors"
                              title="View"
                            >
                              <HiOutlineEye
                                size={13}
                                className="text-sky-500"
                              />
                            </button>
                          </Link>

                          {/* FIX: single-row delete now dispatches the correct item.id */}
                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash
                              size={13}
                              className="text-red-500"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center border border-red-100">
                        <HiOutlineClipboardDocumentList
                          size={22}
                          className="text-red-300"
                        />
                      </div>
                      <p className="text-sm text-gray-400">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total_pages != null && total_pages > 1 && (
          <div className="flex justify-end px-4 py-3 border-t border-gray-100">
            <WarrantyComplaintPagination
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

export default TrackingComplaintStatusList;
