import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaInfoCircle,
  FaSyncAlt,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCustomerError,
  deleteCustomerProduct,
  deleteMultipleCustomer,
  getAllCustomerAddedProductList,
} from "../../../../redux/features/customer/customerSlice";
import CustomPagination from "../adminPagination/customPagination/CustomPagination";
import DeleteCustomerModal from "./deleteCustomerModal/DeleteCustomerModal";
import UpdateModal from "./updateModal/UpdateModal";

const CustomerProductList = () => {
  const dispatch = useDispatch();

  const { loading, error, isError, allCustomerProductsList } = useSelector(
    (state) => state.customer,
  );

  const customerProduct_Pagination =
    useSelector((state) => state.customer.customerProduct_Pagination) || {};
  const { page = 1, total_pages = 1 } = customerProduct_Pagination;

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomersId, setSelectedCustomersId] = useState([]);

  // ── Fetch helpers ────────────────────────────────────────────────────────
  const fetchPage = useCallback(
    (p = 1) => dispatch(getAllCustomerAddedProductList(p)),
    [dispatch],
  );

  // ── Pagination ───────────────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    setSelectedCustomersId([]);
    fetchPage(newPage);
  };

  // ── Selection ────────────────────────────────────────────────────────────
  const allSelected =
    allCustomerProductsList?.length > 0 &&
    selectedCustomersId.length === allCustomerProductsList.length;

  const handleSelectAll = (e) =>
    setSelectedCustomersId(
      e.target.checked ? allCustomerProductsList.map((c) => c.id) : [],
    );

  const handleSelectCustomer = (e, id) =>
    setSelectedCustomersId((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id),
    );

  // ── Bulk delete ──────────────────────────────────────────────────────────
  const handleMultipleDelete = () => {
    if (!selectedCustomersId.length) return;
    dispatch(
      deleteMultipleCustomer({
        stock_ids: selectedCustomersId,
        enqueueSnackbar,
      }),
    ).then(() => fetchPage(page));
    setSelectedCustomersId([]);
  };

  // ── Single delete ────────────────────────────────────────────────────────
  const handleOpenModal = (id) => setSelectedCustomerId(id);
  const handleCloseModal = () => setSelectedCustomerId(null);

  const handleDeleteConfirm = () => {
    if (selectedCustomerId === null) return;
    dispatch(
      deleteCustomerProduct({ stock_id: selectedCustomerId, enqueueSnackbar }),
    ).then(() => fetchPage(page));
    setSelectedCustomerId(null);
  };

  // ── Update modal ─────────────────────────────────────────────────────────
  const handleOpenUpdateModal = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
  };

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
    setSelectedCustomersId([]);
    setSelectedCustomerId(null);
    fetchPage(1); // always go back to page 1 on reset
  };

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error || isError) dispatch(clearCustomerError());
  }, [dispatch, error, isError]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Info banner */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <FaInfoCircle
            className="text-blue-500 mt-0.5 flex-shrink-0"
            size={15}
          />
          <p className="text-xs text-blue-700 leading-relaxed">
            Click <span className="font-semibold">isVerified</span> to open the
            approval popup with verification options and discount. Use the{" "}
            <span className="font-semibold">View</span> button to see full
            product details.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Card header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Customer Products
              </h2>
              {allCustomerProductsList?.length > 0 && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {allCustomerProductsList.length} records on this page
                  {total_pages > 1 && ` · page ${page} of ${total_pages}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selectedCustomersId.length > 0 && (
                <button
                  onClick={handleMultipleDelete}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                >
                  <FaTrashAlt size={11} />
                  Delete {selectedCustomersId.length} selected
                </button>
              )}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
              >
                <FaSyncAlt size={11} />
                Reset
              </button>
            </div>
          </div>

          {/* Selection bar */}
          {selectedCustomersId.length > 0 && (
            <div className="px-5 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              <span className="text-xs font-medium text-blue-700">
                {selectedCustomersId.length} item
                {selectedCustomersId.length > 1 ? "s" : ""} selected
              </span>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <Th>
                    <input
                      type="checkbox"
                      className="accent-red-600 w-3 h-3 cursor-pointer"
                      onChange={handleSelectAll}
                      checked={allSelected}
                    />
                  </Th>
                  <Th>#</Th>
                  <Th>Customer</Th>
                  <Th>Image</Th>
                  <Th>Model</Th>
                  <Th>Purchase Date</Th>
                  <Th>Status</Th>
                  <Th>Verified</Th>
                  <Th>Created</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center">
                      <div className="inline-flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
                        <span className="text-xs text-slate-400">Loading…</span>
                      </div>
                    </td>
                  </tr>
                ) : allCustomerProductsList?.length > 0 ? (
                  allCustomerProductsList.map((item, index) => {
                    const isChecked = selectedCustomersId.includes(item.id);
                    // Compute global row number: (page-1)*resultsPerPage + index+1
                    const rowNum = (page - 1) * 8 + index + 1;
                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-slate-50/80 ${isChecked ? "bg-blue-50/40" : ""}`}
                      >
                        {/* Checkbox */}
                        <Td>
                          <input
                            type="checkbox"
                            className="accent-red-600 w-3 h-3 cursor-pointer"
                            checked={isChecked}
                            onChange={(e) => handleSelectCustomer(e, item.id)}
                          />
                        </Td>

                        {/* Row number */}
                        <Td>
                          <span className="text-xs text-slate-400 tabular-nums">
                            {rowNum}
                          </span>
                        </Td>

                        {/* Customer */}
                        <Td>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 uppercase ring-1 ring-blue-100">
                              {item?.customer?.firstname?.[0]}
                              {item?.customer?.lastname?.[0]}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-800 text-sm whitespace-nowrap">
                                {item?.customer?.firstname}{" "}
                                {item?.customer?.lastname}
                              </div>
                              <div className="text-[11px] text-slate-400 whitespace-nowrap">
                                {item?.store_name ?? "—"}
                              </div>
                            </div>
                          </div>
                        </Td>

                        {/* Product image */}
                        <Td>
                          <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                            <img
                              src={item?.product_image}
                              alt="Product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </Td>

                        {/* Model */}
                        <Td>
                          <div className="text-sm text-slate-700 font-medium whitespace-nowrap">
                            {item?.model_name ?? "—"}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            {item?.model_num ?? ""}
                          </div>
                        </Td>

                        {/* Purchase date */}
                        <Td>
                          <span className="text-xs text-slate-600 whitespace-nowrap tabular-nums">
                            {item?.purchase_date
                              ? moment(item.purchase_date).format("D MMM YYYY")
                              : "—"}
                          </span>
                        </Td>

                        {/* Status */}
                        <Td>
                          <StatusBadge status={item?.status} />
                        </Td>

                        {/* isVerified */}
                        <Td>
                          <button
                            onClick={() => handleOpenUpdateModal(item)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-105 active:scale-95 ${
                              item?.is_verified
                                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${item?.is_verified ? "bg-green-500" : "bg-red-400"}`}
                            />
                            {item?.is_verified ? "Verified" : "Unverified"}
                          </button>
                        </Td>

                        {/* Created at */}
                        <Td>
                          <span className="text-xs text-slate-400 whitespace-nowrap tabular-nums">
                            {moment(item.created_at).format("D MMM YYYY")}
                          </span>
                        </Td>

                        {/* Actions */}
                        <Td>
                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/baltra-admin-dashboard/single-customer-product-list/${item.id}`}
                              className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 flex items-center justify-center transition-all"
                              title="View details"
                            >
                              <FaEye size={11} />
                            </Link>
                            <button
                              className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all"
                              title="Delete"
                              onClick={() => handleOpenModal(item.id)}
                            >
                              <FaTrash size={11} />
                            </button>
                            {selectedCustomerId === item.id && (
                              <DeleteCustomerModal
                                onClose={handleCloseModal}
                                onConfirm={handleDeleteConfirm}
                              />
                            )}
                          </div>
                        </Td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <FaInfoCircle className="text-slate-300" size={18} />
                        </div>
                        <p className="text-sm font-medium text-slate-500">
                          No records found
                        </p>
                        <p className="text-xs text-slate-400">
                          Customer products will appear here once added.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer + Pagination */}
          {allCustomerProductsList?.length > 0 && (
            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-400">
                {allCustomerProductsList.length} record
                {allCustomerProductsList.length !== 1 ? "s" : ""} on this page
                {selectedCustomersId.length > 0 && (
                  <span className="ml-2 text-blue-600 font-medium">
                    · {selectedCustomersId.length} selected
                  </span>
                )}
              </span>

              {total_pages > 1 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium hidden sm:block">
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

      {/* Modals */}
      {openUpdateModal && (
        <UpdateModal
          item={selectedItem}
          onClose={handleCloseUpdateModal}
          onSuccess={() => fetchPage(page)}
        />
      )}
    </div>
  );
};

/* ── Primitives ── */
const Th = ({ children }) => (
  <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3 align-middle">{children}</td>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-red-50   text-red-600   border-red-200",
  };
  const cls = styles[status] ?? "bg-slate-100 text-slate-500 border-slate-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {status ?? "—"}
    </span>
  );
};

export default CustomerProductList;
