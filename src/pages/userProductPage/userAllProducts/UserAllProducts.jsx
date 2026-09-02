import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import {
  HiOutlineCalendar,
  HiOutlineHashtag,
  HiOutlineTag,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  allCustomerProducts,
  clearProductError,
  deleteCustomerProduct,
} from "../../../redux/features/product/productSlice";
import AddRegisteredComplaintModal from "../userRegisteredComplaint/AddRegisteredComplaintModal";
import CustomerAddSkeleton from "./customerAddSkeleton/CustomerAddSkeleton";
import DeletePopUpModal from "./deleteModal/DeletePopUpModal";

const RippleButton = ({
  label,
  rippleColor,
  onClick,
  children,
  variant = "secondary",
}) => {
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`w-full py-2.5 flex justify-center items-center relative overflow-hidden rounded-xl transition-colors ${
        isPrimary
          ? "bg-red-600 hover:bg-red-700"
          : "border border-gray-200 bg-white hover:border-gray-300"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {isHovered && !isPrimary && (
          <motion.div
            className="absolute rounded-full"
            style={{
              top: ripplePosition.y,
              left: ripplePosition.x,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
              backgroundColor: rippleColor,
            }}
            animate={{ width: 1500, height: 700, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <span
        className={`relative z-10 text-center text-sm sm:text-[13.5px] font-medium font-gothamNarrow flex items-center gap-1.5 transition-colors ${
          isPrimary ? "text-white" : isHovered ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
        {children}
      </span>
    </motion.button>
  );
};

const STATUS_STYLES = {
  Pending: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Discount: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const STATUS_DOT = {
  Pending: "bg-gray-400",
  Approved: "bg-emerald-500",
  Discount: "bg-amber-500",
  Rejected: "bg-red-500",
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
    <span className="flex items-center gap-1.5 text-[13px] text-gray-400 font-gothamNarrow shrink-0">
      {icon}
      {label}
    </span>
    <span className="text-[13px] font-semibold text-gray-800 text-right truncate font-gothamNarrow">
      {value || "—"}
    </span>
  </div>
);

const UserAllProducts = () => {
  const { isLoading, error, customerAddedList } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedComplaintDetails, setSelectedComplaintDetails] =
    useState(null);

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(id);
  };

  const handleClose = () => {
    setOpenDeleteModal(null);
  };

  const handleDeleteConfirm = useCallback(
    (id) => () => {
      dispatch(deleteCustomerProduct({ id, enqueueSnackbar }));
      handleClose();
    },
    [dispatch, enqueueSnackbar],
  );

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(allCustomerProducts());
  }, [dispatch]);

  const handleRegisteredComplaint = (customer) => {
    if (customer.status === "Approved" || customer.status === "Discount") {
      setSelectedComplaintDetails({
        serial_number: customer.serial_number,
        model_number: customer.model_num,
        model_name: customer.model_name,
        customerId: customer.id,
        customerStatus: customer.status,
      });
      setOpenModal(true);
    } else {
      enqueueSnackbar(
        "You can only register a complaint for products with 'Approved' or 'Discount' status.",
        {
          variant: "error",
        },
      );
    }
  };

  const handleExtendWarranty = (customer) => {
    if (customer.status === "Approved" || customer.status === "Discount") {
      navigate(`/baltra-extended-warranty/${customer.id}`);
    } else {
      enqueueSnackbar("Customer must be Approved to extend the warranty", {
        variant: "error",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomerAddSkeleton />
      ) : (
        <div className="w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-10 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-gothamNarrow">
              My <span className="text-red-600">Products</span>
            </h1>
            <p className="text-center text-sm text-gray-500 mb-8 sm:mb-10 font-gothamNarrow">
              Track warranty status, register complaints, and extend coverage
              for your registered products.
            </p>

            {customerAddedList && customerAddedList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
                {customerAddedList.map((customer) => (
                  <motion.div
                    key={customer.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="group relative w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-red-100/60 transition-shadow duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Delete button */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-100 cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-400 rounded-full flex justify-center items-center transition-colors z-10 shadow-sm"
                      onClick={() => handleOpenDeleteModal(customer.id)}
                      title="Delete product"
                    >
                      <GoTrash size={14} />
                    </button>
                    {openDeleteModal === customer.id && (
                      <DeletePopUpModal
                        key={customer.id}
                        onClose={handleClose}
                        handleDelete={handleDeleteConfirm(customer.id)}
                      />
                    )}

                    {/* Image banner */}
                    <Link
                      to={`/baltra-user-registered-ProductPage/${customer.id}`}
                      className="block w-full bg-gradient-to-br from-gray-50 to-gray-100/60 relative"
                    >
                      {/* Status badge, overlapping the image */}
                      <span
                        className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full font-gothamNarrow ${
                          STATUS_STYLES[customer?.status] ||
                          "bg-gray-100 text-gray-700 ring-1 ring-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            STATUS_DOT[customer?.status] || "bg-gray-400"
                          }`}
                        />
                        {customer?.status}
                      </span>

                      <div className="w-full aspect-[4/3] flex items-center justify-center p-8">
                        <img
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                          src={customer.product_image}
                          alt={customer.model_name || "Product"}
                        />
                      </div>
                    </Link>

                    {/* Body */}
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex-1 flex flex-col">
                      <h3 className="text-[15px] font-bold text-gray-900 font-gothamNarrow truncate mb-0.5">
                        {customer.model_name || "Unnamed product"}
                      </h3>
                      <p className="text-xs text-gray-400 font-gothamNarrow mb-3">
                        {customer.model_num}
                      </p>

                      {/* Details */}
                      <div className="flex-1">
                        <DetailRow
                          icon={
                            <HiOutlineTag size={14} className="text-gray-300" />
                          }
                          label="Model No."
                          value={customer.model_num}
                        />
                        <DetailRow
                          icon={
                            <HiOutlineCalendar
                              size={14}
                              className="text-gray-300"
                            />
                          }
                          label="Purchased"
                          value={
                            customer.purchase_date
                              ? moment(customer.purchase_date).format(
                                  "Do MMM, YYYY",
                                )
                              : null
                          }
                        />
                        <DetailRow
                          icon={
                            <HiOutlineHashtag
                              size={14}
                              className="text-gray-300"
                            />
                          }
                          label="Serial No."
                          value={customer.serial_number}
                        />
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-col gap-2">
                        <RippleButton
                          label="Register a Complaint"
                          rippleColor="#202D31"
                          variant="secondary"
                          onClick={() => handleRegisteredComplaint(customer)}
                        >
                          <FaArrowRight size={11} />
                        </RippleButton>

                        <RippleButton
                          label="Extend Warranty"
                          rippleColor="#8B0000"
                          variant="primary"
                          onClick={() => handleExtendWarranty(customer)}
                        >
                          <FaArrowRight size={11} />
                        </RippleButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <GoTrash className="text-gray-300" size={22} />
                </div>
                <p className="text-base font-semibold text-gray-600 font-gothamNarrow">
                  No products found
                </p>
                <p className="text-sm text-gray-400 mt-1 font-gothamNarrow">
                  Products you register will show up here.
                </p>
              </div>
            )}

            {openModal && (
              <AddRegisteredComplaintModal
                handleClose={() => setOpenModal(false)}
                complaintDetails={selectedComplaintDetails}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAllProducts;
