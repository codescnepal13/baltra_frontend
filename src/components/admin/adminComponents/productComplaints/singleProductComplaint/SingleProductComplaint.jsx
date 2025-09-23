import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import {
  FaBarcode,
  FaCalendarAlt,
  FaCity,
  FaCog,
  FaCommentDots,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileImage,
  FaImage,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaVideo,
} from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCrmContent,
  clearCustomerError,
  getSingleProductComplaint,
} from "../../../../../redux/features/customer/customerSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

const SingleProductComplaint = () => {
  const { loading, error, isError, isLoading, productComplaint } = useSelector(
    (state) => state.customer
  );

  const { job_no } = productComplaint || {};

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleCrmSubmit = (e) => {
    e.preventDefault();

    if (job_no) {
      toast.info("Already dispatched to CRM");
      return;
    }

    const CRMConfig = {
      complaint_id: id,
      customerName: productComplaint.customerName,
      customerContact: productComplaint.customerContact,
      email: productComplaint.email,
      zone: productComplaint.zone,
      customerPincode: "",
      area: productComplaint.area,
      customerAddress: productComplaint.customerAddress,
      modelCode: productComplaint.model_num,
      serialNo: productComplaint.serial_number,
      purchaseDate: productComplaint.purchase_date,
      complaint_remark: productComplaint.problem_description,
      accessKey: import.meta.env.VITE_CRM_ACCESS_KEY,
    };

    dispatch(addCrmContent({ CRMConfig, enqueueSnackbar }))
      .unwrap()
      .catch((error) => {
        console.error("Submission failed:", error);
      });
  };

  useEffect(() => {
    if (error) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductComplaint({ complaint_id: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(isError, {
        variant: "error",
      });
      dispatch(clearCustomerError());
    }
  }, [dispatch, isError]);

  if (loading) {
    return <FormSkeleton />;
  }

  if (!productComplaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-600">Unable to load complaint information.</p>
        </div>
      </div>
    );
  }

  const {
    model_name,
    customer_name,
    customerContact,
    customerAddress,
    problem_description,
    email,
    zone,
    area,
    model_num,
    serial_number,
    damaged_image_url,
    damaged_video_url,
    warranty_image_url,
    date_joined,
  } = productComplaint || {};

  const InfoCard = ({ icon, label, value, className = "" }) => (
    <div
      className={`bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-blue-600 flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-base font-semibold text-gray-900 break-words">
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-single-product-complaint-List" />

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/baltra-admin-dashboard/all/products-complaints-list"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <HiOutlineArrowLeftCircle size={24} className="mr-2" />
              <span>Back to Complaints</span>
            </Link>

            <form onSubmit={handleCrmSubmit}>
              <button
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  job_no
                    ? "bg-green-100 text-green-800 cursor-not-allowed border border-green-300"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
                type="submit"
                disabled={isLoading || job_no}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : job_no ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    DISPATCHED TO CRM
                  </>
                ) : (
                  "DISPATCH TO CRM"
                )}
              </button>
            </form>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaInfoCircle
                className="text-blue-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Notice</p>
                <p>
                  Before adding the data to the CRM, please review all the
                  filled-up details carefully. Double-check everything before
                  proceeding. If this complaint has already been dispatched to
                  CRM successfully, the "Dispatch to CRM" button will be
                  disabled to avoid duplicate entries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Complaint Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Product Complaint Details</h1>
              <p className="text-red-100 mt-1">Complaint ID: #{id}</p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      job_no
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {job_no ? "Dispatched" : "Pending"}
                  </span>
                  {job_no && (
                    <span className="text-sm text-gray-600">
                      Job No: {job_no}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Created on</p>
                  <p className="font-semibold text-gray-900">
                    {moment(date_joined).format("DD MMM YYYY, h:mm A")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaUser />
                  Customer Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <InfoCard
                  icon={<FaUser />}
                  label="Customer Name"
                  value={customer_name}
                />
                <InfoCard
                  icon={<FaPhone />}
                  label="Contact Number"
                  value={customerContact}
                />
                <InfoCard
                  icon={<FaEnvelope />}
                  label="Email Address"
                  value={email}
                />
                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Address"
                  value={customerAddress}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={<FaCity />} label="District" value={zone} />
                  <InfoCard icon={<FaCity />} label="City" value={area} />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaCog />
                  Product Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <InfoCard
                  icon={<FaCog />}
                  label="Model Name"
                  value={model_name}
                />
                <InfoCard
                  icon={<FaCog />}
                  label="Model Code"
                  value={model_num}
                />
                <InfoCard
                  icon={<FaBarcode />}
                  label="Serial Number"
                  value={serial_number}
                />
                <InfoCard
                  icon={<FaCommentDots />}
                  label="Complaint Description"
                  value={problem_description}
                  className="col-span-2"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          {(damaged_image_url || warranty_image_url || damaged_video_url) && (
            <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-purple-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaImage />
                  Complaint Media
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {damaged_image_url && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <FaExclamationTriangle className="text-red-600" />
                        <h3 className="font-semibold text-gray-900">
                          Damaged Product Image
                        </h3>
                      </div>
                      <div className="relative group">
                        <img
                          src={damaged_image_url}
                          alt="Damaged Product"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200 group-hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() =>
                            window.open(damaged_image_url, "_blank")
                          }
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                          <FaImage className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
                        </div>
                      </div>
                    </div>
                  )}

                  {warranty_image_url && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <FaFileImage className="text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          Warranty Image
                        </h3>
                      </div>
                      <div className="relative group">
                        <img
                          src={warranty_image_url}
                          alt="Warranty"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200 group-hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() =>
                            window.open(warranty_image_url, "_blank")
                          }
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                          <FaImage className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
                        </div>
                      </div>
                    </div>
                  )}

                  {damaged_video_url && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <FaVideo className="text-green-600" />
                        <h3 className="font-semibold text-gray-900">
                          Damage Video
                        </h3>
                      </div>
                      <div className="relative">
                        <video
                          src={damaged_video_url}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                          controls
                          preload="metadata"
                          poster=""
                        >
                          Your browser does not support the video tag
                        </video>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-6 py-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaCalendarAlt />
                Complaint Timeline
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Complaint Submitted
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {moment(date_joined).format("dddd, D MMMM YYYY, h:mm A")}
                  </p>
                </div>
              </div>

              {job_no && (
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Dispatched to CRM
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Job Number: {job_no}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductComplaint;
