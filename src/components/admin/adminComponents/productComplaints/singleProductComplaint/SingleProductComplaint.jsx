import React, { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addCrmContent,
  clearCustomerError,
  getSingleProductComplaint,
} from "../../../../../redux/features/customer/customerSlice";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";
import MetaData from "../../../../layout/metaData/MetaData";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";

const SingleProductComplaint = () => {
  const { loading, error, isError, addCrm, isLoading, productComplaint } =
    useSelector((state) => state.customer);

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

    dispatch(addCrmContent({ CRMConfig, toast }))
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
      toast.error(isError);
      dispatch(clearCustomerError());
    }
  }, [dispatch, isError]);

  if (loading) {
    return <FormSkeleton />;
  }

  if (!productComplaint) {
    return <div>No data available</div>;
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

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-single-product-complaint-List" />
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs text-black font-outfit flex-grow md:text-sm">
          Before adding the data to the CRM, please review all the filled-up
          details carefully. Double-check everything before proceeding. If this
          complaint has already been dispatched to CRM successfully, the
          "Dispatch to CRM" button will be disabled to avoid duplicate entries.
        </p>
      </div>

      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <Link
            to="/baltra-admin-dashboard/all/products-complaints-list"
            className="flex items-center"
          >
            <HiOutlineArrowLeftCircle size={24} className="mr-2" />
            View Product Complaint
          </Link>
          <form onSubmit={handleCrmSubmit}>
            <button
              className={`bg-red-600 ${
                job_no ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-700"
              } text-sm text-white py-3 px-8 rounded font-gothamNarrow flex justify-center items-center`}
              type="submit"
              disabled={isLoading || job_no}
              onClick={handleCrmSubmit}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : job_no ? (
                "DISPATCHED TO CRM"
              ) : (
                "DISPATCH TO CRM"
              )}
            </button>
          </form>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-4">
          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            <div className="font-gothamNarrow bg-[#ffffff] container px-8 py-4 my-5 flex flex-col md:flex-row">
              {/* Left content */}
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold font-gothamNarrow">
                  Product Complaint Information
                </h2>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    CustomerName:{" "}
                  </span>
                  <span>{customer_name}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    CustomerContact:{" "}
                  </span>
                  <span>{customerContact}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    CustomerAddress:{" "}
                  </span>
                  <span>{customerAddress}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    Email:{" "}
                  </span>
                  <span>{email}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    District:{" "}
                  </span>
                  <span>{zone}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    City:{" "}
                  </span>
                  <span>{area}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    Model Name:{" "}
                  </span>
                  <span>{model_name}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    Model Code:{" "}
                  </span>
                  <span>{model_num}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    Serial Number:{" "}
                  </span>
                  <span>{serial_number}</span>
                </div>
                <div>
                  <span className="font-semibold font-gothamNarrow">
                    ComplaintRemark:{" "}
                  </span>
                  <span>{problem_description}</span>
                </div>

                <div>
                  <span className="font-semibold font-gothamNarrow">
                    Created At:{" "}
                  </span>
                  <span>
                    {moment(date_joined).format("dddd, D MMM YYYY, h:mm A")}
                  </span>
                </div>
              </div>

              {/* Right images */}
              <div className="md:w-1/2 space-y-4 md:pl-8">
                {damaged_image_url && (
                  <div>
                    <span className="font-semibold font-gothamNarrow">
                      Damage Product Image:{" "}
                    </span>
                    <img
                      src={damaged_image_url}
                      alt="Product"
                      className="mt-2"
                    />
                  </div>
                )}

                {warranty_image_url && (
                  <div>
                    <span className="font-semibold font-gothamNarrow">
                      Warranty Image:{" "}
                    </span>
                    <img
                      src={warranty_image_url}
                      alt="Warranty"
                      className="mt-2"
                    />
                  </div>
                )}

                {damaged_video_url && (
                  <div>
                    <span className="font-semibold font-gothamNarrow">
                      Damage Video :{" "}
                    </span>
                    <video
                      src={damaged_video_url}
                      alt="Bill"
                      className="mt-2"
                      controls
                      autoPlay
                      loop
                      preload="metadata"
                    >
                      Your browser does not support the video tag
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductComplaint;
