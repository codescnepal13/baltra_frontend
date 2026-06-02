import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FaSyncAlt, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allCustomizedPersonalization,
  clearAdminError,
  deleteCustomizedProduct,
} from "../../../../redux/features/admin/adminSlice";
import MetaData from "../../../layout/metaData/MetaData";
import DeletePersonalizationModal from "./DeletePersonalizationModal";
import UpdateCustomizedModal from "./UpdateCustomizedModal";

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 bg-orange-100 text-orange-500">
      {initials}
    </div>
  );
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status, onClick }) => {
  const map = {
    pending: {
      cls: "bg-amber-50 text-amber-600 border border-amber-100",
      dot: "bg-amber-400",
      label: "Pending",
      clickable: true,
    },
    approved: {
      cls: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      dot: "bg-emerald-400",
      label: "Approved",
      clickable: false,
    },
  };
  const cfg = map[status] ?? {
    cls: "bg-gray-100 text-gray-500 border border-gray-200",
    dot: "bg-gray-400",
    label: status,
    clickable: false,
  };

  return (
    <span
      onClick={cfg.clickable ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-[0.04em] ${cfg.cls} ${
        cfg.clickable
          ? "cursor-pointer hover:opacity-80 transition-opacity"
          : ""
      }`}
      title={cfg.clickable ? "Click to approve" : undefined}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Placement badge ──────────────────────────────────────────────────────────
const PlacementBadge = ({ value }) => {
  if (!value) return <span className="text-gray-300">—</span>;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200 tracking-[0.03em]">
      {value}
    </span>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const AllPersonalizationProductsList = () => {
  const { loading, error, isError, allCustomizedProducts } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();

  const [selectedCustomizeId, setSelectedCustomizedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);
  const [selectPlacement, setSelectPlacement] = useState("All");

  const handleOpenModal = (id) => setSelectedCustomizedId(id);
  const handleCloseModal = () => setSelectedCustomizedId(null);

  const handleOpenCustomizedModal = (item) => {
    setSelectedItem(item);
    setOpenCustomizeModal(true);
  };
  const handleCloseCustomizeModal = () => {
    setOpenCustomizeModal(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomizeId !== null) {
      dispatch(
        deleteCustomizedProduct({
          personalization_id: selectedCustomizeId,
          enqueueSnackbar,
        }),
      );
      setSelectedCustomizedId(null);
    }
  };

  const handleReset = () => {
    setSelectPlacement("All");
    setSelectedCustomizedId(null);
    setSelectedItem(null);
    dispatch(allCustomizedPersonalization({ placement: "" }));
  };

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, isError]);

  useEffect(() => {
    dispatch(
      allCustomizedPersonalization({
        placement: selectPlacement === "All" ? "" : selectPlacement,
      }),
    );
  }, [dispatch, selectPlacement]);

  const COLUMNS = [
    "S.N.",
    "Customer",
    "Product",
    "Image",
    "Text",
    "Placement",
    "Font",
    "Color",
    "Size",
    "Status",
    "Created At",
    "Actions",
  ];

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-all-customized-products" />
      <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
              Personalization Requests
            </h1>
            <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
              Review and approve customer customization orders
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 mb-5">
          <HiOutlineInformationCircle
            size={15}
            className="text-blue-400 flex-shrink-0 mt-0.5"
          />
          <p className="text-[12px] text-blue-600 tracking-[0.01em] leading-relaxed">
            To approve a personalization request, click the{" "}
            <span className="font-semibold">Pending</span> badge in the Status
            column. A popup will appear with the verification and approval
            options.
          </p>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-gray-100">
            {/* Placement filter pills */}
            <div className="flex items-center gap-1">
              {["All", "horizontal", "vertical"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectPlacement(p)}
                  className={`px-2.5 py-1 text-[11px] font-medium tracking-[0.03em] rounded-lg transition-colors capitalize
                    ${
                      selectPlacement === p
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaSyncAlt size={10} />
              Reset
            </button>

            {/* Result count */}
            <span className="ml-auto text-[11px] text-gray-300 tracking-[0.03em]">
              {allCustomizedProducts?.length ?? 0} request
              {allCustomizedProducts?.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full text-[12.5px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {COLUMNS.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center py-10">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-red-500" />
                    </td>
                  </tr>
                ) : allCustomizedProducts &&
                  allCustomizedProducts.length > 0 ? (
                  allCustomizedProducts.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FFF0E5]/60 transition-colors cursor-pointer"
                    >
                      {/* S.N. */}
                      <td className="px-4 py-2.5 text-gray-400 tabular-nums w-10">
                        {index + 1}
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={item.customer_name} />
                          <span className="font-medium text-gray-800 whitespace-nowrap tracking-[0.01em]">
                            {item.customer_name}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap tracking-[0.01em] max-w-[140px] truncate">
                        {item.product_name}
                      </td>

                      {/* Image */}
                      <td className="px-4 py-2.5">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0">
                          {item.main_image ? (
                            <img
                              src={item.main_image}
                              alt={item.product_name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-300">—</span>
                          )}
                        </div>
                      </td>

                      {/* Text */}
                      <td className="px-4 py-2.5 text-gray-600 max-w-[100px] truncate tracking-[0.01em]">
                        {item.text || <span className="text-gray-300">—</span>}
                      </td>

                      {/* Placement */}
                      <td className="px-4 py-2.5">
                        <PlacementBadge value={item.placement} />
                      </td>

                      {/* Font style */}
                      <td
                        className="px-4 py-2.5 text-gray-500 whitespace-nowrap tracking-[0.01em]"
                        style={{ fontFamily: item.font_style ?? "inherit" }}
                      >
                        {item.font_style || (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      {/* Color swatch */}
                      <td className="px-4 py-2.5">
                        {item.color ? (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 rounded-md border border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                              title={item.color}
                            />
                            <span className="text-[11px] text-gray-400 font-mono tracking-wider hidden lg:block">
                              {item.color}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      {/* Size */}
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap tracking-[0.01em]">
                        {item.size || <span className="text-gray-300">—</span>}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5">
                        <StatusBadge
                          status={item.status}
                          onClick={() => handleOpenCustomizedModal(item)}
                        />
                      </td>

                      {/* Created At */}
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap tabular-nums tracking-[0.01em]">
                        {moment(item.created_at).format("D MMM YYYY")}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/baltra-admin-dashboard/single/personalization-view/${item.id}`}
                            className="p-1.5 rounded-lg text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                            title="View details"
                          >
                            <FaEye size={12} />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(item.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                        {selectedCustomizeId === item.id && (
                          <DeletePersonalizationModal
                            onClose={handleCloseModal}
                            onConfirm={handleDeleteConfirm}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center py-14">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <MdOutlineSearch
                            className="text-gray-300"
                            size={16}
                          />
                        </div>
                        <p className="text-[12.5px] text-gray-400 tracking-[0.02em]">
                          No personalization requests found
                        </p>
                        <button
                          onClick={handleReset}
                          className="text-[11.5px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-300 tracking-[0.03em]">
              Showing {allCustomizedProducts?.length ?? 0} result
              {allCustomizedProducts?.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Update modal — rendered outside table */}
      {openCustomizeModal && (
        <UpdateCustomizedModal
          item={selectedItem}
          onClose={handleCloseCustomizeModal}
        />
      )}
    </>
  );
};

export default AllPersonalizationProductsList;
