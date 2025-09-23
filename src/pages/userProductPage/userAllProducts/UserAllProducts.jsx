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
      whileTap={{ scale: 0.95 }}
      className="w-full py-3 sm:py-3 border border-[#d2d0d0] flex justify-center items-center relative overflow-hidden"
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
        className={`relative z-10 text-center text-sm sm:text-base lg:text-lg font-normal font-gothamNarrow flex items-center ${
          isHovered ? "text-white" : "text-black"
        }`}
      >
        {label}
        {children && <span className="ml-2">{children}</span>}
      </span>
    </motion.button>
  );
};
const UserAllProducts = () => {
  const { isLoading, error, customerAddedList } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedComplaintDetails, setSelectedComplaintDetails] =
    useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
    [dispatch, enqueueSnackbar]
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
        }
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
        <div className="w-full h-auto px-4 sm:px-8 md:px-16 lg:px-32 py-4">
          <h1 className="text-center text-2xl lg:text-5xl font-bold my-4 sm:my-8 font-gothamNarrow">
            My <span className="text-red-600 font-gothamNarrow">Products</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <>
              {customerAddedList && customerAddedList.length > 0 ? (
                customerAddedList.map((customer) => (
                  <AnimatePresence key={customer.id}>
                    <motion.div
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      whileHover={{
                        boxShadow:
                          "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
                        transition: {
                          duration: 0.2,
                          ease: "easeInOut",
                        },
                      }}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      animate={isHovered ? { opacity: 10 } : { opacity: 1 }}
                    >
                      <div
                        key={customer.id}
                        className="relative w-full border border-gray-200 p-4 sm:p-6 rounded-sm flex flex-col"
                      >
                        <button
                          className="absolute top-2 right-2 w-8 h-8 p-1 bg-gray-200 cursor-pointer hover:text-red-600 rounded-full flex justify-center items-center"
                          onClick={() => handleOpenDeleteModal(customer.id)}
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
                        <Link
                          to={`/baltra-user-registered-ProductPage/${customer.id}`}
                        >
                          <div className="w-full flex justify-center mt-4 sm:mt-6">
                            <img
                              className="w-40 h-40 sm:w-56 sm:h-56 object-cover"
                              src={customer.product_image}
                              alt="Image"
                            />
                          </div>
                        </Link>
                        <div className="mt-4 sm:mt-8 space-y-2 flex-1 font-gothamNarrow">
                          <div className="flex justify-between text-[#4A4A4A] font-normal">
                            <span>Model Name :</span>
                            <span className="font-semibold text-sm">
                              {customer.model_name}
                            </span>
                          </div>
                          <div className="flex justify-between text-[#4A4A4A] font-normal">
                            <span>Model Number :</span>
                            <span className="font-semibold text-sm">
                              {customer.model_num}
                            </span>
                          </div>
                          <div className="flex justify-between text-[#4A4A4A] font-normal">
                            <span>Purchase Date :</span>
                            <span className="font-semibold text-sm">
                              {moment(customer.purchase_date).format(
                                "Do MMM, YYYY"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-[#4A4A4A] font-normal">
                            <span>Serial Number :</span>
                            <span className="font-semibold text-sm">
                              {customer.serial_number}
                            </span>
                          </div>

                          <div className="flex justify-between text-[#4A4A4A] font-normal">
                            <span>Status :</span>
                            <span className="font-semibold text-sm">
                              {customer?.status === "Pending" ? (
                                <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer font-gothamNarrow">
                                  Pending
                                </span>
                              ) : customer?.status === "Approved" ? (
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer font-gothamNarrow">
                                  Approved
                                </span>
                              ) : (
                                <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer font-gothamNarrow">
                                  {customer?.status}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 sm:gap-4">
                          <RippleButton
                            label="Register a Complaint"
                            rippleColor="#202D31"
                            className="flex justify-center font-gothamNarrow items-center w-full py-4 px-4 border border-gray-500 text-center text-[#000000] font-normal"
                            onClick={() => handleRegisteredComplaint(customer)}
                          >
                            <FaArrowRight className="ml-2" />
                          </RippleButton>
                          {/* <button
                            className="w-full flex justify-center items-center gap-2 py-4 bg-[#202D31] rounded-sm"
                            onClick={() =>
                              handleRegisteredComplaint(
                                customer.id,
                                customer.status
                              )
                            }
                          >
                            <div className="text-center text-white font-normal font-gothamNarrow">
                              Register a Complaint
                            </div>
                            <FaArrowRight className="text-white" />
                          </button> */}

                          <RippleButton
                            label="Extend warranty"
                            rippleColor="#202D31"
                            className="flex justify-center font-gothamNarrow items-center w-full py-4 px-4 border border-gray-500 text-center text-[#000000] font-normal"
                            onClick={() => handleExtendWarranty(customer)}
                          >
                            <FaArrowRight className="ml-2" />
                          </RippleButton>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))
              ) : (
                <div className="col-span-1 text-center text-gray-500">
                  No Data Found
                </div>
              )}
              {openModal && (
                <AddRegisteredComplaintModal
                  handleClose={() => setOpenModal(false)}
                  complaintDetails={selectedComplaintDetails}
                />
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAllProducts;
