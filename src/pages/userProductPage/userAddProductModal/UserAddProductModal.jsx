import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  baltraCustomerAdd,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const UserAddProductModal = ({ handleClose }) => {
  const { loading, error, success } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [customerAddValue, setCustomerAddValue] = useState({
    store_name: "",
    store_location: "",
    store_number: "",
    model_num: "",
    model_name: "",
    serial_number: "",
    purchase_date: "",
    warranty_issue: "",
    warranty_expiry: "",
  });

  const {
    store_name,
    store_location,
    store_number,
    model_num,
    model_name,
    serial_number,
    purchase_date,
    warranty_issue,
    warranty_expiry,
  } = customerAddValue;

  const [product_image, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");

  //productBillImage
  const [bill_image_one, setProductBillImage] = useState(null);
  const [productBillImagePreview, setProductBillImagePreview] = useState("");

  //Warranty Card Image
  const [warranty_image, setWarrantyCardImage] = useState(null);
  const [warrantyCardImagePreview, setWarrantyCardImagePreview] = useState("");
  const [customerErr, setCustomerErr] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCustomerAddValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!store_name) {
      newErrors.store_name = "StoreName is required!";
    }
    if (!store_location) {
      newErrors.store_location = "StoreLocation is required!";
    }
    if (!store_number) {
      newErrors.store_number = "StoreNumber is required!";
    }
    if (!model_num) {
      newErrors.model_num = "ModelNumber is required!";
    }
    // if (!warranty_issue) {
    //   newErrors.warranty_issue = "please select warrantyIssue Date!";
    // }
    // if (!warranty_expiry) {
    //   newErrors.warranty_expiry = "please select warrantyExpire Date!";
    // }
    if (!purchase_date) {
      newErrors.purchase_date = "PurchaseDate is required!";
    }
    if (!model_name) {
      newErrors.model_name = "ModelName is required!";
    }
    if (!serial_number) {
      newErrors.serial_number = "SerialNumber is required!";
    }
    if (!product_image) {
      newErrors.product_image = "ProductImage is required!";
    }
    if (!bill_image_one) {
      newErrors.bill_image_one = "BillImage is required!";
    }
    if (!warranty_image) {
      newErrors.warranty_image = "WarrantyImage is required!";
    }

    setCustomerErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWarrantyCardImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setWarrantyCardImagePreview(reader.result);
        setWarrantyCardImage(file);
      };
    }
  };

  const handleBillFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProductBillImagePreview(reader.result);
        setProductBillImage(file);
      };
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProductImagePreview(reader.result);
        setProductImage(file);
      };
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("store_name", store_name);
    formData.append("store_location", store_location);
    formData.append("purchase_date", purchase_date);
    formData.append("store_number", store_number);
    formData.append("serial_number", serial_number);
    formData.append("model_num", model_num);
    formData.append("model_name", model_name);
    formData.append("product_image", product_image);
    formData.append("bill_image_one", bill_image_one);
    formData.append("warranty_image", warranty_image);

    if (validatedForm()) {
      dispatch(baltraCustomerAdd({ formData, toast })).then((result) => {
        if (!result.error) {
          handleClose();
        }
      });
    } else {
      return toast.warn("Invalid Input");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-4xl mx-4 mt-16 bg-white shadow-lg p-6 rounded-lg overflow-y-auto"
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
          <div className="text-[#1A1A1A] text-2xl font-medium leading-6 font-gothamNarrow">
            Add Product
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-8">
          <div className="w-full flex flex-col justify-start items-start gap-5">
            <div className="w-full">
              <span className="text-sm font-gothamNarrow">
                Upload Product Image
              </span>
              <div className="w-full h-56 border border-gray-400 relative mx-auto my-1">
                <label
                  htmlFor="product_image"
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                >
                  {productImagePreview ? (
                    <img
                      src={productImagePreview}
                      alt="profile"
                      className="object-contain w-full font-outfit h-full cursor-pointer"
                    />
                  ) : (
                    <span className="text-sm font-gothamNarrow">
                      Choose Product Image
                    </span>
                  )}
                </label>
                <input
                  id="product_image"
                  type="file"
                  name="product_image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                {customerErr && (
                  <span className="text-sm text-red-600 font-gothamNarrow">
                    {customerErr.product_image}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <span className="text-sm font-gothamNarrow">
                Upload Bill Image
              </span>
              <div className="w-full font-outfit h-56 border border-gray-400 relative mx-auto my-1">
                <label
                  htmlFor="bill_image_one"
                  className="w-full font-outfit h-full flex items-center justify-center cursor-pointer"
                >
                  {productBillImagePreview ? (
                    <img
                      src={productBillImagePreview}
                      alt="profile"
                      className="object-contain w-full font-outfit h-full cursor-pointer"
                    />
                  ) : (
                    <span className="text-sm font-gothamNarrow">
                      Choose Bill Image
                    </span>
                  )}
                </label>
                <input
                  id="bill_image_one"
                  type="file"
                  name="bill_image_one"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBillFileInputChange}
                />
                {customerErr && (
                  <span className="text-sm text-red-600 font-gothamNarrow">
                    {customerErr.bill_image_one}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <span className="text-sm font-gothamNarrow">
                Upload Warranty Card Image
              </span>
              <div className="w-full font-outfit h-56 border border-gray-400 relative mx-auto my-1">
                <label
                  htmlFor="warranty_image"
                  className="w-full font-outfit h-full flex items-center justify-center cursor-pointer"
                >
                  {warrantyCardImagePreview ? (
                    <img
                      src={warrantyCardImagePreview}
                      alt="profile"
                      className="object-contain w-full font-outfit h-full cursor-pointer"
                    />
                  ) : (
                    <span className="text-sm font-gothamNarrow">
                      Choose Warranty Image
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
                {customerErr && (
                  <span className="text-sm text-red-600 font-gothamNarrow">
                    {customerErr.warranty_image}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
            <div className="flex-1 w-full flex flex-col justify-start items-start">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Store Name
              </div>
              <input
                type="text"
                name="store_name"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Store Name"
                value={store_name}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.store_name}
                </span>
              )}
            </div>

            <div className="flex-1 w-full flex flex-col justify-start items-start mt-4 md:mt-0">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Store Location
              </div>
              <input
                type="text"
                name="store_location"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Store Location"
                value={store_location}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.store_location}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
            <div className="flex-1 w-full flex flex-col justify-start items-start">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Product Serial Number
              </div>
              <input
                type="text"
                name="serial_number"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Enter Product Serial Number"
                value={serial_number}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.serial_number}
                </span>
              )}
            </div>

            <div className="flex-1 w-full flex flex-col justify-start items-start mt-4 md:mt-0">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Model Number
              </div>
              <input
                type="text"
                name="model_num"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Model Number"
                value={model_num}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.model_num}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
            <div className="flex-1 w-full flex flex-col justify-start items-start">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Model Name
              </div>
              <input
                type="text"
                name="model_name"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Enter Model Name"
                value={model_name}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.model_name}
                </span>
              )}
            </div>

            <div className="flex-1 w-full flex flex-col justify-start items-start mt-4 md:mt-0">
              <div className="text-black text-sm font-gothamNarrow mb-2">
                Store Number
              </div>
              <input
                type="text"
                name="store_number"
                className="w-full text-black p-3 rounded-sm bg-white border border-[#4B4646] focus:outline-none focus:border-red-600"
                placeholder="Store Number"
                value={store_number}
                onChange={handleChange}
              />
              {customerErr && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {customerErr.store_number}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-4 mb-4 my-5">
            <div className="flex-1 w-full flex flex-col justify-start items-start">
              <div className="w-full">
                <label
                  className="block font-gothamNarrow text-sm text-black mb-2"
                  htmlFor="purchase_date"
                >
                  Purchase Date
                </label>
                <input
                  className="appearance-none w-full font-gothamNarrow text-black p-2 bg-white border border-[#4B4646] rounded-sm py-3 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="purchase_date"
                  name="purchase_date"
                  type="date"
                  value={purchase_date}
                  onChange={handleChange}
                />
                {customerErr && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    {customerErr.purchase_date}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="flex-1 w-full flex flex-col justify-start items-start mt-4 md:mt-0">
              <div className="w-full">
                <label
                  className="block font-gothamNarrow text-sm text-black mb-2"
                  htmlFor="warranty_issue"
                >
                  Warranty Issues
                </label>
                <input
                  className="appearance-none w-full font-gothamNarrow text-black p-2 bg-white border border-[#4B4646] rounded-sm py-3 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
                  id="warranty_issue"
                  name="warranty_issue"
                  type="date"
                  value={warranty_issue}
                  onChange={handleChange}
                />
                {customerErr && (
                  <p className="text-red-600 text-xs font-gothamNarrow">
                    {customerErr.warranty_issue}
                  </p>
                )}
              </div>
            </div> */}
          </div>

          {/* <div className="w-full mt-3">
            <label
              className="block font-gothamNarrow text-sm text-black mb-2"
              htmlFor="warranty_expiry"
            >
              Warranty Expiry
            </label>
            <input
              className="appearance-none w-full font-gothamNarrow text-black p-2 bg-white border border-[#4B4646] rounded-sm py-3 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
              id="warranty_expiry"
              name="warranty_expiry"
              type="date"
              value={warranty_expiry}
              onChange={handleChange}
            />
            {customerErr && (
              <p className="text-red-600 text-xs font-gothamNarrow">
                {customerErr.warranty_expiry}
              </p>
            )}
          </div> */}

          <div className="w-full flex items-center mt-6">
            <button
              type="submit"
              className="relative bg-red-600 hover:bg-red-700 w-full text-white py-3 px-4 font-gothamNarrow rounded-sm focus:outline-none"
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
    </div>
  );
};

export default UserAddProductModal;
