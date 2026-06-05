import { debounce } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineClipboardDocumentList,
  HiOutlineEye,
  HiOutlineMagnifyingGlass,
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

/* ── Indeterminate checkbox ─────────────────────────────────────────────── */
const BCheckbox = ({ indeterminate = false, checked, onChange, disabled }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-3.5 h-3.5 rounded cursor-pointer accent-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
    />
  );
};

/* ── Warranty status badge ──────────────────────────────────────────────── */
const WarrantyBadge = ({ active }) =>
  active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[11px] font-semibold text-red-600">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      Expired
    </span>
  );

/* ── Table header cell ──────────────────────────────────────────────────── */
const Th = ({ children, checkbox }) => (
  <th
    className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none ${
      checkbox ? "w-10" : ""
    }`}
  >
    {children}
  </th>
);

/* ── Table data cell ────────────────────────────────────────────────────── */
const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-3.5 align-middle ${className}`}>{children}</td>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════════ */
const TrackingComplaintStatusList = () => {
  const dispatch = useDispatch();

  const { loading, complaintStatus, error } = useSelector((s) => s.admin);
  const warrantyComplaintPagination =
    useSelector((s) => s.admin.warrantyComplaintPagination) ?? {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 10,
  } = warrantyComplaintPagination;

  const [searchSerialNumber, setSearchSerialNumber] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  const items = useMemo(() => complaintStatus ?? [], [complaintStatus]);
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

  /* ── Selection ───────────────────────────────────────────────────────── */
  const handleSelectAll = (e) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (e.target.checked) currentPageIds.forEach((id) => next.add(id));
      else currentPageIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  const handleSelectItem = (e, id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (e.target.checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  /* ── Delete ──────────────────────────────────────────────────────────── */
  const handleBulkDelete = () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    dispatch(deleteComplaintStatus({ ids }));
    setSelectedIds(new Set());
  };

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
      setSelectedIds(new Set());
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

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6 min-h-screen bg-slate-50">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineClipboardDocumentList
              size={20}
              className="text-red-500"
            />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              Warranty Complaints
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {total_pages > 1 && ` · page ${page} of ${total_pages}`}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative flex items-center">
            <HiOutlineMagnifyingGlass
              size={13}
              className="absolute left-3 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchSerialNumber}
              onChange={handleSearchChange}
              placeholder="Search serial no…"
              className="pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white w-48 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-red-400 transition-colors"
            />
            {searchSerialNumber && (
              <button
                onClick={() => {
                  setSearchSerialNumber("");
                  dispatch(trackingComplaintStatus());
                }}
                className="absolute right-2.5 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <HiOutlineXMark size={12} />
              </button>
            )}
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <HiOutlineArrowPath size={12} />
            Reset
          </button>

          {/* Bulk delete */}
          {selectedCount > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
            >
              <HiOutlineTrash size={12} />
              Delete {selectedCount} selected
            </button>
          )}
        </div>
      </div>

      {/* ── Selection banner ─────────────────────────────────────────────── */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span className="text-xs font-semibold text-red-600">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors font-semibold"
          >
            <HiOutlineXMark size={12} />
            Clear
          </button>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <Th checkbox>
                  <BCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                    disabled={items.length === 0}
                  />
                </Th>
                {[
                  "#",
                  "Image",
                  "Customer",
                  "Model",
                  "Serial No.",
                  "Warranty",
                  "Purchase Date",
                  "Expiry Date",
                  "Actions",
                ].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-red-500 animate-spin" />
                      <span className="text-xs text-slate-400">Loading…</span>
                    </div>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => {
                  const isSelected = selectedIds.has(item.id);
                  const isActive = moment(item.warranty_expire).isAfter(
                    moment(),
                  );
                  const sn = (page - 1) * results_per_page + index + 1;

                  return (
                    <tr
                      key={item.id ?? index}
                      className={`transition-colors duration-100 ${
                        isSelected ? "bg-red-50/40" : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <Td>
                        <BCheckbox
                          checked={isSelected}
                          onChange={(e) => handleSelectItem(e, item.id)}
                        />
                      </Td>

                      {/* Row number */}
                      <Td>
                        <span className="text-xs text-slate-400 tabular-nums font-medium">
                          {sn}
                        </span>
                      </Td>

                      {/* Image */}
                      <Td>
                        {item?.warranty_image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={item.warranty_image}
                              alt="Warranty"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                            <span className="text-[10px] text-slate-300 font-semibold">
                              N/A
                            </span>
                          </div>
                        )}
                      </Td>

                      {/* Customer */}
                      <Td>
                        <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                          {item?.customer_name || "—"}
                        </span>
                      </Td>

                      {/* Model */}
                      <Td>
                        <p className="text-sm font-medium text-slate-800 leading-tight whitespace-nowrap">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          #{item?.model_num || "—"}
                        </p>
                      </Td>

                      {/* Serial no. */}
                      <Td>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-600 whitespace-nowrap">
                          {item?.serial_number || "—"}
                        </span>
                      </Td>

                      {/* Warranty status */}
                      <Td>
                        <WarrantyBadge active={isActive} />
                      </Td>

                      {/* Purchase date */}
                      <Td>
                        <span className="text-xs text-slate-500 whitespace-nowrap tabular-nums">
                          {item?.purchase_date
                            ? moment(item.purchase_date).format("D MMM YYYY")
                            : "—"}
                        </span>
                      </Td>

                      {/* Expiry date */}
                      <Td>
                        <span
                          className={`text-xs font-semibold whitespace-nowrap tabular-nums block ${
                            isActive ? "text-slate-600" : "text-red-500"
                          }`}
                        >
                          {moment(item.warranty_expire).format("D MMM YYYY")}
                        </span>
                        {!isActive && (
                          <span className="text-[10px] text-red-400 mt-0.5 block">
                            {moment(item.warranty_expire).fromNow()}
                          </span>
                        )}
                      </Td>

                      {/* Actions */}
                      <Td>
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/baltra-admin-dashboard/warranty-complaint/${item.id}`}
                            className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 flex items-center justify-center transition-all"
                            title="View"
                          >
                            <HiOutlineEye size={13} />
                          </Link>
                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all"
                            title="Delete"
                          >
                            <HiOutlineTrash size={13} />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <HiOutlineClipboardDocumentList
                          size={20}
                          className="text-slate-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-slate-400">
                        No records found
                      </p>
                      <p className="text-xs text-slate-300">
                        Try a different search or reset filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer + Pagination ─────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {selectedCount > 0 && (
                <span className="ml-2 text-red-500 font-medium">
                  · {selectedCount} selected
                </span>
              )}
            </span>

            {total_pages > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium hidden sm:block">
                  Page {page} of {total_pages}
                </span>
                <WarrantyComplaintPagination
                  currentPage={page}
                  totalPages={total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingComplaintStatusList;
