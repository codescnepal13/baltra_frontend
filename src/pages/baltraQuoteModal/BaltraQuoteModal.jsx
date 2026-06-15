import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addBulkQuote,
  clearProductError,
} from "../../redux/features/product/productSlice";

const BaltraQuoteModal = ({
  model_name,
  model_num,
  bulkImage,
  QuoteCloseModal,
  customer,
}) => {
  const { firstname, lastname, contact } = customer || {};
  const { loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (quantity < 1)
      newErrors.quantity = "Please select at least one bulk quote";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        customer_name: `${firstname} ${lastname}`,
        contact,
        model_name,
        model_num,
        description,
        quantity,
      };
      dispatch(addBulkQuote({ data, enqueueSnackbar })).then((result) => {
        if (!result?.error) {
          QuoteCloseModal();
        }
      });
    } else {
      enqueueSnackbar("Please correct the errors before submitting", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearProductError());
    }
  }, [error, dispatch]);

  const readOnlyFields = [
    {
      id: "customerName",
      label: "Customer Name",
      value: `${firstname || ""} ${lastname || ""}`.trim(),
    },
    { id: "modelName", label: "Model Name", value: model_name },
    { id: "model_num", label: "Model Number", value: model_num },
    { id: "contact", label: "Contact Number", value: contact },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 font-gothamNarrow px-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 font-gothamNarrow">
              Request a Bulk Quote
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details below and our team will get back to you
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-[#E91C1C] transition-colors p-1 rounded-full hover:bg-stone-50"
            onClick={QuoteCloseModal}
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-5 px-6 py-6 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          {/* Bulk Image */}
          {bulkImage && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 font-gothamNarrow mb-2">
                Selected Image
              </h3>
              <div className="h-40 bg-slate-50 border border-stone-200 rounded-xl p-2 flex items-center justify-center">
                <img
                  src={bulkImage}
                  alt="Selected product"
                  className="max-h-full rounded-lg object-contain"
                />
              </div>
            </div>
          )}

          {/* Read-only Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readOnlyFields.map(({ id, label, value }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 font-gothamNarrow mb-1.5"
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={id}
                  value={value}
                  readOnly
                  className="block w-full bg-slate-50 border border-stone-200 rounded-xl py-3 px-4 text-gray-600 text-sm focus:outline-none cursor-default"
                />
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 font-gothamNarrow mb-1.5"
            >
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 text-gray-600 rounded-full border border-stone-200 hover:border-[#E91C1C] hover:text-[#E91C1C] transition-colors"
                aria-label="Decrease quantity"
              >
                <HiOutlineMinus size={16} />
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                readOnly
                className="w-20 text-center border border-stone-200 rounded-xl py-2.5 font-semibold text-gray-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 text-gray-600 rounded-full border border-stone-200 hover:border-[#E91C1C] hover:text-[#E91C1C] transition-colors"
                aria-label="Increase quantity"
              >
                <HiOutlinePlus size={16} />
              </button>
            </div>
            {errors.quantity && (
              <p className="text-sm text-red-600 mt-1.5">{errors.quantity}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 font-gothamNarrow mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Tell us more about your bulk order requirements"
              className={`block w-full border rounded-xl py-3 px-4 text-sm focus:outline-none transition-colors resize-none ${
                errors.description
                  ? "border-red-500"
                  : "border-stone-200 focus:border-[#E91C1C]"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.description}
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="relative w-full py-3.5 rounded-xl text-white font-gothamNarrow font-semibold bg-[#E91C1C] hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              "Submit Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BaltraQuoteModal);
