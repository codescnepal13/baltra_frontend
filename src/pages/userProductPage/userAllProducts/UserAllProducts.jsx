import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
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

const RippleButton = ({ label, rippleColor, onClick, children }) => {
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

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="w-full py-3 border border-[#d2d0d0] flex justify-center items-center relative overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {isHovered && (
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
            animate={{
              width: 1500,
              height: 700,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Button Text and Children */}
      <span
        className={`relative z-10 text-center text-sm sm:text-base font-normal font-gothamNarrow flex items-center transition-colors ${
          isHovered ? "text-white" : "text-black"
        }`}
      >
        {label}
        {children && <span className="ml-2">{children}</span>}
      </span>
    </motion.button>
  );
};

const STATUS_STYLES = {
  Pending: "bg-gray-600",
  Approved: "bg-green-600",
  Discount: "bg-amber-600",
  Rejected: "bg-red-600",
};

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                {customerAddedList.map((customer) => (
                  <motion.div
                    key={customer.id}
                    whileHover={{
                      boxShadow:
                        "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
                      y: -2,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative w-full h-full border border-gray-200 bg-white rounded-2xl p-4 sm:p-5 flex flex-col"
                  >
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-gray-100 cursor-pointer hover:bg-red-50 hover:text-red-600 rounded-full flex justify-center items-center transition-colors z-10"
                      onClick={() => handleOpenDeleteModal(customer.id)}
                      title="Delete product"
                    >
                      <GoTrash />
                    </button>
                    {openDeleteModal === customer.id && (
                      <DeletePopUpModal
                        key={customer.id}
                        onClose={handleClose}
                        handleDelete={handleDeleteConfirm(customer.id)}
                      />
                    )}

                    {/* Image */}
                    <Link
                      to={`/baltra-user-registered-ProductPage/${customer.id}`}
                      className="w-full flex justify-center items-center"
                    >
                      <div className="w-full aspect-square max-w-[180px] flex items-center justify-center">
                        <img
                          className="w-full h-full object-contain"
                          src={customer.product_image}
                          alt={customer.model_name || "Product"}
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="mt-4 space-y-2 flex-1 font-gothamNarrow">
                      <div className="flex justify-between gap-2 text-[#4A4A4A] font-normal text-sm">
                        <span>Model Name :</span>
                        <span className="font-semibold text-sm text-right truncate">
                          {customer.model_name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2 text-[#4A4A4A] font-normal text-sm">
                        <span>Model Number :</span>
                        <span className="font-semibold text-sm text-right truncate">
                          {customer.model_num}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2 text-[#4A4A4A] font-normal text-sm">
                        <span>Purchase Date :</span>
                        <span className="font-semibold text-sm text-right">
                          {moment(customer.purchase_date).format(
                            "Do MMM, YYYY",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2 text-[#4A4A4A] font-normal text-sm">
                        <span>Serial Number :</span>
                        <span className="font-semibold text-sm text-right truncate">
                          {customer.serial_number}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2 text-[#4A4A4A] font-normal text-sm pt-1">
                        <span>Status :</span>
                        <span
                          className={`text-white text-xs font-semibold px-3 py-1 rounded-full font-gothamNarrow ${
                            STATUS_STYLES[customer?.status] || "bg-gray-600"
                          }`}
                        >
                          {customer?.status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-col gap-2 sm:gap-3">
                      <RippleButton
                        label="Register a Complaint"
                        rippleColor="#202D31"
                        onClick={() => handleRegisteredComplaint(customer)}
                      >
                        <FaArrowRight className="ml-2" />
                      </RippleButton>

                      <RippleButton
                        label="Extend warranty"
                        rippleColor="#202D31"
                        onClick={() => handleExtendWarranty(customer)}
                      >
                        <FaArrowRight className="ml-2" />
                      </RippleButton>
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
