import { debounce } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineRefresh, HiOutlineSearch } from "react-icons/hi";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  trackingComplaintStatus,
} from "../../../../redux/features/admin/adminSlice";
import WarrantyComplaintPagination from "../adminPagination/warrantyComplaintPagination/WarrantyComplaintPagination";

/* ─── Indeterminate checkbox ─────────────────────────────────────────────── */
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
      className="
        w-3 h-3 rounded cursor-pointer
        border-2 border-slate-300
        checked:bg-rose-500 checked:border-rose-500
        indeterminate:bg-rose-400 indeterminate:border-rose-400
        focus:ring-2 focus:ring-rose-300 focus:ring-offset-1
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors accent-rose-500
      "
    />
  );
};

/* ─── Status badge ───────────────────────────────────────────────────────── */
const StatusBadge = ({ active }) =>
  active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-600 tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-500 tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      Expired
    </span>
  );

/* ─── Column header ──────────────────────────────────────────────────────── */
const ColHeader = ({ children }) => (
  <th className="px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400 whitespace-nowrap select-none">
    {children}
  </th>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════════ */
const TrackingComplaintStatusList = () => {
  const dispatch = useDispatch();

  const { loading, complaintStatus, error } = useSelector((s) => s.admin);
  const warrantyComplaintPagination =
    useSelector((s) => s.admin.warrantyComplaintPagination) ?? {};
  const { page, total_pages, results_per_page } = warrantyComplaintPagination;

  const [searchSerialNumber, setSearchSerialNumber] = useState("");
  /*
   * selectedIds → Set<id>
   * Always keyed by item.id — never by array index.
   * A Set gives O(1) lookup and prevents duplicate entries.
   */
  const [selectedIds, setSelectedIds] = useState(new Set());

  const items = useMemo(() => complaintStatus ?? [], [complaintStatus]);

  /* IDs visible on the current page */
  const currentPageIds = useMemo(() => items.map((c) => c.id), [items]);

  const selectedCount = selectedIds.size;
  const allSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.has(id));
  const someSelected =
    !allSelected && currentPageIds.some((id) => selectedIds.has(id));

  /* ── Debounced search ────────────────────────────────────────────────── */
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /* ── Select-all: scoped to the current page only ─────────────────────── */
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

  /* ── Row-level toggle ────────────────────────────────────────────────── */
  const handleSelectItem = (e, id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (e.target.checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  /* ── Bulk delete ─────────────────────────────────────────────────────── */
  const handleBulkDelete = () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    dispatch(deleteComplaintStatus({ ids }));
    setSelectedIds(new Set());
  };

  /* ── Single-row delete ───────────────────────────────────────────────── */
  const handleSingleDelete = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  /* ── Pagination ──────────────────────────────────────────────────────── */
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(trackingComplaintStatus({ page: newPage }));
      setSelectedIds(new Set()); // clear cross-page selection on navigate
    },
    [dispatch],
  );

  /* ── Reset ───────────────────────────────────────────────────────────── */
  const handleReset = () => {
    setSearchSerialNumber("");
    setSelectedIds(new Set());
    dispatch(trackingComplaintStatus());
  };

  /* ── Effects ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(trackingComplaintStatus());
  }, [dispatch]);

  /* ────────────────────────────────────────────────────────────────────── */

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
    <div className="font-sans max-w-screen-2xl mx-auto px-6 py-8 bg-slate-50 min-h-screen">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 shadow-lg shadow-rose-200 flex items-center justify-center flex-shrink-0">
            <HiOutlineClipboardDocumentList size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
              Warranty Complaints
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {items.length} record{items.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {/* Search */}
        <div className="relative flex items-center">
          <HiOutlineSearch
            size={15}
            className="absolute left-3.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchSerialNumber}
            onChange={handleSearchChange}
            placeholder="Search serial number…"
            className="pl-9 pr-4 py-2.5 text-sm
    border border-slate-200 rounded-xl
    bg-white shadow-sm
    w-60 text-slate-700
             appearance-none font-gothamNarrow block leading-tight focus:outline-none focus:border-red-600 tracking-normal
            "
          />
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="
            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border
            border-slate-200 text-sm font-semibold text-slate-500 bg-white
            shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700
            transition-all active:scale-95
          "
        >
          <HiOutlineRefresh size={14} />
          Reset
        </button>

        {/* Bulk delete */}
        {selectedCount > 0 && (
          <button
            onClick={handleBulkDelete}
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-rose-500 text-white text-sm font-bold shadow-md
              shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95
            "
          >
            <HiOutlineTrash size={14} />
            Delete {selectedCount} selected
          </button>
        )}
      </div>

      {/* ── Selection banner ─────────────────────────────────────────────── */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-rose-50 border border-rose-200 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
          <span className="text-sm font-semibold text-rose-600">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-600 transition-colors font-semibold"
          >
            <HiOutlineXMark size={13} />
            Clear
          </button>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3.5 w-12">
                  <BCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                    disabled={items.length === 0}
                  />
                </th>
                {columns.map((h) => (
                  <ColHeader key={h}>{h}</ColHeader>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-rose-400 border-t-transparent animate-spin" />
                      <span className="text-sm text-slate-400 font-medium">
                        Loading records…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => {
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
                      className={`transition-colors duration-150 ${
                        isSelected ? "bg-rose-50/60" : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <BCheckbox
                          checked={isSelected}
                          onChange={(e) => handleSelectItem(e, item.id)}
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold text-slate-300 tabular-nums">
                          {String(sn).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Image */}
                      <td className="px-4 py-3">
                        {item?.warranty_image ? (
                          <div className="w-12 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                            <img
                              src={item.warranty_image}
                              alt="Warranty"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-10 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                            <span className="text-[10px] text-slate-300 font-bold">
                              N/A
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-700">
                          {item?.customer_name || "—"}
                        </span>
                      </td>

                      {/* Model */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-700 leading-tight">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                          #{item?.model_num || "—"}
                        </p>
                      </td>

                      {/* Serial no. */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-600 tracking-wide">
                          {item?.serial_number || "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge active={isActive} />
                      </td>

                      {/* Purchase date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-slate-500 font-medium">
                          {item?.purchase_date
                            ? moment(item.purchase_date).format("D MMM YYYY")
                            : "—"}
                        </span>
                      </td>

                      {/* Warranty expiry */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-sm font-bold ${
                            isActive ? "text-slate-600" : "text-rose-500"
                          }`}
                        >
                          {moment(item.warranty_expire).format("D MMM YYYY")}
                        </span>
                        {!isActive && (
                          <p className="text-[10px] text-rose-400 font-semibold mt-0.5">
                            Expired {moment(item.warranty_expire).fromNow()}
                          </p>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/baltra-admin-dashboard/warranty-complaint/${item.id}`}
                          >
                            <button
                              className="
                                w-8 h-8 rounded-xl bg-sky-50 border border-sky-100
                                flex items-center justify-center hover:bg-sky-100
                                hover:border-sky-200 hover:shadow-sm transition-all
                                active:scale-95
                              "
                              title="View"
                            >
                              <HiOutlineEye
                                size={14}
                                className="text-sky-500"
                              />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="
                              w-8 h-8 rounded-xl bg-rose-50 border border-rose-100
                              flex items-center justify-center hover:bg-rose-100
                              hover:border-rose-200 hover:shadow-sm transition-all
                              active:scale-95
                            "
                            title="Delete"
                          >
                            <HiOutlineTrash
                              size={14}
                              className="text-rose-500"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                        <HiOutlineClipboardDocumentList
                          size={26}
                          className="text-slate-300"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400">
                          No records found
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          Try a different search or reset filters
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        {total_pages != null && total_pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400 font-medium">
              Page {page} of {total_pages}
            </p>
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
