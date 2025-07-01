import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAdminError,
  verifiedBulkQuoteProduct,
} from "../../../../../redux/features/admin/adminSlice";

const BulkStatusModal = ({ item, onClose }) => {
  const { isProcessing, error } = useSelector((state) => state.admin);
  const { quote_id } = item || {};
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    if (!status) {
      toast.warning("Please select a status!");
      return;
    }

    const data = {
      action: status.toLowerCase(),
    };

    await dispatch(verifiedBulkQuoteProduct({ quote_id, data, toast }));
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

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
            handleUpdate();
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
              <option value="">Choose Status</option>
              <option value="approve">Approve (✓)</option>
              <option value="reject">Reject (X)</option>
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
              disabled={isProcessing}
            >
              {isProcessing && (
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

export default BulkStatusModal;
