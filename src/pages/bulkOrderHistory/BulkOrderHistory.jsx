import moment from "moment";
import React, { useEffect, useState } from "react";
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
      })
    );
  }, [dispatch, selectStatus]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra-Bulk-Order-History" />

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

      <div className="font-gothamNarrow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg sm:text-base font-semibold">
            Bulk Order History
          </h2>
        </div>
        <div className="bg-white px-4 py-4 sm:px-2 sm:py-2 rounded-md shadow">
          <div className="flex mb-4 text-sm">
            <div className="relative mr-2 flex items-center">
              <select
                className="w-48 sm:w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          <div className="bg-white overflow-x-auto hide-scrollbar">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-l border-r whitespace-nowrap">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">S.N.</th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Model Name
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Model Number
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Contact
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    CreatedAt
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-l border-r whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-800"></div>
                    </td>
                  </tr>
                ) : bulkQuotes && bulkQuotes.length > 0 ? (
                  bulkQuotes.map((item, index) => (
                    <tr
                      key={item?.quote_id}
                      className="hover:bg-gray-100 border-t border-b whitespace-nowrap"
                    >
                      <td className="px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {page && results_per_page
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item?.customer_name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item?.model_num}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item?.contact}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item?.quantity}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span
                          className={`${
                            item?.status === "Pending"
                              ? "bg-red-600"
                              : item?.status === "Rejected"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                          } text-white px-3 py-1 rounded-full`}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {moment(item?.created_at).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 py-2">
                        <Link to={`/single-bulk-history/${item?.quote_id}`}>
                          <FaEye className="text-blue-600 hover:text-black" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-4">
                      No Data Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages > 1 && (
            <div className="flex justify-end mt-4">
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
