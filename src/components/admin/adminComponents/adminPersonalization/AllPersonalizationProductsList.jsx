import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import MetaData from "../../../layout/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  allCustomizedPersonalization,
  clearAdminError,
  deleteCustomizedProduct,
} from "../../../../redux/features/admin/adminSlice";
import moment from "moment";
import { FaEye, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import DeletePersonalizationModal from "./DeletePersonalizationModal";
import UpdateCustomizedModal from "./UpdateCustomizedModal";

const AllPersonalizationProductsList = () => {
  const { loading, error, isError, allCustomizedProducts } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  const [selectedCustomizeId, setSelectedCustomizedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);
  const [selectPlacement, setSelectPlacement] = useState("All");

  const handleOpenModal = (id) => {
    setSelectedCustomizedId(id);
  };

  const handleCloseModal = () => {
    setSelectedCustomizedId(null);
  };

  const handleOpenCustomizedModal = (item) => {
    setSelectedItem(item);
    setOpenCustomizeModal(true);
  };

  const handleCloseCustomizeModal = () => {
    setOpenCustomizeModal(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomizeId !== null) {
      dispatch(
        deleteCustomizedProduct({
          personalization_id: selectedCustomizeId,
          toast,
        })
      );
      setSelectedCustomizedId(null);
    }
  };
  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearAdminError());
    }
  }, [dispatch, isError]);

  useEffect(() => {
    dispatch(
      allCustomizedPersonalization({
        placement: selectPlacement === "All" ? "" : selectPlacement,
      })
    );
  }, [dispatch, selectPlacement]);
  return (
    <>
      <MetaData title="Baltra-admin-dashboard-all-customized-products" />
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs md:text-sm text-black font-outfit flex-grow">
          To approve a Customer Added Personalization from the Dashboard, click
          the "status" button from the table list below. After clicking, a popup
          will display with verification option. Once approved, select and
          update.
        </p>
      </div>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All Customize Products
          </h2>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <select
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                value={selectPlacement}
                onChange={(e) => setSelectPlacement(e.target.value)}
              >
                <option value="All">All</option>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap accent-red-500">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-1 text-left text-sm font-semibold text-black font-gothamNarrow">
                    S.N.
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Customer Name
                  </th>

                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Product Image
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Text
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Placement
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Font Style
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    color
                  </th>
                  <th className="px-4 py-2  text-left text-sm font-semibold text-black border-l border-r whitespace-nowrap border-gray-300 font-gothamNarrow">
                    Size
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
                ) : allCustomizedProducts &&
                  allCustomizedProducts.length > 0 ? (
                  allCustomizedProducts.map((customizeProduct, index) => (
                    <tr
                      key={customizeProduct.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm whitespace-nowrap border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-1 text-left text-sm text-black font-gothamNarrow border-l whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.customer_name}
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.product_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={customizeProduct?.main_image}
                          alt={`Personalize Photo ${customizeProduct?.product_name}`}
                          className="h-8 w-8 object-contain"
                        />
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.text}
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.placement}
                      </td>
                      <td className="px-4 py-1 text-sm text-black  whitespace-nowrap">
                        {customizeProduct.font_style}
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.color ? (
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: customizeProduct.color }}
                          ></div>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {customizeProduct.size ? customizeProduct.size : "-"}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow">
                        {customizeProduct?.status === "pending" ? (
                          <span
                            className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer"
                            onClick={() =>
                              handleOpenCustomizedModal(customizeProduct)
                            }
                          >
                            Pending
                          </span>
                        ) : customizeProduct?.status === "approved" ? (
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer">
                            Approved
                          </span>
                        ) : (
                          <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer">
                            {customizeProduct?.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-1 text-sm text-black whitespace-nowrap">
                        {moment(customizeProduct.created_at).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>
                      <td className="px-4 py-1 text-sm text-black">
                        <div className="flex">
                          <Link
                            to={`/baltra-admin-dashboard/single/personalization-view/${customizeProduct.id}`}
                          >
                            <FaEye className="text-blue-600 hover:text-black" />
                          </Link>
                          <button>
                            <FaTrash
                              className="text-red-600 hover:text-red-700 mx-2"
                              onClick={() =>
                                handleOpenModal(customizeProduct.id)
                              }
                            />
                            {selectedCustomizeId !== null && (
                              <DeletePersonalizationModal
                                onClose={handleCloseModal}
                                onConfirm={handleDeleteConfirm}
                              />
                            )}
                          </button>
                        </div>
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

                {openCustomizeModal && (
                  <UpdateCustomizedModal
                    item={selectedItem}
                    onClose={handleCloseCustomizeModal}
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

export default AllPersonalizationProductsList;
