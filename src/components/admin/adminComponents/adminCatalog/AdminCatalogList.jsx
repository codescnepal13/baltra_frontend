import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaPlusCircle,
  FaSearch,
  FaSyncAlt,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allProductCatalog,
  clearAdminError,
  deleteProductCatalog,
} from "../../../../redux/features/admin/adminSlice";
import ProductCatalogDeleteModal from "./addCatalog/ProductCatalogDeleteModal";

const AdminCatalogList = () => {
  const { loading, error, allProductCatalogList } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);

  const handleOpenModal = (catalogId) => setSelectedCatalogId(catalogId);
  const handleCloseModal = () => setSelectedCatalogId(null);

  const handleDeleteConfirm = () => {
    if (selectedCatalogId !== null) {
      dispatch(
        deleteProductCatalog({ id: selectedCatalogId, enqueueSnackbar }),
      );
      setSelectedCatalogId(null);
    }
  };

  const handleReset = () => {
    setSelectedCatalogId(null);
    dispatch(allProductCatalog());
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(allProductCatalog());
  }, [dispatch]);

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Product Catalogs
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Manage catalog covers and PDF files
          </p>
        </div>
        <Link
          to="/baltra-admin-dashboard/add/product-catalog"
          className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-medium tracking-[0.02em] px-3.5 py-2 rounded-lg transition-colors"
        >
          <FaPlusCircle size={12} />
          Add Catalog
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSyncAlt size={10} />
            Reset
          </button>

          <span className="ml-auto text-[11px] text-gray-300 tracking-[0.03em]">
            {allProductCatalogList?.length ?? 0} catalog
            {allProductCatalogList?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full text-[12.5px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  "S.N.",
                  "Catalog Name",
                  "Cover",
                  "PDF File",
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
                  <td colSpan={6} className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-red-500" />
                  </td>
                </tr>
              ) : allProductCatalogList && allProductCatalogList.length > 0 ? (
                allProductCatalogList.map((catalog, index) => (
                  <tr
                    key={catalog.id}
                    className="hover:bg-[#FFF0E5]/60 transition-colors cursor-pointer"
                  >
                    {/* S.N. */}
                    <td className="px-4 py-3 text-gray-400 tabular-nums w-10">
                      {index + 1}
                    </td>

                    {/* Catalog Name */}
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-800 tracking-[0.01em]">
                        {catalog?.catalogue_type}
                      </span>
                    </td>

                    {/* Cover image */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                        {catalog?.catalogue_image ? (
                          <img
                            src={catalog.catalogue_image}
                            alt={catalog.catalogue_type}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-gray-300">
                            None
                          </span>
                        )}
                      </div>
                    </td>

                    {/* PDF / file */}
                    <td className="px-4 py-3">
                      {catalog?.file?.endsWith(".pdf") ? (
                        <a
                          href={catalog.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-[11px] font-medium text-red-500 hover:bg-red-100 transition-colors"
                        >
                          <FaFilePdf size={11} />
                          View PDF
                        </a>
                      ) : catalog?.file ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                          <img
                            src={catalog.file}
                            alt={catalog.catalogue_type}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-300">—</span>
                      )}
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap tabular-nums tracking-[0.01em]">
                      {moment(catalog.date_joined).format("D MMM YYYY")}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleOpenModal(catalog.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete catalog"
                      >
                        <FaTrash size={12} />
                      </button>
                      {selectedCatalogId === catalog.id && (
                        <ProductCatalogDeleteModal
                          onClose={handleCloseModal}
                          onConfirm={handleDeleteConfirm}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaSearch className="text-gray-300" size={14} />
                      </div>
                      <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                        No catalogs found
                      </p>
                      <button
                        onClick={handleReset}
                        className="text-[11.5px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
                      >
                        Refresh list
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-[11px] text-gray-300 tracking-[0.03em]">
            Showing {allProductCatalogList?.length ?? 0} result
            {allProductCatalogList?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminCatalogList;
