import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
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

const QRProductList = () => {
  // ✅ FIX: safe fallback [] prevents `.length` crash on undefined
  const {
    loading,
    error,
    allQrList = [],
  } = useSelector((state) => state.admin);
  const myProductPagination =
    useSelector((state) => state.admin.myProductPagination) ?? {};
  const { page, total_pages, results_per_page } = myProductPagination;
  const dispatch = useDispatch();

  const [openQrModal, setOpenQrModal] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadFetching, setIsDownloadFetching] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const actionResult = await dispatch(downloadAllQrInPDF());
      if (downloadAllQrInPDF.fulfilled.match(actionResult)) {
        const url = window.URL.createObjectURL(
          new Blob([actionResult.payload]),
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-products-list.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error("Error during ZIP download:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSelectedDownload = async () => {
    if (selectedProductsId.length === 0) return;
    setIsDownloadFetching(true);
    try {
      const actionResult = await dispatch(
        downloadSelectQrInPDF(selectedProductsId),
      );
      if (downloadSelectQrInPDF.fulfilled.match(actionResult)) {
        const url = window.URL.createObjectURL(
          new Blob([actionResult.payload]),
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-selected-products-list.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setSelectedProductsId([]);
      }
    } catch (err) {
      console.error("Error during ZIP download:", err);
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

  const handleReset = () => {
    setSelectedProductsId([]);
    setSelectedProductId(null);
    setSelectedQrCode(null);
    setOpenQrModal(false);
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

  const handleSelectAll = (e) => {
    setSelectedProductsId(
      e.target.checked ? allQrList.map((p) => p.product_id) : [],
    );
  };

  const handleSelectProduct = (e, productId) => {
    setSelectedProductsId((prev) =>
      e.target.checked
        ? [...prev, productId]
        : prev.filter((id) => id !== productId),
    );
  };

  const handleMultipleDelete = () => {
    if (selectedProductsId.length === 0) return;
    dispatch(
      deleteMultipleQrProduct({
        product_ids: selectedProductsId,
        enqueueSnackbar,
      }),
    ).then(() => dispatch(getAllQrList(page)));
    setSelectedProductsId([]);
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllQrList(page ?? 1));
  }, [dispatch, page]);

  const allSelected =
    allQrList.length > 0 && selectedProductsId.length === allQrList.length;
  const hasSelected = selectedProductsId.length > 0;

  const SpinnerIcon = () => (
    <svg
      className="animate-spin h-4 w-4 text-white"
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

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            QR Product List
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Manage and export QR codes for your products
          </p>
        </div>
        <Link to="/baltra-admin-dashboard/add-Qr-Product">
          <button className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-medium tracking-[0.02em] px-3.5 py-2 rounded-lg transition-colors">
            <FaPlusCircle size={13} />
            Add QR Product
          </button>
        </Link>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-5">
        <FaInfoCircle
          className="text-blue-400 mt-0.5 flex-shrink-0"
          size={14}
        />
        <p className="text-[12px] text-blue-700 tracking-[0.01em] leading-[1.6]">
          To download all QR codes, click <strong>Export</strong>. To download
          selected ones, check the rows first, then click{" "}
          <strong>Export Selected</strong>.
        </p>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSyncAlt size={11} />
            Reset
          </button>

          {hasSelected && (
            <>
              <button
                onClick={handleMultipleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <FaTrashAlt size={11} />
                Delete ({selectedProductsId.length})
              </button>

              <button
                onClick={handleSelectedDownload}
                disabled={isDownloadFetching}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 rounded-lg transition-colors"
              >
                {isDownloadFetching ? <SpinnerIcon /> : <FaQrcode size={11} />}
                Export Selected
              </button>
            </>
          )}

          {allQrList.length > 0 && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 rounded-lg transition-colors"
            >
              {isDownloading ? <SpinnerIcon /> : <FaDownload size={11} />}
              Export All
            </button>
          )}
        </div>

        {/* Selected count pill */}
        {hasSelected && (
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
            <span className="text-[11.5px] font-medium tracking-[0.02em] text-blue-600">
              {selectedProductsId.length} item
              {selectedProductsId.length > 1 ? "s" : ""} selected
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
                {[
                  "S.N.",
                  "Model Name",
                  "Model Number",
                  "Serial Number",
                  "QR Image",
                  "Created At",
                  "Actions",
                ].map((col) => (
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
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <div className="inline-flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-red-500" />
                      <span className="text-[11.5px] text-gray-400 tracking-[0.03em]">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : allQrList.length > 0 ? (
                allQrList.map((product, index) => {
                  const isChecked = selectedProductsId.includes(
                    product.product_id,
                  );
                  return (
                    <tr
                      key={product.product_id}
                      className={`transition-colors ${isChecked ? "bg-red-50/60" : "hover:bg-gray-50/70"}`}
                    >
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectProduct(e, product.product_id)
                          }
                          className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-400 tabular-nums">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : index + 1}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                        {product?.model_name}
                      </td>
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap font-mono tracking-[0.03em]">
                        {product?.model_number}
                      </td>
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap font-mono tracking-[0.03em]">
                        {product?.serial_number}
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={product?.qr_code}
                          alt={`QR code for ${product?.model_name}`}
                          className="h-10 w-10 rounded-md cursor-pointer border border-gray-100 hover:scale-110 transition-transform"
                          onClick={() => handleQrClick(product.qr_code)}
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap tracking-[0.01em]">
                        {moment(product.date_joined).format("D MMM YYYY")}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            setSelectedProductId(product.product_id)
                          }
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete product"
                        >
                          <FaTrash size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <FaQrcode className="text-gray-200" size={32} />
                      <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                        No QR products found
                      </p>
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
            <QRPagination
              currentPage={page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {openQrModal && selectedQrCode && (
        <BaltraQrModal onClose={handleQrClose} qrCodeSrc={selectedQrCode} />
      )}
      {selectedProductId !== null && (
        <DeleteQrModal
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default QRProductList;
