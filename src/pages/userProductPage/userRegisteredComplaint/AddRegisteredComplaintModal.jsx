import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import {
  addRegisteredComplaint,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    const requiredFields = [
      // "model_name",
      "modelCode",
      "serial_number",
      // "problem_type",
    ];

    requiredFields.forEach((field) => {
      if (!complaintValue[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    if (!damaged_image) newErrors.damaged_image = "Damaged Image is required";
    if (!productDescription)
      newErrors.productDescription = "Complaint Remark is required";

    if (!warranty_image)
      newErrors.warranty_image = "Warranty Image is required";
    if (!damaged_Video) newErrors.damaged_Video = "Damaged Video is required";

    setComplaintErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setComplaintValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
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

  const removeDescriptionParagraphTags = (product_description) => {
    return product_description.replace(/<p[^>]*>|<\/p>/g, "");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validatedForm()) {
  //     const formData = new FormData();
  //     formData.append("model_name", model_name);
  //     formData.append("modelCode", modelCode);
  //     formData.append("serial_number", serial_number);
  //     formData.append("problem_type", problem_type);
  //     formData.append("problem_description", problem_description);
  //     formData.append("damaged_image", damaged_image);
  //     formData.append("damaged_Video", damaged_Video);
  //     formData.append("warranty_image", warranty_image);
  //     formData.append("customerAddress", customer?.customerAddress);
  //     formData.append("district", customer?.district);
  //     formData.append("city", customer?.city);
  //     formData.append("customerContact", customer?.contact);
  //     formData.append("email", customer?.email);
  //     formData.append(
  //       "customerName",
  //       `${customer?.firstname} ${customer?.lastname}`
  //     );

  //     dispatch(
  //       addRegisteredComplaint({
  //         stock_id: customerId,
  //         formData,
  //         toast,
  //         navigate,
  //       })
  //     ).then((result) => {
  //       if (!result.error) {
  //         handleClose();
  //       }
  //     });
  //   }
  // };

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
        `${customer?.firstname} ${customer?.lastname}`
      );
      formData.append("zone", selectedZone);
      formData.append("area", selectedArea);

      dispatch(
        addRegisteredComplaint({
          stock_id: complaintDetails?.customerId,
          formData,
          toast,
          navigate,
        })
      ).then((result) => {
        if (!result.error) {
          handleClose();
        }
      });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div
          className="relative w-full max-w-4xl mx-4 mt-16 bg-white shadow-lg p-6 rounded-sm overflow-y-auto"
          style={{ maxHeight: "90vh" }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 cursor-pointer"
            onClick={handleClose}
          >
            <FaTimes size={24} />
          </button>

          <div className="w-full flex justify-center items-center gap-2.5 mb-4">
            <div className="w-6.5 h-6.5 relative">
              <div className="w-[24.17px] h-[17.98px]">
                <MdOutlineAddHomeWork size={20} />
              </div>
            </div>
            <div className="text-[#1A1A1A] text-xl sm:text-2xl font-medium leading-6 font-gothamNarrow whitespace-nowrap">
              Add Registered Complaint
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="w-full flex flex-col justify-start items-start gap-5">
              <div className="w-full">
                <span className="text-sm font-gothamNarrow">Damaged Image</span>
                <div className="w-full h-56 border border-gray-400 relative mx-auto my-1">
                  <label
                    htmlFor="damaged_image"
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {damagedImagePreview ? (
                      <img
                        src={damagedImagePreview}
                        alt="damagedImagePreview"
                        className="object-contain w-full h-full cursor-pointer"
                      />
                    ) : (
                      <span className="text-sm font-gothamNarrow">
                        Upload a picture of your damaged product
                      </span>
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
                    <span className="text-red-600 text-sm font-gothamNarrow">
                      {complaintErr.damaged_image}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full my-2">
                <span className="text-sm font-gothamNarrow">
                  Warranty Card Image
                </span>
                <div className="w-full h-56 border border-gray-400 relative mx-auto my-1">
                  <label
                    htmlFor="warranty_image"
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {warrantyImagePreview ? (
                      <img
                        src={warrantyImagePreview}
                        alt="warranty_image"
                        className="object-contain w-full h-full cursor-pointer"
                      />
                    ) : (
                      <span className="text-sm font-gothamNarrow">
                        Upload a picture of your warranty card
                      </span>
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
                    <span className="text-red-600 text-sm font-gothamNarrow">
                      {complaintErr.warranty_image}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Select Zones
                </label>
                <select
                  value={
                    DistrictsData.find((zone) => zone.zoneName === selectedZone)
                      ?.id || ""
                  }
                  onChange={handleZoneChange}
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  name="zone"
                >
                  <option value="">Select a Zone</option>
                  {DistrictsData.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.zoneName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Select Area
                </label>
                <select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  name="area"
                >
                  <option value="">Select an Area</option>
                  {zoneAreas.map((area) => (
                    <option key={area.id} value={area.areaName}>
                      {area.areaName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Model Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  placeholder="Rice Cooker"
                  name="model_name"
                  value={complaintValue.model_name}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Model Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  placeholder="Enter model Code"
                  name="modelCode"
                  value={complaintValue.modelCode}
                  onChange={handleInputChange}
                />
                {complaintErr.modelCode && (
                  <span className="text-red-600 text-sm font-gothamNarrow">
                    {complaintErr.modelCode}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-4 mb-4">
              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  placeholder="Enter serial number"
                  name="serial_number"
                  value={complaintValue.serial_number}
                  onChange={handleInputChange}
                  readOnly
                />
                {complaintErr.serial_number && (
                  <span className="text-red-600 text-sm font-gothamNarrow">
                    {complaintErr.serial_number}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col justify-start items-start">
                <label className="text-black text-sm font-gothamNarrow mb-2">
                  Problem Type
                </label>
                <input
                  className="w-full px-4 py-2 bg-white border border-[#4B4646] focus:outline-none focus:border-red-600 rounded-sm"
                  name="problem_type"
                  value={problem_type}
                  placeholder="Enter your problem type"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-gothamNarrow mb-2 block">
                Complaint Remark
              </label>
              <ReactQuill
                theme="snow"
                value={productDescription}
                onChange={handleDescriptionChange}
                className="tex-lg"
              />
              {complaintErr.problem_description && (
                <span className="text-red-600 text-sm">
                  {complaintErr.problem_description}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-4 mb-4">
              <div className="w-full my-2">
                <span className="text-sm font-gothamNarrow">Damaged Video</span>
                <div className="w-full h-56 border border-gray-400 relative mx-auto my-1">
                  <label
                    htmlFor="damaged_Video"
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {damagedVideoPreview ? (
                      <video
                        src={damagedVideoPreview}
                        controls
                        className="object-cover w-full h-full cursor-pointer"
                      />
                    ) : (
                      <span className="text-sm font-gothamNarrow">
                        Upload a video of your damaged product
                      </span>
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
                    <span className="text-red-600 text-sm font-gothamNarrow">
                      {complaintErr.damaged_Video}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-red-600 text-white w-full text-sm px-4 py-3 focus:outline-none font-gothamNarrow rounded-md hover:bg-red-700 relative"
                disabled={isProcessing}
              >
                {isProcessing && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRegisteredComplaintModal;
