import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlinePhoto,
} from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductCatalog,
  clearAdminError,
} from "../../../../../redux/features/admin/adminSlice";

const AddCatalog = () => {
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productCatalogPreview, setProductCatalogPreview] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [catalogue_type, setCatalogType] = useState("");
  const [catalogTypeError, setCatalogTypeError] = useState("");
  const [fileError, setFileError] = useState("");
  const [catalogue_image, setCatalogImage] = useState("");
  const [catalogProductCoverPreview, setCatalogProductCoverPreview] =
    useState(null);

  const handleCatalogCoverFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCatalogProductCoverPreview(reader.result);
      setCatalogImage(file);
    };
  };

  const handleProductFileCatalog = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are supported.");
      setProductCatalogPreview(null);
      setPdfFileName("");
      return;
    }
    setFileError("");
    setPdfFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setProductCatalogPreview(reader.result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!catalogue_type.trim()) {
      setCatalogTypeError("Catalog type is required.");
      valid = false;
    } else {
      setCatalogTypeError("");
    }

    const fileInput = document.getElementById("productCatalog").files[0];
    if (!fileInput || fileInput.type !== "application/pdf") {
      setFileError("Please upload a valid PDF file.");
      valid = false;
    } else {
      setFileError("");
    }

    if (!valid) return;

    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("catalogue_type", catalogue_type);
    formData.append("catalogue_image", catalogue_image);
    dispatch(addProductCatalog({ formData, enqueueSnackbar, navigate }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Back link */}
      <Link
        to="/baltra-admin-dashboard/all/e-catalog-list"
        className="inline-flex items-center gap-2 text-[12.5px] font-medium text-gray-400 hover:text-gray-700 tracking-[0.01em] transition-colors mb-6"
      >
        <HiOutlineArrowLeftCircle size={16} />
        Back to catalog list
      </Link>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
          Add Product Catalog
        </h1>
        <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
          Upload a catalog cover image and a PDF file
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 mb-6 max-w-2xl">
        <HiOutlineInformationCircle
          size={15}
          className="text-blue-400 flex-shrink-0 mt-0.5"
        />
        <p className="text-[12px] text-blue-600 tracking-[0.01em] leading-relaxed">
          Only <span className="font-semibold">PDF</span> files are supported
          for the catalog file upload. Ensure your cover image is clear and
          high-resolution.
        </p>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          {/* Card header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <HiOutlineDocumentText size={15} className="text-red-500" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800 tracking-[-0.01em]">
                Catalog Details
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 tracking-[0.01em]">
                Fill in the name and upload the required files
              </p>
            </div>
          </div>

          <div className="px-5 py-5 space-y-5">
            {/* Catalog type input */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1.5">
                Catalog Name
              </label>
              <input
                type="text"
                id="catalogue_type"
                name="catalogue_type"
                value={catalogue_type}
                onChange={(e) => {
                  setCatalogType(e.target.value);
                  if (e.target.value.trim()) setCatalogTypeError("");
                }}
                placeholder="e.g. Kitchen Appliances 2025"
                className={`w-full px-3 py-3 text-[12.5px] tracking-[0.01em] text-gray-700 border rounded-lg outline-none transition-all placeholder:text-gray-300
                  ${
                    catalogTypeError
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500/10"
                  }`}
              />
              {catalogTypeError && (
                <p className="text-[11.5px] text-red-500 mt-1.5 tracking-[0.01em]">
                  {catalogTypeError}
                </p>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Cover image upload */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1.5">
                <HiOutlinePhoto size={13} />
                Catalog Cover Image
              </label>
              <label
                htmlFor="catalogue_image"
                className={`flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed cursor-pointer transition-colors
                  ${
                    catalogProductCoverPreview
                      ? "border-gray-200 bg-gray-50"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50/30"
                  }`}
              >
                {catalogProductCoverPreview ? (
                  <div className="relative w-full h-full p-2">
                    <img
                      src={catalogProductCoverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <span className="absolute bottom-3 right-3 text-[10.5px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                      Click to change
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <IoCloudUploadOutline size={28} />
                    <p className="text-[12px] text-gray-400 tracking-[0.01em]">
                      Click to upload cover image
                    </p>
                    <p className="text-[11px] text-gray-300">
                      PNG, JPG, WEBP supported
                    </p>
                  </div>
                )}
                <input
                  id="catalogue_image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCatalogCoverFileInputChange}
                />
              </label>
            </div>

            <hr className="border-gray-100" />

            {/* PDF upload */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1.5">
                <FaFilePdf size={11} />
                Catalog PDF File
              </label>
              <label
                htmlFor="productCatalog"
                className={`flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors
                  ${
                    fileError
                      ? "border-red-300 bg-red-50/20"
                      : productCatalogPreview
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50/30"
                  }`}
              >
                {productCatalogPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                      <FaFilePdf size={18} className="text-red-500" />
                    </div>
                    <p className="text-[12px] font-medium text-gray-700 tracking-[0.01em] max-w-[240px] truncate">
                      {pdfFileName}
                    </p>
                    <span className="text-[10.5px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                      Click to change
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <IoCloudUploadOutline size={28} />
                    <p className="text-[12px] text-gray-400 tracking-[0.01em]">
                      Click to upload PDF
                    </p>
                    <p className="text-[11px] text-gray-300">PDF format only</p>
                  </div>
                )}
                <input
                  id="productCatalog"
                  type="file"
                  name="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleProductFileCatalog}
                />
              </label>
              {fileError && (
                <p className="text-[11.5px] text-red-500 mt-1.5 tracking-[0.01em]">
                  {fileError}
                </p>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 px-5 py-4 bg-gray-50 border-t border-gray-100">
            <Link
              to="/baltra-admin-dashboard/all/e-catalog-list"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="relative inline-flex items-center gap-1.5 px-4 py-1.5 text-[12.5px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <HiOutlineDocumentText size={13} />
                  Save Catalog
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCatalog;
