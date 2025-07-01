import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomerError,
  verifiedCustomerProduct,
} from "../../../../../redux/features/customer/customerSlice";
import { toast } from "react-toastify";

const UpdateModal = ({ item, onClose, verificationSuccess }) => {
  const { isLoading, error } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(item.status || "");

  const handleUpdate = async (id) => {
    let data;

    if (status === "Verified") {
      data = {
        stock_id: id,
        status: "Approved",
      };
    } else if (status === "With Discount(%)") {
      data = {
        stock_id: id,
        status: "Discount",
      };
    }

    await dispatch(verifiedCustomerProduct({ data, toast }));
    if (verificationSuccess) {
      onClose();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCustomerError());
    }
  }, [error, dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 font-gothamNarrow">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">
            Update Status
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(item.id);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verify Status
            </label>
            <select
              className="appearance-none text-sm font-gothamNarrow block w-full bg-neutral-50 text-neutral-600 border border-stone-300 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:border-red-600 tracking-normal"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="With Discount(%)">With Discount(%)</option>
              <option value="Verified">Verified(✓)</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-gothamNarrow"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-gothamNarrow relative"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
