import moment from "moment";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sessiorImg from "../../assets/images/SessiorImg.png";
import trackingImg from "../../assets/images/trackingserviceImg.png";
import MetaData from "../../components/layout/metaData/MetaData";
import {
  allBulkHistoryProducts,
  clearProductError,
} from "../../redux/features/product/productSlice";
import BaltraApplianceCareHeader from "../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";
import OrderHistoryPagination from "./orderHistoryPagination/OrderHistoryPagination";

/* ─── Status badge ────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Rejected: "bg-red-50 text-red-600 border border-red-200",
    Approved: "bg-green-50 text-green-700 border border-green-200",
  };
  const dots = {
    Pending: "bg-amber-400",
    Rejected: "bg-red-400",
    Approved: "bg-green-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dots[status] || dots.Pending}`}
      />
      {status}
    </span>
  );
};

/* ─── Skeleton loader row ─────────────────────────────────────────────────── */
const SkeletonRow = () => (
  <tr className="border-b border-gray-100">
    {[40, 28, 90, 100, 80, 80, 36, 70, 90, 28].map((w, i) => (
      <td key={i} className="px-4 py-3">
        <div
          className="h-3 rounded-full bg-gray-100 animate-pulse"
          style={{ width: w }}
        />
      </td>
    ))}
  </tr>
);

/* ─── Empty state ─────────────────────────────────────────────────────────── */
const EmptyState = ({ status }) => (
  <tr>
    <td colSpan={10} className="py-14 text-center">
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-500">No orders found</p>
        <p className="text-xs text-gray-400">
          {status !== "All"
            ? `No ${status.toLowerCase()} bulk orders to display.`
            : "You haven't submitted any bulk orders yet."}
        </p>
      </div>
    </td>
  </tr>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main page
══════════════════════════════════════════════════════════════════════════ */
const BulkOrderHistory = () => {
  const { loading, error, bulkQuotes } = useSelector((state) => state.product);
  const bulkPagination =
    useSelector((state) => state.product.bulkPagination) || {};
  const { page, total_pages, results_per_page } = bulkPagination;
  const dispatch = useDispatch();

  const [selectStatus, setSelectStatus] = useState("All");

  useEffect(() => {
    dispatch(
      allBulkHistoryProducts({
        status: selectStatus === "All" ? "" : selectStatus,
      }),
    );
  }, [dispatch, selectStatus]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  const handlePageChange = (newPage) => {
    dispatch(
      allBulkHistoryProducts({
        status: selectStatus === "All" ? "" : selectStatus,
        page: newPage,
      }),
    );
  };

  return (
    <>
      <MetaData title="Baltra-Bulk-Order-History" />

      {/* ── Hero — completely unchanged ── */}
      <div className="pt-4 w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60">
        <BaltraApplianceCareHeader />
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[278px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          <img
            src={trackingImg}
            alt="Rice Cooker"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
          <div className="flex flex-col justify-center items-center text-white text-center mt-5 md:mt-0 h-[150px] sm:h-[200px] md:h-auto">
            <div className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-semibold font-gothamNarrow tracking-wide">
              Bulk Order History
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-gothamNarrow tracking-wide">
              Know the status of your Bulk History
            </div>
          </div>
          <img
            src={sessiorImg}
            alt="Fan"
            className="w-32 h-32 md:w-56 md:h-56 hidden md:block"
          />
        </div>
      </div>

      {/* ── Table section ── */}
      <div className="font-gothamNarrow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Title + filter row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg sm:text-base font-semibold text-gray-800">
            Bulk Order History
          </h2>
          <div className="relative self-start sm:self-auto">
            <select
              className="appearance-none pl-3.5 pr-9 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 cursor-pointer transition-all"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Approved">Approved</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              {/* Head */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer"
                    />
                  </th>
                  {[
                    "S.N.",
                    "Customer Name",
                    "Model Name",
                    "Model Number",
                    "Contact",
                    "Quantity",
                    "Status",
                    "Created At",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                ) : bulkQuotes && bulkQuotes.length > 0 ? (
                  bulkQuotes.map((item, index) => (
                    <tr
                      key={item?.quote_id}
                      className="hover:bg-red-50/30 transition-colors duration-100"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-400 tabular-nums text-[13px]">
                        {page && results_per_page
                          ? (page - 1) * results_per_page + index + 1
                          : index + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                        {item?.customer_name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-mono text-[12px]">
                        {item?.model_num}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap tabular-nums">
                        {item?.contact}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-7 rounded-lg bg-gray-100 text-gray-700 font-semibold text-[12px]">
                          {item?.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={item?.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-[12px]">
                        {moment(item?.created_at).format("D MMM YYYY")}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/single-bulk-history/${item?.quote_id}`}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all duration-150"
                          title="View details"
                        >
                          <FaEye size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyState status={selectStatus} />
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          {total_pages > 1 && (
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/60">
              <p className="text-[12px] text-gray-400">
                Page <span className="font-semibold text-gray-600">{page}</span>{" "}
                of{" "}
                <span className="font-semibold text-gray-600">
                  {total_pages}
                </span>
              </p>
              <OrderHistoryPagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BulkOrderHistory;
