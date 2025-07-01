import React, { useCallback, useEffect, useState } from "react";
import {
  FaDownload,
  FaPlusCircle,
  FaSearch,
  FaTrash,
  FaTrashAlt,
  FaQrcode,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteBaltraQrProduct,
  deleteMultipleQrProduct,
  downloadAllQrInPDF,
  downloadSelectQrInPDF,
  getAllQrList,
} from "../../../../redux/features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import BaltraQrModal from "../baltraQrModal/BaltraQrModal";
import { toast } from "react-toastify";
import QRPagination from "../adminPagination/qrPagination/QRPagination";
import DeleteQrModal from "../deleteQrModal/DeleteQrModal";

const QRProductList = () => {
  const { loading, error, allQrList } = useSelector((state) => state.admin);
  const myProductPagination =
    useSelector((state) => state.admin.myProductPagination) || {};
  const { page, total_pages, results_per_page } = myProductPagination;
  const dispatch = useDispatch();

  const [openQrModal, setOpenQrModal] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductsId, setSelectedProductsId] = useState([]);

  const [isDownloading, setIsDownloading] = useState(false);

  const [isDownloadFetching, setIsDownloadFetching] = useState(false);

  // const handleDownload = async () => {
  //   setIsDownloading(true);
  //   try {
  //     const actionResult = await dispatch(downloadAllQrInPDF());
  //     if (downloadAllQrInPDF.fulfilled.match(actionResult)) {
  //       const url = window.URL.createObjectURL(
  //         new Blob([actionResult.payload])
  //       );
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "qr-products-list.pdf";
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     } else {
  //       console.error("Failed to download PDF:", actionResult.payload.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during PDF download:", error);
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const actionResult = await dispatch(downloadAllQrInPDF());
      if (downloadAllQrInPDF.fulfilled.match(actionResult)) {
        const url = window.URL.createObjectURL(
          new Blob([actionResult.payload])
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-products-list.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error("Failed to download ZIP:", actionResult.payload.message);
      }
    } catch (error) {
      console.error("Error during ZIP download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSelectedDownload = async () => {
    if (selectedProductsId.length === 0) {
      console.error("No products selected for download.");
      return;
    }

    setIsDownloadFetching(true);
    try {
      const actionResult = await dispatch(
        downloadSelectQrInPDF(selectedProductsId)
      );
      if (downloadSelectQrInPDF.fulfilled.match(actionResult)) {
        const url = window.URL.createObjectURL(
          new Blob([actionResult.payload])
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-selected-products-list.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setSelectedProductsId([]);
      } else {
        console.error("Failed to download ZIP:", actionResult.payload.message);
      }
    } catch (error) {
      console.error("Error during ZIP download:", error);
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

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(deleteBaltraQrProduct({ product_id: selectedProductId, toast }));
      setSelectedProductId(null);
    }
  };

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(getAllQrList(newPage));
    },
    [dispatch]
  );

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = allQrList.map((product) => product.product_id);
      setSelectedProductsId(allProductIds);
    } else {
      setSelectedProductsId([]);
    }
  };

  const handleSelectProduct = (event, productId) => {
    if (event.target.checked) {
      setSelectedProductsId((prev) => [...prev, productId]);
    } else {
      setSelectedProductsId((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedProductsId.length > 0) {
      dispatch(
        deleteMultipleQrProduct({ product_ids: selectedProductsId, toast })
      ).then(() => {
        dispatch(getAllQrList(page));
      });

      setSelectedProductsId([]);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getAllQrList(page));
  }, [dispatch, page]);

  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-8">
        <div className="flex items-center w-full my-2">
          <FaInfoCircle className="text-black mr-2" size={20} />
          <p className="text-xs text-black font-outfit flex-grow md:text-sm">
            If you want to download QR codes for all products in the table,
            click the export button on the right end of the table. If you prefer
            to download QR codes only for selected products,first select the
            multiple checkboxes, After this export selected button display and
            then click the button for downloaded.
          </p>
        </div>
        <div className="flex justify-between mb-4 mt-8">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            All Qr List
          </h2>
          <Link to="/baltra-admin-dashboard/add-Qr-Product">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-flex items-center font-gothamNarrow">
              <FaPlusCircle className="mr-2" />
              Add QRProduct
            </button>
          </Link>
        </div>

        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="flex mb-2 text-xs items-center">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by Model Name"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow">
                <FaSearch />
              </button>
            </div>
            <div className="relative mr-2 flex items-center">
              <select className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow">
                <option value="">Select serial number</option>
                <option value="All">All</option>
              </select>
            </div>
            <div className="flex items-center">
              {selectedProductsId.length > 0 && (
                <button
                  className={`${
                    isDownloadFetching
                      ? "bg-gray-500"
                      : "bg-green-700 hover:bg-green-800"
                  } text-white py-2 px-4 inline-flex items-center rounded-sm font-gothamNarrow`}
                  onClick={handleSelectedDownload}
                  disabled={isDownloadFetching}
                >
                  {isDownloadFetching ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaQrcode className="mr-2 font-gothamNarrow" />
                      Export Selected
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center">
              <button
                className={`${
                  isDownloading
                    ? "bg-gray-500"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-2 px-4 inline-flex items-center rounded-sm font-gothamNarrow`}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaDownload className="mr-2 font-gothamNarrow" />
                    Export
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedProductsId?.length > 0 && (
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
                  <th className="px-4 py-2 text-left text-sm font-semibold text-black border-l border-r accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allQrList?.length > 0 &&
                        selectedProductsId?.length === allQrList?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black whitespace-nowrap">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Model Name
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Model Number
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Serial Number
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    QR Image
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300 whitespace-nowrap">
                    Created At
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
                ) : allQrList && allQrList?.length > 0 ? (
                  allQrList.map((product, index) => (
                    <tr
                      key={product.product_id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-4 py-1 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedProductsId.includes(
                            product.product_id
                          )}
                          onChange={(e) =>
                            handleSelectProduct(e, product.product_id)
                          }
                        />
                      </td>
                      <td className="px-6 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {product?.model_name}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {product?.model_number}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {product?.serial_number}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={product?.qr_code}
                          alt={`Qr Photo ${product?.name}`}
                          className="h-12 w-12 cursor-pointer font-gothamNarrow"
                          onClick={() => handleQrClick(product.qr_code)}
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(product.date_joined).format("dddd, D MMM YYYY")}
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center">
                          <FaTrash
                            className="h-4 w-4 text-red-600 hover:text-red-700 cursor-pointer"
                            onClick={() => handleOpenModal(product.product_id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <QRPagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            ""
          )}

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
      </div>
    </>
  );
};

export default QRProductList;
