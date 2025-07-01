import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaInfoCircle,
  FaPencilAlt,
  FaPlusCircle,
  FaSearch,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearCustomerError,
  deleteCustomerProduct,
  deleteMultipleCustomer,
  getAllCustomerAddedProductList,
} from "../../../../redux/features/customer/customerSlice";
import DeleteCustomerModal from "./deleteCustomerModal/DeleteCustomerModal";
import UpdateModal from "./updateModal/UpdateModal";

const CustomerProductList = () => {
  const { loading, error, isError, allCustomerProductsList } = useSelector(
    (state) => state.customer
  );

  const dispatch = useDispatch();

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomersId, setSelectedCustomersId] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allCustomerIds = allCustomerProductsList.map(
        (customer) => customer.id
      );
      setSelectedCustomersId(allCustomerIds);
    } else {
      setSelectedCustomersId([]);
    }
  };

  const handleSelectCustomer = (event, id) => {
    if (event.target.checked) {
      setSelectedCustomersId((prev) => [...prev, id]);
    } else {
      setSelectedCustomersId((prev) => prev.filter((id) => id !== id));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedCustomersId.length > 0) {
      dispatch(
        deleteMultipleCustomer({
          stock_ids: selectedCustomersId,
          toast,
        })
      ).then(() => {
        dispatch(getAllCustomerAddedProductList(page));
      });

      setSelectedCustomersId([]);
    }
  };
  const handleOpenModal = (id) => {
    setSelectedCustomerId(id);
  };

  const handleCloseModal = () => {
    setSelectedCustomerId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomerId !== null) {
      dispatch(deleteCustomerProduct({ stock_id: selectedCustomerId, toast }));
      setSelectedCustomerId(null);
    }
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isError) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, isError]);

  useEffect(() => {
    dispatch(getAllCustomerAddedProductList());
  }, [dispatch]);
  return (
    <>
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs md:text-sm text-black font-outfit flex-grow">
          To approve a Customer Added Product from the Dashboard, click the
          "isVerified" button from the table list below. After clicking, a popup
          will display with verification options and a discount. Once approved,
          select and update.
        </p>
      </div>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Customer Products List
          </h2>
          <Link to={"#"}>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-1" />
              Add
            </button>
          </Link>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by modelname"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow">
                <FaSearch />
              </button>
            </div>
            <div className="relative mr-2 flex items-center">
              <select className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow">
                <option value="All">All</option>
                <option value="All">UnVerified</option>
                <option value="All">Verified</option>
              </select>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedCustomersId.length > 0 && (
              <button
                className="h-4 w-4 text-red-600 hover:text-red-700"
                onClick={handleMultipleDelete}
              >
                <FaTrashAlt />
              </button>
            )}
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allCustomerProductsList.length > 0 &&
                        selectedCustomersId.length ===
                          allCustomerProductsList.length
                      }
                    />
                  </th>

                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    CustomerName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    ModelName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    ModelNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    SerialNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    StoreName
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    StoreLocation
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    StoreNumber
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    PurchaseDate
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    WarrantyIssues
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    WarrantyExpired
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    ProductImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    BillImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    WarrantyImage
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    isVerified
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    CreatedAt
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
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
                ) : allCustomerProductsList &&
                  allCustomerProductsList?.length > 0 ? (
                  allCustomerProductsList &&
                  allCustomerProductsList?.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          checked={selectedCustomersId.includes(item.id)}
                          onChange={(e) => handleSelectCustomer(e, item.id)}
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-xs text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.customer?.firstname} {item?.customer?.lastname}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.model_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.model_num}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.serial_number}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.store_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.store_location}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.store_number}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {moment(item?.purchase_date).format("Do MMM, YYYY")}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.warranty_issue
                          ? moment(item.warranty_issue).format("Do MMM, YYYY")
                          : "-"}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {item?.warranty_expiry
                          ? moment(item.warranty_expiry).format("Do MMM, YYYY")
                          : "-"}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={item?.product_image}
                          alt={`User Photo`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={item?.bill_image_one}
                          alt={`Bill Photo`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={item?.warranty_image}
                          alt={`Bill Photo`}
                          className="h-10 w-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow">
                        {item?.status === "Pending" ? (
                          <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer">
                            Pending
                          </span>
                        ) : item?.status === "Approved" ? (
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer">
                            Approved
                          </span>
                        ) : (
                          <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer">
                            {item?.status}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow">
                        {item?.is_verified ? (
                          <span
                            className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer"
                            onClick={() => handleOpenUpdateModal(item)}
                          >
                            Verified
                          </span>
                        ) : (
                          <span
                            className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer"
                            onClick={() => handleOpenUpdateModal(item)}
                          >
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(item.created_at).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/single-customer-product-list/${item.id}`}
                          >
                            <FaEye
                              className="text-blue-500 hover:text-blue-700"
                              title="View"
                            />
                          </Link>
                          <Link to={`#`}>
                            <FaPencilAlt
                              className="text-green-500 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>

                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => handleOpenModal(item.id)}
                          />
                          {selectedCustomerId !== null && (
                            <DeleteCustomerModal
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-gray-500 text-sm font-gothamNarrow"
                      colSpan={12}
                      style={{ textAlign: "center" }}
                    >
                      No Data found
                    </td>
                  </tr>
                )}

                {openUpdateModal && (
                  <UpdateModal
                    item={selectedItem}
                    onClose={handleCloseUpdateModal}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProductList;
