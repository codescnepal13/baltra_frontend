import React, { memo, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
      dispatch(addBulkQuote({ data, toast })).then((error) => {
        if (!result.error) {
          QuoteCloseModal();
        }
      });
    } else {
      toast.info("Please correct the errors before submitting!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [error, dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-gothamNarrow">
      <div className="relative bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={QuoteCloseModal}
        >
          <FaTimes size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 font-gothamNarrow">
          Request a Bulk Quote
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Bulk Image */}
          {bulkImage && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 font-gothamNarrow mb-2">
                Selected Image
              </h3>
              <div className="h-48 overflow-y-auto border border-stone-200 rounded-md p-2">
                <img
                  src={bulkImage}
                  alt="Bulk"
                  className="w-full rounded-md object-contain"
                />
              </div>
            </div>
          )}

          {/* Read-only Inputs */}
          {[
            {
              id: "customerName",
              label: "Customer Name",
              value: `${firstname} ${lastname}`,
            },
            { id: "modelName", label: "Model Name", value: model_name },
            { id: "model_num", label: "Model Number", value: model_num },
            { id: "contact", label: "Contact Number", value: contact },
          ].map(({ id, label, value }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 font-gothamNarrow"
              >
                {label}
              </label>
              <input
                type="text"
                id={id}
                value={value}
                readOnly
                className="mt-1 block w-full border border-stone-200 rounded-sm py-4 px-4 focus:outline-none focus:border-red-600"
              />
            </div>
          ))}

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 font-gothamNarrow"
            >
              Quantity
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                readOnly
                className="w-16 text-center border border-stone-200 rounded-sm py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
            {errors.quantity && (
              <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 font-gothamNarrow"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Enter a brief description"
              className="mt-1 block w-full border border-stone-200 rounded-sm py-4 px-4 focus:outline-none focus:border-red-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`relative w-full py-3 rounded-md text-white font-gothamNarrow bg-red-600 hover:bg-red-700`}
            disabled={loading}
          >
            {loading && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              </span>
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(BaltraQuoteModal);
