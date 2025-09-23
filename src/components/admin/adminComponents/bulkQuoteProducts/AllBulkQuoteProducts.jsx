import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FaEye, FaInfoCircle, FaSyncAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allBulkQuoteProducts,
  clearAdminError,
  deleteBulkQuoteProduct,
} from "../../../../redux/features/admin/adminSlice";
import MetaData from "../../../layout/metaData/MetaData";
import BulkQuotePagination from "./bulkPagination/BulkQuotePagination";
import BulkStatusModal from "./bulkStatusModal/BulkStatusModal";
import DeleteBulkModal from "./deleteBulkModal/DeleteBulkModal";

const AllBulkQuoteProducts = () => {
  const { loading, error, isError, bulkQuoteProducts } = useSelector(
    (state) => state.admin
  );

  const bulkPagination =
    useSelector((state) => state.admin.bulkPagination) || {};
  const { page, total_pages, results_per_page } = bulkPagination;
  const dispatch = useDispatch();

  const [selectedBulkQuoteId, setSelectedBulkQuoteId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [selectStatus, setSelectStatus] = useState("All");

  const handleOpenModal = (id) => {
    setSelectedBulkQuoteId(id);
  };

  const handleCloseModal = () => {
    setSelectedBulkQuoteId(null);
  };

  const handleOpenBulkQuoteModal = (item) => {
    setSelectedItem(item);
    setOpenBulkModal(true);
  };

  const handleCloseBulkQuoteModal = () => {
    setOpenBulkModal(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedBulkQuoteId !== null) {
      dispatch(
        deleteBulkQuoteProduct({
          quote_id: selectedBulkQuoteId,
          enqueueSnackbar,
        })
      );
      setSelectedBulkQuoteId(null);
    }
  };

  const handleReset = () => {
    setSelectStatus("All");
    setSelectedBulkQuoteId(null);
    setSelectedItem(null);

    dispatch(
      allBulkQuoteProducts({
        status: "",
      })
    );
  };

  useEffect(() => {
    dispatch(
      allBulkQuoteProducts({
        status: selectStatus === "All" ? "" : selectStatus,
      })
    );
  }, [dispatch, selectStatus]);

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, isError]);
  return (
    <>
      <MetaData title="Baltra-admin-dashboard-all-BulkQuote-products" />
      <div className="flex items-center w-full my-2 px-4">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs md:text-sm text-black font-outfit flex-grow">
          To approved a Customer Added Bulk Quote Products from the Dashboard,
          click the "status" button from the table list below. After clicking, a
          popup will display with verification option. Once approved, select and
          update.
        </p>
      </div>
      <div className="font-gothamNarrow container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All BulkQuote Products
          </h2>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <select
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
            <button
              className="flex cursor-pointer items-center gap-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleReset}
            >
              <FaSyncAlt className="text-gray-500" /> Reset
            </button>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-1 text-left text-sm font-semibold text-black font-gothamNarrow">
                    S.N.
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Customer Name
                  </th>

                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Model Name
                  </th>

                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Model Number
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Contact
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Quantity
                  </th>

                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Status
                  </th>

                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    CreatedAt
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-gothamNarrow">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2  whitespace-nowrap border-gray-800 border-t-gray-800"></div>
                    </td>
                  </tr>
                ) : bulkQuoteProducts && bulkQuoteProducts.length > 0 ? (
                  bulkQuoteProducts.map((item, index) => (
                    <tr
                      key={item?.quote_id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm whitespace-nowrap border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 text-left text-sm text-black font-gothamNarrow border-l whitespace-nowrap">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {item?.customer_name}
                      </td>
                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {item?.model_num}
                      </td>

                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {item?.contact}
                      </td>
                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {item?.quantity}
                      </td>

                      <td className="px-4 py-2 whitespace-nowrap text-sm font-gothamNarrow">
                        {item?.status === "Pending" ||
                        item?.status === "Rejected" ? (
                          <span
                            className={`${
                              item?.status === "Pending"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                            } text-white px-3 py-2 rounded-full cursor-pointer`}
                            onClick={() => handleOpenBulkQuoteModal(item)}
                          >
                            {item?.status}
                          </span>
                        ) : item?.status === "Approved" ? (
                          <span className="bg-green-600 text-white px-3 py-2 rounded-full cursor-pointer">
                            Approved
                          </span>
                        ) : (
                          <span className="bg-gray-600 text-white px-3 py-2 rounded-full">
                            {item?.status}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-2 text-sm text-black whitespace-nowrap">
                        {moment(item?.created_at).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 py-2 text-sm text-black">
                        <span className="flex">
                          <Link
                            to={`/baltra-admin-dashboard/single/bulk-quote-view/${item?.quote_id}`}
                          >
                            <FaEye className="text-blue-600 hover:text-black" />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(item?.quote_id)}
                          >
                            <FaTrash className="text-red-600 hover:text-red-700 mx-2" />
                          </button>
                          {selectedBulkQuoteId !== null && (
                            <DeleteBulkModal
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center text-sm">
                      No Data found.
                    </td>
                  </tr>
                )}

                {openBulkModal && (
                  <BulkStatusModal
                    item={selectedItem}
                    onClose={handleCloseBulkQuoteModal}
                  />
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <BulkQuotePagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(AllBulkQuoteProducts);
