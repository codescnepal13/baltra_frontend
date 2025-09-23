import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addBulkImport,
  addQrProduct,
  clearAdminError,
} from "../../../../redux/features/admin/adminSlice";

const AddQrProduct = () => {
  const { loading, isProcessing, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addQrValue, setAddQrValue] = useState({
    model_name: "",
    model_number: "",
    serial_number: "",
  });
  const [bulkImportFile, setBulkImportFile] = useState(null);
  const [qrProductErr, setQrProductErr] = useState({});

  const { model_name, model_number, serial_number } = addQrValue;
  const handleChange = (e) => {
    let { name, value } = e.target;

    setAddQrValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!model_name) {
      newErrors.model_name = "ModelName is required";
    }
    if (!model_number) {
      newErrors.model_number = "ModelNumber is required";
    }
    if (!serial_number) {
      newErrors.serial_number = "Serial Number is required";
    }

    setQrProductErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBulkImportChange = (e) => {
    setBulkImportFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(addQrProduct({ addQrValue, enqueueSnackbar, navigate }));
    } else {
      return enqueueSnackbar("Invalid Input", {
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
        <p className="text-xs md:text-sm text-black font-outfit flex-grow">
          To add a Baltra QR product, you can either upload a bulk Excel file or
          fill in the fields below. Make sure to add the model name, model
          number, and serial number before confirming your choice.
        </p>
      </div>
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex justify-between items-center">
        <Link
          to="/baltra-admin-dashboard/all-QrProducts-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add QR Product
        </Link>
        <div className="flex items-center space-x-4">
          <label className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition cursor-pointer">
            <input
              type="file"
              name="file"
              className="hidden"
              onChange={handleBulkImportChange}
            />
            Choose File (Excel)
          </label>
          {bulkImportFile && (
            <span className="text-gray-700">{bulkImportFile.name}</span>
          )}
          <button
            className="flex items-center font-gothamNarrow bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            disabled={isProcessing}
            onClick={handleBulkImport}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Importing...</span>
              </div>
            ) : (
              "Bulk Import"
            )}
          </button>
        </div>
      </div>
      <div className="container mx-auto px-8 my-5 font-sans">
        <form className="bg-[#FFFFFF] px-3 py-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  focus:ring-1 focus:ring-sky-200">
            <div>
              <label
                htmlFor="model_name"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Model Name
              </label>
              <input
                type="text"
                id="model_name"
                name="model_name"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Model Name"
                value={model_name}
                onChange={handleChange}
              />
              {qrProductErr && (
                <span className="text-sm text-red-600 font-gothamNarrow ">
                  {qrProductErr.model_name}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="model_number"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Model Number
              </label>
              <input
                type="text"
                id="model_number"
                name="model_number"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Model Number"
                value={model_number}
                onChange={handleChange}
              />
              {qrProductErr && (
                <span className="text-sm text-red-600 font-gothamNarrow ">
                  {qrProductErr.model_number}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="serial_number"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Serial Number
              </label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Serial Number"
                value={serial_number}
                onChange={handleChange}
              />
              {qrProductErr && (
                <span className="text-sm text-red-600 font-gothamNarrow ">
                  {qrProductErr.serial_number}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-2 py-2">
            <button
              className="relative bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded font-gothamNarrow"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Save Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQrProduct;
