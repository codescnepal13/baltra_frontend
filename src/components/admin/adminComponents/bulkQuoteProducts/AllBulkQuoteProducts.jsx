// AllBulkQuoteProducts.jsx — with integrated SingleBulkQuote modal

import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  allBulkQuoteProducts,
  clearAdminError,
  deleteBulkQuoteProduct,
  singleBulkQuote,
} from "../../../../redux/features/admin/adminSlice";
import MetaData from "../../../layout/metaData/MetaData";
import BulkQuotePagination from "./bulkPagination/BulkQuotePagination";
import BulkStatusModal from "./bulkStatusModal/BulkStatusModal";
import DeleteBulkModal from "./deleteBulkModal/DeleteBulkModal";

// ── helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AVATAR = {
  Pending: { bg: "#FAEEDA", color: "#854F0B" },
  Approved: { bg: "#EAF3DE", color: "#3B6D11" },
  Rejected: { bg: "#FCEBEB", color: "#A32D2D" },
};

// ── StatusBadge ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status, onClick }) => {
  const cls = {
    Pending: "bg-[#FAEEDA] text-[#854F0B]",
    Approved: "bg-[#EAF3DE] text-[#3B6D11]",
    Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
  };
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap
        ${cls[status] || "bg-gray-100 text-gray-600"}
        ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
const BulkQuoteModal = ({ quoteId, onClose }) => {
  const dispatch = useDispatch();
  const { bulkQuoteProduct, loading } = useSelector((s) => s.admin);

  useEffect(() => {
    if (quoteId) dispatch(singleBulkQuote({ quote_id: quoteId }));
  }, [dispatch, quoteId]);

  const d = bulkQuoteProduct;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {loading ? "Loading…" : `${d?.customer_name}'s quote`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {loading || !d ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="px-6 py-5">
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              {/* Left col */}
              <div className="pr-5 space-y-4">
                <Field label="Customer name" value={d.customer_name} />
                <Field label="Contact" value={`+977-${d.contact}`} mono />
                <Field label="Model name" value={d.model_name} />
                <Field label="Model number" value={d.model_num} mono />
              </div>
              {/* Right col */}
              <div className="pl-5 space-y-4">
                <Field
                  label="Quantity"
                  value={`${Number(d.quantity).toLocaleString()} units`}
                  mono
                />
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                    Status
                  </p>
                  <StatusBadge status={d.status} />
                </div>
                <Field
                  label="Created at"
                  value={moment(d.created_at).format(
                    "ddd, D MMM YYYY • h:mm A",
                  )}
                  small
                />
              </div>
            </div>

            {/* Description — full width */}
            {d.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  Description
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {d.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// tiny helper used inside modal
const Field = ({ label, value, mono, small }) => (
  <div>
    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
      {label}
    </p>
    <p
      className={`${mono ? "font-mono text-[12px]" : "text-[13px]"} ${small ? "text-gray-400" : "text-gray-800"} leading-snug`}
    >
      {value || "—"}
    </p>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const AllBulkQuoteProducts = () => {
  const dispatch = useDispatch();
  const { loading, error, isError, bulkQuoteProducts } = useSelector(
    (s) => s.admin,
  );
  const {
    page = 1,
    total_pages = 1,
    results_per_page,
  } = useSelector((s) => s.admin.bulkPagination) || {};

  const [selectStatus, setSelectStatus] = useState("All");
  const [viewQuoteId, setViewQuoteId] = useState(null); // for detail modal
  const [selectedBulkQuoteId, setSelectedBulkQuoteId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const handleOpenStatusModal = useCallback((item) => {
    setSelectedItem(item);
    setOpenBulkModal(true);
  }, []);
  const handleCloseStatusModal = useCallback(() => {
    setOpenBulkModal(false);
    setSelectedItem(null);
  }, []);
  const handleOpenDeleteModal = useCallback(
    (id) => setSelectedBulkQuoteId(id),
    [],
  );
  const handleCloseDeleteModal = useCallback(
    () => setSelectedBulkQuoteId(null),
    [],
  );

  const handleDeleteConfirm = useCallback(() => {
    if (selectedBulkQuoteId) {
      dispatch(
        deleteBulkQuoteProduct({
          quote_id: selectedBulkQuoteId,
          enqueueSnackbar,
        }),
      );
      setSelectedBulkQuoteId(null);
    }
  }, [dispatch, selectedBulkQuoteId]);

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        allBulkQuoteProducts({
          status: selectStatus === "All" ? "" : selectStatus,
          page: newPage,
        }),
      );
    },
    [dispatch, selectStatus],
  );

  const handleReset = useCallback(() => {
    setSelectStatus("All");
    dispatch(allBulkQuoteProducts({ status: "" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      allBulkQuoteProducts({
        status: selectStatus === "All" ? "" : selectStatus,
      }),
    );
  }, [dispatch, selectStatus]);

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);
  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, isError]);

  const tableRows = useMemo(() => {
    if (!bulkQuoteProducts?.length)
      return (
        <tr>
          <td colSpan={9} className="text-center py-16 text-sm text-gray-400">
            No results found.
          </td>
        </tr>
      );

    return bulkQuoteProducts.map((item, index) => {
      const av = AVATAR[item.status] || { bg: "#E6F1FB", color: "#0C447C" };
      return (
        <tr
          key={item.quote_id}
          className="border-b border-gray-100 last:border-b-0 hover:bg-red-50/40 transition-colors cursor-pointer"
          onClick={() => setViewQuoteId(item.quote_id)}
        >
          <td className="px-4 py-3 text-xs text-gray-400">
            {(page - 1) * results_per_page + index + 1}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0"
                style={{ background: av.bg, color: av.color }}
              >
                {getInitials(item.customer_name)}
              </div>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.customer_name}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-sm text-gray-500">{item.model_name}</td>
          <td className="px-4 py-3 text-xs text-gray-500 font-mono">
            {item.model_num}
          </td>
          <td className="px-4 py-3 text-sm text-gray-500">{item.contact}</td>
          <td className="px-4 py-3 text-sm font-mono font-medium text-gray-800">
            {Number(item.quantity).toLocaleString()}
          </td>
          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <StatusBadge
              status={item.status}
              onClick={
                item.status !== "Approved"
                  ? () => handleOpenStatusModal(item)
                  : undefined
              }
            />
          </td>
          <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
            {moment(item.created_at).format("ddd, D MMM YYYY")}
          </td>
          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewQuoteId(item.quote_id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                aria-label="View"
              >
                <FaEye />
              </button>
              <button
                onClick={() => handleOpenDeleteModal(item.quote_id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                aria-label="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }, [
    bulkQuoteProducts,
    page,
    results_per_page,
    handleOpenStatusModal,
    handleOpenDeleteModal,
  ]);

  return (
    <>
      <MetaData title="Baltra Admin — Bulk Quote Products" />
      <div className="px-4 py-4 max-w-screen-2xl mx-auto">
        {/* Info */}
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C0392B"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-xs text-red-800 leading-relaxed">
            Click any row or the view button to open full quote details. Click a
            pending or rejected status badge to approve or reject it.
          </p>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Bulk quote products
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {bulkQuoteProducts?.length ?? 0} results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
              className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-red-300"
            >
              <option value="All">All status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {[
                    "#",
                    "Customer",
                    "Model name",
                    "Model no.",
                    "Contact",
                    "Qty",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-[11px] font-medium text-gray-400 tracking-wider uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16">
                      <div className="inline-block w-5 h-5 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin" />
                    </td>
                  </tr>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
          {total_pages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Page {page} of {total_pages}
              </span>
              <BulkQuotePagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Detail modal — replaces SingleBulkQuote page */}
      {viewQuoteId && (
        <BulkQuoteModal
          quoteId={viewQuoteId}
          onClose={() => setViewQuoteId(null)}
        />
      )}

      {openBulkModal && selectedItem && (
        <BulkStatusModal item={selectedItem} onClose={handleCloseStatusModal} />
      )}
      {selectedBulkQuoteId && (
        <DeleteBulkModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default React.memo(AllBulkQuoteProducts);
