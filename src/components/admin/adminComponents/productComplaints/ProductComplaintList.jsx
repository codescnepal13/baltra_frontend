import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineUserMinus,
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

const ProductComplaintList = () => {
  const dispatch = useDispatch();

  const { loading, error, productComplaints } = useSelector(
    (state) => state.customer,
  );

  const complaint_Pagination =
    useSelector((state) => state.customer.complaint_Pagination) || {};
  const { page = 1, total_pages = 1 } = complaint_Pagination;

  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Fetch helper ─────────────────────────────────────────────────────────
  const fetchPage = useCallback(
    (p = 1) => dispatch(allProductComplaints({ page: p })),
    [dispatch],
  );

  // ── Pagination ────────────────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    setSelectedProductsId([]);
    fetchPage(newPage);
  };

  // ── Selection ─────────────────────────────────────────────────────────────
  const allSelected =
    productComplaints?.length > 0 &&
    selectedProductsId.length === productComplaints.length;

  const indeterminate =
    selectedProductsId.length > 0 &&
    selectedProductsId.length < (productComplaints?.length ?? 0);

  const handleSelectAll = (e) =>
    setSelectedProductsId(
      e.target.checked ? productComplaints.map((p) => p.id) : [],
    );

  const handleSelectProduct = (e, id) =>
    setSelectedProductsId((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );

  // ── Bulk delete ───────────────────────────────────────────────────────────
  const handleMultipleDelete = () => {
    if (!selectedProductsId.length) return;
    dispatch(
      deleteMultipleProductComplaints({
        complaint_ids: selectedProductsId,
        enqueueSnackbar,
      }),
    ).then(() => fetchPage(page));
    setSelectedProductsId([]);
  };

  // ── Single delete ─────────────────────────────────────────────────────────
  const handleOpenModal = (id) => setSelectedProductId(id);
  const handleCloseModal = () => setSelectedProductId(null);

  const handleDeleteConfirm = () => {
    if (selectedProductId == null) return;
    dispatch(
      deleteProductComplaint({
        complaint_id: selectedProductId,
        enqueueSnackbar,
      }),
    ).then(() => fetchPage(page));
    setSelectedProductId(null);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSelectedProductId(null);
    setSelectedProductsId([]);
    fetchPage(1);
  };

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) dispatch(clearCustomerError());
  }, [dispatch, error]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineExclamationCircle size={20} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              Product Complaints
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {productComplaints?.length ?? 0} complaints on this page
              {total_pages > 1 && ` · page ${page} of ${total_pages}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedProductsId.length > 0 && (
            <button
              onClick={handleMultipleDelete}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              <HiOutlineUserMinus size={14} />
              Delete {selectedProductsId.length} selected
            </button>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineArrowPath size={13} />
            Reset
          </button>
        </div>
      </div>

      {/* Selection banner */}
      {selectedProductsId.length > 0 && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-semibold text-red-600">
            {selectedProductsId.length} complaint
            {selectedProductsId.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    ref={(el) => {
                      if (el) el.indeterminate = indeterminate;
                    }}
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="w-3 h-3 cursor-pointer accent-red-500"
                  />
                </th>
                {[
                  "#",
                  "Customer",
                  "Model",
                  "Serial No.",
                  "Damage",
                  "Date",
                  "Actions",
                ].map((h) => (
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
                  <td colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-7 h-7 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                      <span className="text-xs text-gray-400">
                        Loading complaints…
                      </span>
                    </div>
                  </td>
                </tr>
              ) : productComplaints?.length > 0 ? (
                productComplaints.map((item, index) => {
                  const isSelected = selectedProductsId.includes(item.id);
                  const rowNum = (page - 1) * 10 + index + 1;
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors duration-100 ${
                        isSelected ? "bg-red-50/70" : "hover:bg-gray-50/70"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-3 h-3 cursor-pointer accent-red-500"
                          checked={isSelected}
                          onChange={(e) => handleSelectProduct(e, item.id)}
                        />
                      </td>

                      {/* Row number */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium text-gray-400 tabular-nums">
                          {rowNum}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-800">
                          {item?.customer_name || "—"}
                        </span>
                      </td>

                      {/* Model */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-sm font-semibold text-gray-800 leading-tight">
                          {item?.model_name || "—"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          #{item?.model_num || "—"}
                        </p>
                      </td>

                      {/* Serial no. */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-600">
                          {item?.serial_number || "—"}
                        </span>
                      </td>

                      {/* Damage */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item?.damaged_image_url ? (
                          <div className="w-11 h-9 rounded-lg overflow-hidden border border-gray-100">
                            <img
                              src={item.damaged_image_url}
                              alt="Damage"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-50 border border-dashed border-red-200 text-[10px] font-semibold text-red-400">
                            N/A
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs text-gray-400 tabular-nums">
                          {moment(item.created_at || item.date_joined).format(
                            "D MMM YYYY",
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/baltra-admin-dashboard/single-product-complaint/${item.id}`}
                            className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all group"
                            title="View"
                          >
                            <HiOutlineEye
                              size={13}
                              className="text-sky-500 group-hover:text-white"
                            />
                          </Link>
                          <Link
                            to={`/baltra-admin-dashboard/edit-product-complaint/${item.id}`}
                            className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all group"
                            title="Edit"
                          >
                            <HiOutlinePencilSquare
                              size={13}
                              className="text-emerald-500 group-hover:text-white"
                            />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(item.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all group"
                            title="Delete"
                          >
                            <HiOutlineTrash
                              size={13}
                              className="text-red-500 group-hover:text-white"
                            />
                          </button>
                        </div>

                        {selectedProductId === item.id && (
                          <DeleteComplaintModal
                            onClose={handleCloseModal}
                            onConfirm={handleDeleteConfirm}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                        <HiOutlineExclamationCircle
                          size={22}
                          className="text-red-300"
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        No complaints found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer + Pagination */}
        {productComplaints?.length > 0 && (
          <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-gray-400">
              {productComplaints.length} record
              {productComplaints.length !== 1 ? "s" : ""} on this page
              {selectedProductsId.length > 0 && (
                <span className="ml-2 text-red-500 font-medium">
                  · {selectedProductsId.length} selected
                </span>
              )}
            </span>

            {total_pages > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium hidden sm:block">
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
    </div>
  );
};

export default ProductComplaintList;
