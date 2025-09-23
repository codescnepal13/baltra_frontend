import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
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
  const [catalogue_type, setCatalogType] = useState("");
  const [catalogTypeError, setCatalogTypeError] = useState("");
  const [fileError, setFileError] = useState("");
  const [catalogue_image, setCatalogImage] = useState("");
  const [catalogProductCoverPreview, setCatalogProductCoverPreview] =
    useState(null);

  const handleCatalogCoverFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setCatalogProductCoverPreview(reader.result);
        setCatalogImage(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const handleProductFileCatalog = (e) => {
    const file = e.target.files[0];

    // Validate file type (must be PDF)
    if (file && file.type !== "application/pdf") {
      setFileError("Only PDF files are supported.");
      setProductCatalogPreview(null);
      return;
    } else {
      setFileError("");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProductCatalogPreview(reader.result);
    };

    reader.onerror = () => {
      console.error("There was an error reading the file!");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validate Catalog Type
    if (!catalogue_type.trim()) {
      setCatalogTypeError("Catalog type is required.");
      valid = false;
    } else {
      setCatalogTypeError("");
    }

    // Validate file input
    const fileInput = document.getElementById("productCatalog").files[0];
    if (!fileInput || fileInput.type !== "application/pdf") {
      setFileError("Please upload a valid PDF file.");
      valid = false;
    } else {
      setFileError("");
    }

    if (!valid) return;

    // Create FormData object and append file
    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("catalogue_type", catalogue_type);
    formData.append("catalogue_image", catalogue_image);

    dispatch(addProductCatalog({ formData, enqueueSnackbar, navigate }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs text-black font-outfit flex-grow md:text-sm">
          To add a product catalog, please upload the file in PDF format. Only
          PDF files are supported.
        </p>
      </div>

      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all/e-catalog-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add Product Catalog
        </Link>
      </div>

      <div className="container mx-auto px-8 my-5 font-sans">
        <form className="bg-[#FFFFFF] px-3 py-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="catalogue_type"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Catalog Type
              </label>
              <input
                type="text"
                id="catalogue_type"
                name="catalogue_type"
                className={`w-full font-gothamNarrow my-1 px-4 py-2 border ${
                  catalogTypeError
                    ? "border-red-500"
                    : "border-gray-400 focus:border-red-500"
                } rounded-md focus:outline-none`}
                placeholder="Enter catalog type"
                value={catalogue_type}
                onChange={(e) => setCatalogType(e.target.value)}
              />
              {catalogTypeError && (
                <p className="text-red-600 text-sm mt-1 font-gothamNarrow">
                  {catalogTypeError}
                </p>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add Catalog Cover Image
            </span>
            <div className="w-full font-gothamNarrow h-56 border border-gray-400 relative mx-auto my-1">
              <label
                htmlFor="catalogue_image"
                className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
              >
                {catalogProductCoverPreview ? (
                  <img
                    src={catalogProductCoverPreview}
                    alt="Catalog Cover"
                    className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                  />
                ) : (
                  <span className="font-gothamNarrow">
                    <IoCloudUploadOutline size={24} />
                  </span>
                )}
              </label>
              <input
                id="catalogue_image"
                type="file"
                name="catalogue_image"
                accept="image/*"
                className="hidden"
                onChange={handleCatalogCoverFileInputChange}
              />
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add Product Catalog (File Format must be in PDF)
            </span>
            <div className="w-full font-gothamNarrow h-56 border border-gray-400 relative mx-auto my-1">
              <label
                htmlFor="productCatalog"
                className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
              >
                {productCatalogPreview ? (
                  <div className="text-center">
                    <p>{`Uploaded File: ${
                      document.getElementById("productCatalog").files[0].name
                    }`}</p>
                    <a
                      href={productCatalogPreview}
                      download
                      className="text-blue-600"
                    >
                      Download PDF
                    </a>
                  </div>
                ) : (
                  <span className="font-gothamNarrow">
                    <IoCloudUploadOutline size={24} />
                  </span>
                )}
              </label>
              <input
                id="productCatalog"
                type="file"
                name="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleProductFileCatalog}
              />
            </div>
            {fileError && (
              <p className="text-red-600 text-sm mt-2 font-gothamNarrow">
                {fileError}
              </p>
            )}
          </div>

          <div className="flex justify-center md:justify-start mt-2 py-2">
            <button
              className="relative bg-red-600 hover:bg-red-700 text-sm text-white py-3 px-8 rounded font-gothamNarrow"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Save Catalog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCatalog;
