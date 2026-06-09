import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addRegisteredComplaint,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import { DistrictsData } from "./districtCityJson/Data";

const AddRegisteredComplaintModal = ({ handleClose, complaintDetails }) => {
  const { isProcessing, error } = useSelector((state) => state.product);
  const { customer } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [complaintValue, setComplaintValue] = useState({
    model_name: complaintDetails?.model_name || "",
    modelCode: complaintDetails?.model_number || "",
    serial_number: complaintDetails?.serial_number || "",
    problem_type: "",
  });

  const { model_name, modelCode, serial_number, problem_type } = complaintValue;

  const [damaged_image, setDamagedImage] = useState(null);
  const [damagedImagePreview, setDamagedImagePreview] = useState("");

  const [damaged_Video, setDamagedVideo] = useState(null);
  const [damagedVideoPreview, setDamagedVideoPreview] = useState("");

  const [warranty_image, setWarrantyImage] = useState(null);
  const [warrantyImagePreview, setWarrantyImagePreview] = useState("");

  const [complaintErr, setComplaintErr] = useState({});

  const [selectedZone, setSelectedZone] = useState("");
  const [zoneAreas, setZoneAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleZoneChange = (e) => {
    const zoneId = parseInt(e.target.value, 10);
    const selectedZoneData = DistrictsData.find((zone) => zone.id === zoneId);
    setSelectedZone(selectedZoneData ? selectedZoneData.zoneName : "");
    setZoneAreas(selectedZoneData ? selectedZoneData.zoneArea : []);
    setSelectedArea("");
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const validatedForm = () => {
    let newErrors = {};
    const requiredFields = ["modelCode", "serial_number"];

    requiredFields.forEach((field) => {
      if (!complaintValue[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    if (!damaged_image) newErrors.damaged_image = "Damaged image is required";
    if (!productDescription)
      newErrors.productDescription = "Complaint remark is required";
    if (!warranty_image)
      newErrors.warranty_image = "Warranty image is required";
    if (!damaged_Video) newErrors.damaged_Video = "Damaged video is required";

    setComplaintErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleWarrantyCardImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setWarrantyImagePreview(reader.result);
        setWarrantyImage(file);
      };
    }
  };

  const handleProductFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDamagedImagePreview(reader.result);
        setDamagedImage(file);
      };
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDamagedVideoPreview(reader.result);
        setDamagedVideo(file);
      };
    }
  };

  const handleDescriptionChange = (value) => {
    setProductDescription(value);
  };

  const removeDescriptionParagraphTags = (desc) =>
    desc.replace(/<p[^>]*>|<\/p>/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      const formData = new FormData();
      const sanitizedDescription =
        removeDescriptionParagraphTags(productDescription);

      formData.append("model_name", model_name);
      formData.append("modelCode", modelCode);
      formData.append("serial_number", serial_number);
      formData.append("problem_type", problem_type);
      formData.append("problem_description", sanitizedDescription);
      formData.append("damaged_image", damaged_image);
      formData.append("damaged_Video", damaged_Video);
      formData.append("warranty_image", warranty_image);
      formData.append("customerAddress", customer?.customerAddress);
      formData.append("customerContact", customer?.contact);
      formData.append("email", customer?.email);
      formData.append(
        "customerName",
        `${customer?.firstname} ${customer?.lastname}`,
      );
      formData.append("zone", selectedZone);
      formData.append("area", selectedArea);

      dispatch(
        addRegisteredComplaint({
          stock_id: complaintDetails?.customerId,
          formData,
          enqueueSnackbar,
          navigate,
        }),
      ).then((result) => {
        if (!result.error) handleClose();
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  /* ── Quill toolbar config ── */
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  /* ── Shared input classes ── */
  const inputBase =
    "w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-600 transition-colors duration-150 bg-white";
  const readonlyInput =
    "w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded bg-gray-50 text-gray-500 cursor-not-allowed";
  const labelBase =
    "block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5";
  const errorText = "mt-1 text-xs text-red-600";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 overflow-y-auto py-8 px-4">
      <div className="relative w-full max-w-2xl bg-white rounded shadow-xl overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 bg-red-600 px-6 py-4">
          <MdOutlineAddHomeWork size={22} className="text-white shrink-0" />
          <h2 className="text-white text-base font-medium tracking-wide flex-1">
            Add Registered Complaint
          </h2>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* ── Red accent line ── */}
        <div className="h-0.5 bg-gradient-to-r from-red-700 via-red-400 to-red-700" />

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* ── Upload row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Damaged image */}
            <div>
              <p className={labelBase}>
                Damaged image{" "}
                <span className="text-red-600 normal-case">*</span>
              </p>
              <label
                htmlFor="damaged_image"
                className={`flex flex-col items-center justify-center h-36 rounded cursor-pointer border-2 border-dashed transition-colors duration-150 overflow-hidden
                  ${
                    damagedImagePreview
                      ? "border-red-300"
                      : "border-red-400 bg-red-50 hover:bg-red-100"
                  }`}
              >
                {damagedImagePreview ? (
                  <img
                    src={damagedImagePreview}
                    alt="Damaged product"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <span className="text-xs font-medium">
                      Upload product photo
                    </span>
                  </div>
                )}
              </label>
              <input
                id="damaged_image"
                type="file"
                name="damaged_image"
                accept="image/*"
                className="hidden"
                onChange={handleProductFileInputChange}
              />
              {complaintErr.damaged_image && (
                <p className={errorText}>{complaintErr.damaged_image}</p>
              )}
            </div>

            {/* Warranty image */}
            <div>
              <p className={labelBase}>
                Warranty card image{" "}
                <span className="text-red-600 normal-case">*</span>
              </p>
              <label
                htmlFor="warranty_image"
                className={`flex flex-col items-center justify-center h-36 rounded cursor-pointer border-2 border-dashed transition-colors duration-150 overflow-hidden
                  ${
                    warrantyImagePreview
                      ? "border-gray-300"
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                {warrantyImagePreview ? (
                  <img
                    src={warrantyImagePreview}
                    alt="Warranty card"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    <span className="text-xs font-medium">
                      Upload warranty card
                    </span>
                  </div>
                )}
              </label>
              <input
                id="warranty_image"
                type="file"
                name="warranty_image"
                accept="image/*"
                className="hidden"
                onChange={handleWarrantyCardImage}
              />
              {complaintErr.warranty_image && (
                <p className={errorText}>{complaintErr.warranty_image}</p>
              )}
            </div>
          </div>

          {/* ── Zone / Area ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Zone</label>
              <select
                value={
                  DistrictsData.find((z) => z.zoneName === selectedZone)?.id ||
                  ""
                }
                onChange={handleZoneChange}
                name="zone"
                className={inputBase}
              >
                <option value="">Select a zone</option>
                {DistrictsData.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.zoneName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelBase}>Area</label>
              <select
                value={selectedArea}
                onChange={handleAreaChange}
                name="area"
                className={inputBase}
              >
                <option value="">Select an area</option>
                {zoneAreas.map((area) => (
                  <option key={area.id} value={area.areaName}>
                    {area.areaName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Model name / Model code ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Model name</label>
              <input
                type="text"
                name="model_name"
                value={complaintValue.model_name}
                onChange={handleInputChange}
                readOnly
                className={readonlyInput}
                placeholder="Rice Cooker"
              />
            </div>
            <div>
              <label className={labelBase}>
                Model code <span className="text-red-600 normal-case">*</span>
              </label>
              <input
                type="text"
                name="modelCode"
                value={complaintValue.modelCode}
                onChange={handleInputChange}
                placeholder="e.g. RC-1500"
                className={`${inputBase} ${complaintErr.modelCode ? "border-red-500" : ""}`}
              />
              {complaintErr.modelCode && (
                <p className={errorText}>{complaintErr.modelCode}</p>
              )}
            </div>
          </div>

          {/* ── Serial number / Problem type ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>
                Serial number{" "}
                <span className="text-red-600 normal-case">*</span>
              </label>
              <input
                type="text"
                name="serial_number"
                value={complaintValue.serial_number}
                onChange={handleInputChange}
                readOnly
                className={readonlyInput}
                placeholder="Serial number"
              />
              {complaintErr.serial_number && (
                <p className={errorText}>{complaintErr.serial_number}</p>
              )}
            </div>
            <div>
              <label className={labelBase}>Problem type</label>
              <input
                type="text"
                name="problem_type"
                value={problem_type}
                onChange={handleInputChange}
                placeholder="e.g. Not heating"
                className={inputBase}
              />
            </div>
          </div>

          {/* ── Complaint remark ── */}
          <div>
            <label className={labelBase}>
              Complaint remark{" "}
              <span className="text-red-600 normal-case">*</span>
            </label>
            <div className="border border-gray-300 rounded overflow-hidden focus-within:border-red-600 transition-colors duration-150">
              <ReactQuill
                theme="snow"
                value={productDescription}
                onChange={handleDescriptionChange}
                modules={quillModules}
                className="baltra-quill"
              />
            </div>
            {complaintErr.productDescription && (
              <p className={errorText}>{complaintErr.productDescription}</p>
            )}
          </div>

          {/* ── Damaged video ── */}
          <div>
            <p className={labelBase}>
              Damaged video <span className="text-red-600 normal-case">*</span>
            </p>
            <label
              htmlFor="damaged_Video"
              className={`flex flex-col items-center justify-center h-24 rounded cursor-pointer border-2 border-dashed transition-colors duration-150 overflow-hidden
                ${
                  damagedVideoPreview
                    ? "border-gray-300"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
            >
              {damagedVideoPreview ? (
                <video
                  src={damagedVideoPreview}
                  controls
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    Upload video of damaged product
                  </span>
                </div>
              )}
            </label>
            <input
              id="damaged_Video"
              type="file"
              name="damaged_Video"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
            {complaintErr.damaged_Video && (
              <p className={errorText}>{complaintErr.damaged_Video}</p>
            )}
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-medium py-3 rounded transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                Submit complaint
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Quill overrides to match Baltra theme ── */}
      <style>{`
        .baltra-quill .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 6px 10px;
        }
        .baltra-quill .ql-container {
          border: none;
          font-size: 14px;
          min-height: 90px;
        }
        .baltra-quill .ql-editor {
          min-height: 90px;
          padding: 10px 14px;
        }
        .baltra-quill .ql-toolbar .ql-stroke { stroke: #6b7280; }
        .baltra-quill .ql-toolbar .ql-fill { fill: #6b7280; }
        .baltra-quill .ql-toolbar button:hover .ql-stroke,
        .baltra-quill .ql-toolbar button.ql-active .ql-stroke { stroke: #dc2626; }
        .baltra-quill .ql-toolbar button:hover .ql-fill,
        .baltra-quill .ql-toolbar button.ql-active .ql-fill { fill: #dc2626; }
      `}</style>
    </div>
  );
};

export default React.memo(AddRegisteredComplaintModal);
