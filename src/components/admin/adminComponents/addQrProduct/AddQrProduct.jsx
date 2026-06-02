import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { FaFileExcel, FaQrcode } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addBulkImport,
  addQrProduct,
  clearAdminError,
} from "../../../../redux/features/admin/adminSlice";

const InputField = ({
  id,
  label,
  placeholder,
  value,
  name,
  onChange,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-[11.5px] font-semibold tracking-[0.07em] uppercase text-gray-500"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-3.5 py-2.5 text-[13px] tracking-[0.01em] text-gray-800
        bg-white border rounded-lg outline-none transition-all
        placeholder:text-gray-300
        focus:ring-2 focus:ring-red-500/20 focus:border-red-400
        ${error ? "border-red-400 bg-red-50/40" : "border-gray-200 hover:border-gray-300"}
      `}
    />
    {error && (
      <span className="text-[11px] text-red-500 tracking-[0.02em] flex items-center gap-1">
        <span>·</span> {error}
      </span>
    )}
  </div>
);

const SpinnerIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={`animate-spin ${className}`}
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
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

const AddQrProduct = () => {
  const { loading, isProcessing, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [addQrValue, setAddQrValue] = useState({
    model_name: "",
    model_number: "",
    serial_number: "",
  });
  const [bulkImportFile, setBulkImportFile] = useState(null);
  const [qrProductErr, setQrProductErr] = useState({});

  const { model_name, model_number, serial_number } = addQrValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddQrValue((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (qrProductErr[name]) {
      setQrProductErr((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatedForm = () => {
    const newErrors = {};
    if (!model_name.trim()) newErrors.model_name = "Model name is required";
    if (!model_number.trim())
      newErrors.model_number = "Model number is required";
    if (!serial_number.trim())
      newErrors.serial_number = "Serial number is required";
    setQrProductErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBulkImportChange = (e) => setBulkImportFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(addQrProduct({ addQrValue, enqueueSnackbar, navigate }));
    } else {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
    }
  };

  const handleBulkImport = () => {
    if (!bulkImportFile) {
      toast.error("Please select a file to import");
      return;
    }
    const formData = new FormData();
    formData.append("file", bulkImportFile);
    dispatch(addBulkImport({ formData, enqueueSnackbar, navigate }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/baltra-admin-dashboard/all-QrProducts-list"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-400 hover:text-gray-600 transition-colors mb-2"
          >
            <HiOutlineArrowLeftCircle size={16} />
            Back to QR List
          </Link>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Add QR Product
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Create a single entry or bulk import via Excel
          </p>
        </div>

        {/* Bulk import controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            {bulkImportFile && (
              <span className="text-[11.5px] text-gray-400 tracking-[0.01em] max-w-[140px] truncate">
                {bulkImportFile.name}
              </span>
            )}
            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium tracking-[0.02em] text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer transition-colors">
              <FaFileExcel size={12} />
              Choose Excel
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleBulkImportChange}
              />
            </label>
          </div>

          <button
            onClick={handleBulkImport}
            disabled={isProcessing || !bulkImportFile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium tracking-[0.02em] text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {isProcessing ? (
              <>
                <SpinnerIcon className="h-3.5 w-3.5" />
                Importing...
              </>
            ) : (
              <>
                <FaQrcode size={11} />
                Bulk Import
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6">
        <svg
          className="text-blue-400 mt-0.5 flex-shrink-0 h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-[12px] text-blue-600 tracking-[0.01em] leading-[1.6]">
          Upload a bulk Excel file <strong>or</strong> fill in the fields
          manually below. Each product requires a model name, model number, and
          serial number.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-gray-400">
            Product Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <InputField
              id="model_name"
              name="model_name"
              label="Model Name"
              placeholder="e.g. Baltra Fan BF-200"
              value={model_name}
              onChange={handleChange}
              error={qrProductErr.model_name}
            />
            <InputField
              id="model_number"
              name="model_number"
              label="Model Number"
              placeholder="e.g. BF-200-X"
              value={model_number}
              onChange={handleChange}
              error={qrProductErr.model_number}
            />
            <InputField
              id="serial_number"
              name="serial_number"
              label="Serial Number"
              placeholder="e.g. SN-20240001"
              value={serial_number}
              onChange={handleChange}
              error={qrProductErr.serial_number}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-6 pt-4 flex items-center justify-between">
            <p className="text-[11.5px] text-gray-300 tracking-[0.02em]">
              All fields are required
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.03em] text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="h-3.5 w-3.5" />
                  Saving...
                </>
              ) : (
                <>
                  <FaQrcode size={12} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQrProduct;
