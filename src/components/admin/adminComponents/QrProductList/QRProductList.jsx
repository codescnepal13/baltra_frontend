import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaDownload,
  FaInfoCircle,
  FaPlusCircle,
  FaQrcode,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteBaltraQrProduct,
  deleteMultipleQrProduct,
  downloadAllQrInPDF,
  downloadSelectQrInPDF,
  getAllQrList,
} from "../../../../redux/features/admin/adminSlice";
import QRPagination from "../adminPagination/qrPagination/QRPagination";
import BaltraQrModal from "../baltraQrModal/BaltraQrModal";
import DeleteQrModal from "../deleteQrModal/DeleteQrModal";

// ─── Spinner ────────────────────────────────────────────────────────────────
const Spinner = ({ size = 14 }) => (
  <svg
    className="animate-spin text-current"
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

// ─── Skeleton row for loading state ─────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="border-b border-gray-100 last:border-0">
    {[10, 40, 110, 90, 90, 40, 72, 32].map((w, i) => (
      <td key={i} className="px-4 py-3">
        <div
          className="h-3 rounded-full bg-gray-100 animate-pulse"
          style={{ width: w }}
        />
      </td>
    ))}
  </tr>
);

// ─── Toolbar button ──────────────────────────────────────────────────────────
const ToolbarBtn = ({
  onClick,
  disabled,
  className,
  icon: Icon,
  label,
  iconSize = 11,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    <Icon size={iconSize} />
    {label}
  </button>
);

// ─── Column header ───────────────────────────────────────────────────────────
const TH = ({ children, className = "" }) => (
  <th
    className={`px-4 py-3 text-left text-[10.5px] font-bold tracking-[0.1em] uppercase text-slate-400 whitespace-nowrap ${className}`}
  >
    {children}
  </th>
);

// ─── Main component ──────────────────────────────────────────────────────────
const QRProductList = () => {
  const { loading, error, allQrList = [] } = useSelector((s) => s.admin);
  const myProductPagination =
    useSelector((s) => s.admin.myProductPagination) ?? {};
  const { page, total_pages, results_per_page } = myProductPagination;
  const dispatch = useDispatch();

  // Modal / selection state
  const [openQrModal, setOpenQrModal] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductsId, setSelectedProductsId] = useState([]);

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadFetching, setIsDownloadFetching] = useState(false);

  // Search / filter (client-side, fast)
  const [search, setSearch] = useState("");

  // ── Derived ──────────────────────────────────────────────────────────────
  const filteredList = useMemo(() => {
    if (!search.trim()) return allQrList;
    const q = search.toLowerCase();
    return allQrList.filter(
      (p) =>
        p.model_name?.toLowerCase().includes(q) ||
        p.model_number?.toLowerCase().includes(q) ||
        p.serial_number?.toLowerCase().includes(q),
    );
  }, [allQrList, search]);

  const allSelected =
    filteredList.length > 0 &&
    selectedProductsId.length === filteredList.length;
  const hasSelected = selectedProductsId.length > 0;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const triggerDownload = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // clean up memory
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await dispatch(downloadAllQrInPDF());
      if (downloadAllQrInPDF.fulfilled.match(res))
        triggerDownload(res.payload, "qr-products-list.zip");
    } catch (err) {
      console.error("ZIP download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSelectedDownload = async () => {
    if (!hasSelected) return;
    setIsDownloadFetching(true);
    try {
      const res = await dispatch(downloadSelectQrInPDF(selectedProductsId));
      if (downloadSelectQrInPDF.fulfilled.match(res)) {
        triggerDownload(res.payload, "qr-selected-products-list.zip");
        setSelectedProductsId([]);
      }
    } catch (err) {
      console.error("ZIP download error:", err);
    } finally {
      setIsDownloadFetching(false);
    }
  };

  const handleQrClick = (qrCode) => {
    setSelectedQrCode(qrCode);
    setOpenQrModal(true);
  };
  const handleQrClose = () => {
    setOpenQrModal(false);
    setSelectedQrCode(null);
  };

  // ✅ FIX: was undefined — now defined
  const handleCloseModal = () => setSelectedProductId(null);

  const handleReset = () => {
    setSelectedProductsId([]);
    setSelectedProductId(null);
    setSelectedQrCode(null);
    setOpenQrModal(false);
    setSearch("");
    dispatch(getAllQrList(1));
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(
        deleteBaltraQrProduct({
          product_id: selectedProductId,
          enqueueSnackbar,
        }),
      );
      setSelectedProductId(null);
    }
  };

  const handlePageChange = useCallback(
    (newPage) => dispatch(getAllQrList(newPage)),
    [dispatch],
  );

  const handleSelectAll = (e) =>
    setSelectedProductsId(
      e.target.checked ? filteredList.map((p) => p.product_id) : [],
    );

  const handleSelectProduct = (e, productId) =>
    setSelectedProductsId((prev) =>
      e.target.checked
        ? [...prev, productId]
        : prev.filter((id) => id !== productId),
    );

  const handleMultipleDelete = () => {
    if (!hasSelected) return;
    dispatch(
      deleteMultipleQrProduct({
        product_ids: selectedProductsId,
        enqueueSnackbar,
      }),
    ).then(() => dispatch(getAllQrList(page)));
    setSelectedProductsId([]);
  };

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);
  useEffect(() => {
    dispatch(getAllQrList(page ?? 1));
  }, [dispatch, page]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="px-5 py-5 max-w-screen-2xl mx-auto font-sans">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-slate-800">
            QR Product List
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Manage and export QR codes for your products
          </p>
        </div>
        <Link to="/baltra-admin-dashboard/add-Qr-Product">
          <button className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-[12.5px] font-semibold tracking-wide px-3.5 py-2 rounded-lg transition-all duration-150 shadow-sm shadow-rose-200">
            <FaPlusCircle size={12} />
            Add QR Product
          </button>
        </Link>
      </div>

      {/* ── Info banner ─────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-4">
        <FaInfoCircle className="text-sky-400 mt-0.5 flex-shrink-0" size={13} />
        <p className="text-[12px] text-sky-700 leading-relaxed">
          Click <strong>Export All</strong> to download all QR codes. Select
          rows first to use <strong>Export Selected</strong>.
        </p>
      </div>

      {/* ── Table card ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search model, number, serial…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-300 focus:outline-none focus:border-rose-500 transition"
            />
          </div>

          <ToolbarBtn
            onClick={handleReset}
            icon={FaSyncAlt}
            label="Reset"
            className="text-slate-500 border border-slate-200 bg-white hover:bg-slate-50"
          />

          {hasSelected && (
            <>
              <ToolbarBtn
                onClick={handleMultipleDelete}
                icon={FaTrashAlt}
                label={`Delete (${selectedProductsId.length})`}
                className="text-white bg-rose-500 hover:bg-rose-600"
              />
              <ToolbarBtn
                onClick={handleSelectedDownload}
                disabled={isDownloadFetching}
                icon={isDownloadFetching ? Spinner : FaQrcode}
                label="Export Selected"
                className="text-white bg-emerald-600 hover:bg-emerald-700"
              />
            </>
          )}

          {allQrList.length > 0 && (
            <ToolbarBtn
              onClick={handleDownload}
              disabled={isDownloading}
              icon={isDownloading ? Spinner : FaDownload}
              label="Export All"
              className="ml-auto text-white bg-emerald-600 hover:bg-emerald-700"
            />
          )}
        </div>

        {/* Selection pill */}
        {hasSelected && (
          <div className="px-4 py-2 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold text-rose-600">
              {selectedProductsId.length} item
              {selectedProductsId.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setSelectedProductsId([])}
              className="text-[11px] text-rose-400 hover:text-rose-600 underline underline-offset-2"
            >
              Clear
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-[12.5px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allSelected}
                    className="accent-rose-500 w-3 h-3 cursor-pointer rounded"
                  />
                </th>
                <TH>#</TH>
                <TH>Model Name</TH>
                <TH>Model Number</TH>
                <TH>Serial Number</TH>
                <TH>QR Code</TH>
                <TH>Created At</TH>
                <TH className="text-right pr-6">Actions</TH>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                // ── Skeleton loading (8 rows) ──────────────────────────
                Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filteredList.length > 0 ? (
                filteredList.map((product, index) => {
                  const isChecked = selectedProductsId.includes(
                    product.product_id,
                  );
                  const sn =
                    page != null && results_per_page != null
                      ? (page - 1) * results_per_page + index + 1
                      : index + 1;

                  return (
                    <tr
                      key={product.product_id}
                      className={`transition-colors duration-100 ${
                        isChecked ? "bg-rose-50/70" : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectProduct(e, product.product_id)
                          }
                          className="accent-rose-500 w-3 h-3 cursor-pointer"
                        />
                      </td>

                      {/* S.N. */}
                      <td className="px-4 py-2 text-slate-300 tabular-nums font-medium text-[11.5px]">
                        {sn}
                      </td>

                      {/* Model name */}
                      <td className="px-4 py-2 font-semibold text-slate-700 whitespace-nowrap max-w-[160px] truncate">
                        {product.model_name}
                      </td>

                      {/* Model number */}
                      <td className="px-4 py-2 font-mono text-slate-500 whitespace-nowrap">
                        {product.model_number}
                      </td>

                      {/* Serial number */}
                      <td className="px-4 py-2 font-mono text-slate-500 whitespace-nowrap">
                        {product.serial_number}
                      </td>

                      {/* QR image */}
                      <td className="px-4 py-2">
                        <div
                          className="w-10 h-10 rounded-lg border border-slate-100 overflow-hidden cursor-pointer hover:scale-125 hover:shadow-lg hover:border-slate-300 transition-all duration-150"
                          onClick={() => handleQrClick(product.qr_code)}
                        >
                          <img
                            src={product.qr_code}
                            alt={`QR for ${product.model_name}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-2 text-slate-400 whitespace-nowrap text-[12px]">
                        {moment(product.date_joined).format("D MMM YYYY")}
                      </td>

                      {/* Delete */}
                      <td className="px-4 py-2 text-right pr-6">
                        <button
                          onClick={() =>
                            setSelectedProductId(product.product_id)
                          }
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          aria-label="Delete product"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                // ── Empty state ────────────────────────────────────────
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <FaQrcode className="text-slate-200" size={28} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-400">
                          {search ? "No results found" : "No QR products yet"}
                        </p>
                        <p className="text-[11.5px] text-slate-300 mt-0.5">
                          {search
                            ? "Try a different search term"
                            : "Add your first QR product to get started"}
                        </p>
                      </div>
                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="text-[12px] text-rose-400 hover:text-rose-600 font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total_pages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[11.5px] text-slate-400 font-medium tabular-nums">
              Page <span className="text-slate-600 font-semibold">{page}</span>{" "}
              of{" "}
              <span className="text-slate-600 font-semibold">
                {total_pages}
              </span>
            </p>
            <QRPagination
              currentPage={page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      {openQrModal && selectedQrCode && (
        <BaltraQrModal onClose={handleQrClose} qrCodeSrc={selectedQrCode} />
      )}

      {selectedProductId !== null && (
        <DeleteQrModal
          onClose={handleCloseModal} // ✅ Fixed: was undefined, now correct
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default QRProductList;
