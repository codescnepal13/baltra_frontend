// TrackingComplaintStatusList.jsx
import { debounce } from "lodash";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  HiOutlineArrowPath,
  HiOutlineClipboardDocumentList,
  HiOutlineEye,
  HiOutlineMagnifyingGlass,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  deletewarrantyComplaintsMultiple,
  trackingComplaintStatus,
} from "../../../../redux/features/admin/adminSlice";
import CustomPagination from "../adminPagination/customPagination/CustomPagination";
import SingleWarrantyStatusModal from "./singleWarrantyStatusModal/SingleWarrantyStatusModal";

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
      className="w-3.5 h-3 rounded cursor-pointer accent-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
    />
  );
};

const WarrantyBadge = ({ active }) =>
  active ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[10px] font-semibold text-red-600">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      Expired
    </span>
  );

const Th = ({ children, checkbox }) => (
  <th
    className={`px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none ${
      checkbox ? "w-10" : ""
    }`}
  >
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td className={`px-3 py-2.5 align-middle ${className}`}>{children}</td>
);

const TrackingComplaintStatusList = () => {
  const dispatch = useDispatch();

  const { loading, complaintStatus, error } = useSelector((s) => s.admin);
  const allwarranty_pagination =
    useSelector((s) => s.admin.allwarranty_pagination) ?? {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 8,
  } = allwarranty_pagination;

  const [filters, setFilters] = useState({ serial_number: "", page: 1 });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [viewId, setViewId] = useState(null);

  const items = useMemo(() => complaintStatus ?? [], [complaintStatus]);
  const currentPageIds = useMemo(() => items.map((c) => c.id), [items]);

  const selectedCount = selectedIds.size;
  const allSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.has(id));
  const someSelected =
    !allSelected && currentPageIds.some((id) => selectedIds.has(id));

  const fetchData = useCallback(
    (overrides = {}) => {
      setFilters((prev) => {
        const merged = { ...prev, ...overrides };
        dispatch(
          trackingComplaintStatus({
            ...(merged.serial_number && {
              serial_number: merged.serial_number,
            }),
            page: merged.page,
          }),
        );
        return merged;
      });
    },
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      fetchData({ serial_number: value, page: 1 });
    }, 500),
    [fetchData],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, serial_number: value }));
    debouncedSearch(value);
  };

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

  const handleBulkDelete = async () => {
    const complaint_ids = Array.from(selectedIds);
    if (!complaint_ids.length) return;
    await dispatch(
      deletewarrantyComplaintsMultiple({ complaint_ids, enqueueSnackbar }),
    );
    setSelectedIds(new Set());
    // refetch current page; if page becomes empty, go back one page
    const remainingOnPage = items.length - complaint_ids.length;
    const targetPage = remainingOnPage <= 0 && page > 1 ? page - 1 : page;
    fetchData({ page: targetPage });
  };

  const handleSingleDelete = async (id) => {
    await dispatch(
      deletewarrantyComplaintsMultiple({
        complaint_ids: [id],
        enqueueSnackbar,
      }),
    );
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    // same logic: if last item on page, go back one
    const remainingOnPage = items.length - 1;
    const targetPage = remainingOnPage <= 0 && page > 1 ? page - 1 : page;
    fetchData({ page: targetPage });
  };

  const handlePageChange = useCallback(
    (newPage) => {
      fetchData({ page: newPage });
      setSelectedIds(new Set());
    },
    [fetchData],
  );

  const handleReset = () => {
    setFilters({ serial_number: "", page: 1 });
    setSelectedIds(new Set());
    dispatch(trackingComplaintStatus({ page: 1 }));
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(trackingComplaintStatus({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6 min-h-screen bg-slate-50">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        {/* Left: title + bulk delete */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineClipboardDocumentList
              size={18}
              className="text-red-500"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 tracking-tight">
              Warranty Complaints
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {total_pages > 1 && ` · page ${page} of ${total_pages}`}
            </p>
          </div>

          {selectedCount > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors ml-2"
            >
              <HiOutlineTrash size={12} />
              Delete {selectedCount}
            </button>
          )}
        </div>

        {/* Right: Search + Reset */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <HiOutlineMagnifyingGlass
              size={13}
              className="absolute left-2.5 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={filters.serial_number}
              onChange={handleSearchChange}
              placeholder="Search serial no…"
              className="pl-8 pr-7 py-1.5 text-xs border border-slate-200 rounded-lg bg-white w-44 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-red-400 transition-colors"
            />
            {filters.serial_number && (
              <button
                onClick={() => fetchData({ serial_number: "", page: 1 })}
                className="absolute right-2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <HiOutlineXMark size={12} />
              </button>
            )}
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <HiOutlineArrowPath size={12} />
            Reset
          </button>
        </div>
      </div>

      {/* ── Selection banner ─────────────────────────────────────────────── */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
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
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-red-500 animate-spin" />
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
                        isSelected ? "bg-red-50/40" : "hover:bg-slate-50/60"
                      }`}
                    >
                      <Td>
                        <BCheckbox
                          checked={isSelected}
                          onChange={(e) => handleSelectItem(e, item.id)}
                        />
                      </Td>

                      <Td>
                        <span className="text-xs text-slate-400 tabular-nums font-medium">
                          {sn}
                        </span>
                      </Td>

                      <Td>
                        {item?.warranty_image ? (
                          <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={item.warranty_image}
                              alt="Warranty"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                            <span className="text-[9px] text-slate-300 font-semibold">
                              N/A
                            </span>
                          </div>
                        )}
                      </Td>

                      <Td>
                        <span className="text-xs font-medium text-slate-800 whitespace-nowrap">
                          {item?.customer_name || "—"}
                        </span>
                      </Td>

                      <Td>
                        <p className="text-xs font-medium text-slate-800 leading-tight whitespace-nowrap">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                          #{item?.model_num || "—"}
                        </p>
                      </Td>

                      <Td>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold text-slate-600 whitespace-nowrap">
                          {item?.serial_number || "—"}
                        </span>
                      </Td>

                      <Td>
                        <WarrantyBadge active={isActive} />
                      </Td>

                      <Td>
                        <span className="text-[11px] text-slate-500 whitespace-nowrap tabular-nums">
                          {item?.purchase_date
                            ? moment(item.purchase_date).format("D MMM YYYY")
                            : "—"}
                        </span>
                      </Td>

                      <Td>
                        <span
                          className={`text-[11px] font-semibold whitespace-nowrap tabular-nums block ${
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

                      <Td>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => setViewId(item.id)}
                            className="w-7 h-7 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all"
                            title="View"
                          >
                            <HiOutlineEye size={14} />
                          </button>
                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="w-7 h-7 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-all"
                            title="Delete"
                          >
                            <FaTrashAlt size={11} />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                        <HiOutlineClipboardDocumentList
                          size={18}
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

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
            <span className="text-[11px] text-slate-400">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {selectedCount > 0 && (
                <span className="ml-2 text-red-500 font-medium">
                  · {selectedCount} selected
                </span>
              )}
            </span>
            {total_pages > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Page {page} of {total_pages}
                </span>
                <CustomPagination
                  currentPage={page}
                  totalPages={total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ Modal — outside all conditional wrappers, at root level */}
      {viewId && (
        <SingleWarrantyStatusModal
          complaintId={viewId}
          onClose={() => setViewId(null)}
        />
      )}
    </div>
  );
};

export default TrackingComplaintStatusList;
