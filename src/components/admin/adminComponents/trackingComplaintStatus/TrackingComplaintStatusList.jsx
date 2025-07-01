import { debounce } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlusCircle, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  trackingComplaintStatus,
} from "../../../../redux/features/admin/adminSlice";
import WarrantyComplaintPagination from "../adminPagination/warrantyComplaintPagination/WarrantyComplaintPagination";

const TrackingComplaintStatusList = () => {
  const { loading, complaintStatus, error } = useSelector(
    (state) => state.admin
  );
  const warrantyComplaintPagination =
    useSelector((state) => state.admin.warrantyComplaintPagination) || {};
  const { page, total_pages, results_per_page } = warrantyComplaintPagination;

  const dispatch = useDispatch();
  const [searchSerialNumber, setSearchSerialNumber] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      dispatch(trackingComplaintStatus({ serial_number: searchTerm }));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchSerialNumber(value);
    debouncedSearch(value);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(trackingComplaintStatus(newPage));
    },
    [dispatch]
  );

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(trackingComplaintStatus());
  }, [dispatch]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        {/* Added buttons and hr line */}
        {/* <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button className="bg-gray-300 py-2 px-4 rounded-sm text-sm font-gothamNarrow">
              Button 1
            </button>
            <button className="bg-gray-300 py-2 px-4 rounded-sm text-sm font-gothamNarrow">
              Button 2
            </button>
            <button className="bg-gray-300 py-2 px-4 rounded-sm text-sm font-gothamNarrow">
              Button 3
            </button>
          </div>

          <div className="text-sm font-gothamNarrow">
            <span className="font-semibold">Gallery Folder</span>
  
          </div>
        </div> */}

        {/* Horizontal Line */}
        {/* <hr className="my-4 border-t-2 border-gray-300" /> */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Manage Warranry Complaints
          </h2>
          <Link to={"#"}>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-1" />
              Add
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs items-center">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by serial number"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={searchSerialNumber}
                onChange={handleSearchChange}
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    WarrantyImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    CustomerName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    ModelName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    ModelNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    SerialNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Purchase Date
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    WarrantyExpired
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-gray-800 border-t-gray-800"></div>
                    </td>
                  </tr>
                ) : complaintStatus && complaintStatus?.length > 0 ? (
                  complaintStatus?.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {/* {index + 1} */}
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={item?.warranty_image}
                          alt={`Warranty Photo`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.customer_name}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.model_num}
                      </td>

                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.serial_number}
                      </td>

                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {moment(item.warranty_expire).isAfter(moment()) ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer">
                            Available
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full cursor-pointer">
                            Expired
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {item?.purchase_date}
                      </td>
                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        {moment(item.warranty_expire).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>

                      <td className="px-4 py-2 font-gothamNarrow text-sm text-black whitespace-nowrap">
                        <button className="text-red-600 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center font-gothamNarrow">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <WarrantyComplaintPagination
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

export default TrackingComplaintStatusList;
