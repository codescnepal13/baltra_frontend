// ProductComplaintList.jsx
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allProductComplaints,
  clearCustomerError,
  deleteMultipleProductComplaints,
  deleteProductComplaint,
} from "../../../../redux/features/customer/customerSlice";
import CustomPagination from "../adminPagination/customPagination/CustomPagination";
import DeleteComplaintModal from "./deleteComplaintModal/DeleteComplaintModal";

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
      className="w-3.5 h-3 rounded cursor-pointer accent-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
    />
  );
};

/* ── Problem type badge ─────────────────────────────────────────────────── */
const ProblemBadge = ({ type }) => {
  if (!type) return <span className="text-slate-300 text-xs">—</span>;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-[10px] font-semibold text-orange-600 whitespace-nowrap">
      {type}
    </span>
  );
};

/* ── Table header ───────────────────────────────────────────────────────── */
const Th = ({ children, checkbox }) => (
  <th
    className={`px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap select-none ${
      checkbox ? "w-10" : ""
    }`}
  >
    {children}
  </th>
);

/* ── Table cell ─────────────────────────────────────────────────────────── */
const Td = ({ children, className = "" }) => (
  <td className={`px-3 py-2.5 align-middle ${className}`}>{children}</td>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════════ */
const ProductComplaintList = () => {
  const dispatch = useDispatch();

  const { loading, error, productComplaints } = useSelector(
    (state) => state.customer,
  );
  const complaint_Pagination =
    useSelector((state) => state.customer.complaint_Pagination) || {};
  const {
    page = 1,
    total_pages = 1,
    results_per_page = 10,
  } = complaint_Pagination;

  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const items = productComplaints ?? [];

  /* ── Fetch ──────────────────────────────────────────────────────────── */
  const fetchPage = useCallback(
    (p = 1) => dispatch(allProductComplaints({ page: p })),
    [dispatch],
  );

  /* ── Selection ──────────────────────────────────────────────────────── */
  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < items.length;

  const handleSelectAll = (e) =>
    setSelectedIds(e.target.checked ? items.map((p) => p.id) : []);

  const handleSelectItem = (e, id) =>
    setSelectedIds((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );

  /* ── Pagination ─────────────────────────────────────────────────────── */
  const handlePageChange = (newPage) => {
    setSelectedIds([]);
    fetchPage(newPage);
  };

  /* ── Bulk delete ────────────────────────────────────────────────────── */
  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    dispatch(
      deleteMultipleProductComplaints({
        complaint_ids: selectedIds,
        enqueueSnackbar,
      }),
    ).then(() => {
      const remaining = items.length - selectedIds.length;
      fetchPage(remaining <= 0 && page > 1 ? page - 1 : page);
    });
    setSelectedIds([]);
  };

  /* ── Single delete ──────────────────────────────────────────────────── */
  const handleDeleteConfirm = () => {
    if (deleteTargetId == null) return;
    dispatch(
      deleteProductComplaint({ complaint_id: deleteTargetId, enqueueSnackbar }),
    ).then(() => {
      const remaining = items.length - 1;
      fetchPage(remaining <= 0 && page > 1 ? page - 1 : page);
    });
    setDeleteTargetId(null);
  };

  /* ── Reset ──────────────────────────────────────────────────────────── */
  const handleReset = () => {
    setSelectedIds([]);
    setDeleteTargetId(null);
    fetchPage(1);
  };

  /* ── Effects ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6 min-h-screen bg-slate-50">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineExclamationCircle size={18} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
              Product Complaints
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {total_pages > 1 && ` · page ${page} of ${total_pages}`}
            </p>
          </div>

          {/* Bulk delete — near title */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors ml-2"
            >
              <HiOutlineTrash size={12} />
              Delete {selectedIds.length}
            </button>
          )}
        </div>

        {/* Right — Reset only */}
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all self-start sm:self-auto"
        >
          <HiOutlineArrowPath size={12} />
          Reset
        </button>
      </div>

      {/* ── Selection banner ─────────────────────────────────────────── */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span className="text-xs font-semibold text-red-600">
            {selectedIds.length} complaint{selectedIds.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <button
            onClick={() => setSelectedIds([])}
            className="ml-auto inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors font-semibold"
          >
            <HiOutlineXMark size={12} />
            Clear
          </button>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────── */}
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
                  "Customer",
                  "Model",
                  "Serial No.",
                  "Problem",
                  "Damage",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-red-500 animate-spin" />
                      <span className="text-xs text-slate-400">
                        Loading complaints…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => {
                  const isSelected = selectedIds.includes(item.id);
                  const rowNum = (page - 1) * results_per_page + index + 1;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors duration-100 ${
                        isSelected ? "bg-red-50/40" : "hover:bg-slate-50/60"
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
                          {rowNum}
                        </span>
                      </Td>

                      {/* Customer */}
                      <Td>
                        <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                          {item?.customer_name || "—"}
                        </span>
                      </Td>

                      {/* Model */}
                      <Td>
                        <p className="text-xs font-semibold text-slate-800 leading-tight whitespace-nowrap">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                          #{item?.model_num || "—"}
                        </p>
                      </Td>

                      {/* Serial no. */}
                      <Td>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold text-slate-600 whitespace-nowrap">
                          {item?.serial_number || "—"}
                        </span>
                      </Td>

                      {/* Problem type */}
                      <Td>
                        <ProblemBadge type={item?.problem_type} />
                      </Td>

                      {/* Damage image */}
                      <Td>
                        {item?.damaged_image_url ? (
                          <div className="w-10 h-9 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={item.damaged_image_url}
                              alt="Damage"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-9 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                            <span className="text-[9px] text-slate-300 font-semibold">
                              N/A
                            </span>
                          </div>
                        )}
                      </Td>

                      {/* Date */}
                      <Td>
                        <span className="text-[11px] text-slate-500 whitespace-nowrap tabular-nums">
                          {moment(item.created_at || item.date_joined).format(
                            "D MMM YYYY",
                          )}
                        </span>
                      </Td>

                      {/* Actions */}
                      <Td>
                        <div className="flex items-center gap-0.5">
                          <Link
                            to={`/baltra-admin-dashboard/single-product-complaint/${item.id}`}
                            className="w-7 h-7 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all"
                            title="View"
                          >
                            <HiOutlineEye size={13} />
                          </Link>
                          <Link
                            to={`/baltra-admin-dashboard/edit-product-complaint/${item.id}`}
                            className="w-7 h-7 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-all"
                            title="Edit"
                          >
                            <HiOutlinePencilSquare size={13} />
                          </Link>
                          <button
                            onClick={() => setDeleteTargetId(item.id)}
                            className="w-7 h-7 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-all"
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
                  <td colSpan={9} className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                        <HiOutlineExclamationCircle
                          size={18}
                          className="text-slate-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-slate-400">
                        No complaints found
                      </p>
                      <p className="text-xs text-slate-300">
                        Try resetting or check back later
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
            <span className="text-[11px] text-slate-400">
              {items.length} record{items.length !== 1 ? "s" : ""} on this page
              {selectedIds.length > 0 && (
                <span className="ml-2 text-red-500 font-medium">
                  · {selectedIds.length} selected
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

      {/* ── Delete confirmation modal ─────────────────────────────────── */}
      {deleteTargetId !== null && (
        <DeleteComplaintModal
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProductComplaintList;
