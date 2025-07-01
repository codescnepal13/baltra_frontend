import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import RedRepairImg from "../../../assets/images/redRapairImg.png";
import TrackingStepper from "../trackingStepper/TrackingStepper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomerError,
  singleTrackingProductByID,
} from "../../../redux/features/customer/customerSlice";
import BaltraSpinner from "../../../components/layout/baltraSpinner/BaltraSpinner";
import moment from "moment";

const ViewBaltraRepairDamage = () => {
  const { loading, error, trackingProduct } = useSelector(
    (state) => state.customer
  );

  const statusColors = {
    "Un-Assigned": "text-red-500",
    "Completed": "text-green-500",
    "Service Center Allocated": "text-yellow-500",
    "Engineer Allocated": "text-blue-500",
    "On Service": "text-blue-500",
    "Cancelled": "text-gray-500",
    "Cancelled Not Approved By Customer": "text-gray-500",
    "Cancelled Not Approved By HO": "text-gray-500",
    "Product Delivered": "text-gray-500",
    "Happy Calling Completed": "text-gray-500",
    "Request For Cancel": "text-gray-500",
    "Request For Close": "text-gray-500",
    "Transfer To Third Party": "text-gray-500",
  };

  const dispatch = useDispatch();
  const warrantyExpiryDate = trackingProduct?.warranty_expiry
    ? moment(trackingProduct?.warranty_expiry)
    : null;

  const isExpired = warrantyExpiryDate && warrantyExpiryDate.isBefore(moment());

  const { complaint_id } = useParams();
  const navigate = useNavigate();
  const handleDownload = (src, label, type) => {
    if (type === "image") {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${label.replace(/\s+/g, "_")}.png`;
        link.click();
      };

      image.onerror = () => {
        alert("Failed to download the image. Please try again.");
      };
    } else if (type === "video") {
      const link = document.createElement("a");
      link.href = src;
      link.download = `${label.replace(/\s+/g, "_")}.mp4`;
      link.click();
    }
  };

  const handleNavigate = () => {
    navigate("/baltra-trackingProducts");
  };

  useEffect(() => {
    if (error) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (complaint_id) {
      dispatch(singleTrackingProductByID({ complaint_id }));
    }
  }, [dispatch, complaint_id]);

  if (loading) {
    return <BaltraSpinner />;
  }

  if (!trackingProduct) {
    return (
      <h1 className="text-center font-semibold font-gothamNarrow">
        No Data Found
      </h1>
    );
  }
  return (
    <>
      <div className="w-full py-12 bg-white shadow-lg rounded-lg px-4 lg:px-32">
        <div className="flex flex-row items-center space-x-4 mb-6">
          <button
            onClick={handleNavigate}
            className="p-3 rounded-full border-2 border-red-600 text-red-600"
          >
            <FaArrowLeftLong />
          </button>
          <div className="text-left">
            <div className="text-xl md:text-2xl font-semibold font-gothamNarrow">
              {trackingProduct?.model_name}
            </div>
            <div className="font-gothamNarrow">
              Job ID: {trackingProduct?.job_no ? trackingProduct?.job_no : "-"}
            </div>
          </div>
        </div>

        <div className="my-10">
          <TrackingStepper trackingProduct={trackingProduct} />
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap gap-x-0 md:gap-x-10">
          {/* Product Card */}
          <div className="w-full md:w-1/2 my-5">
            <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 mb-6 border">
              <div className="flex-shrink-0">
                <img
                  className="w-full sm:w-32 md:w-40 lg:w-56 h-auto sm:h-32 md:h-40 lg:h-56 object-contain"
                  src={trackingProduct?.damaged_image}
                  alt="Product"
                />
              </div>
              <div className="ml-0 md:ml-12 mt-4 md:mt-0 text-center md:text-left w-full">
                <div className="text-lg font-semibold font-gothamNarrow">
                  {trackingProduct?.model_name}
                </div>
                <div className="text-sm text-[#77777E] mb-4 font-gothamNarrow">
                  <span className="font-bold">Model Num:</span>{" "}
                  <span className="font-normal">
                    {trackingProduct?.model_num}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="font-semibold font-gothamNarrow">
                      Job ID
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {trackingProduct?.job_no ? trackingProduct?.job_no : "-"}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Sent for
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {trackingProduct?.problem_type}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Complaint
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {trackingProduct?.problem_description}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Stage
                    </div>
                    <div
                      className={`text-sm font-gothamNarrow whitespace-nowrap ${
                        statusColors[trackingProduct.status] || "text-black"
                      }`}
                    >
                      {trackingProduct.status}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Sent Date
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {trackingProduct?.date_joined}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Damaged Product Images and Video */}
          <div className="w-full md:w-2/5 flex flex-col space-y-4 font-gothamNarrow">
            {[
              {
                type: "image",
                src: trackingProduct?.damaged_image,
                label: "Damaged Product Picture",
              },
              {
                type: "video",
                src: trackingProduct?.damaged_video,
                label: "Damaged Product Video",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-sm p-4 shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold font-gothamNarrow">
                    {item.label}
                  </div>
                  <button
                    onClick={() =>
                      handleDownload(item.src, item.label, item.type)
                    }
                    className="px-4 py-2 bg-[#122F5A] hover:bg-[#152a4a] text-white text-sm font-gothamNarrow"
                  >
                    Download
                  </button>
                </div>
                {item.type === "image" ? (
                  <img
                    className="w-full h-40 md:h-56 object-contain rounded-md"
                    src={item.src}
                    alt={item.label}
                  />
                ) : (
                  <video
                    className="w-full h-40 md:h-56 object-cover rounded-md"
                    controls
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>

          {/* Current Stage */}
          <div className="w-full mx-auto p-6 bg-[#D0D5DD]/20 rounded-lg my-5">
            <div className="flex flex-col mb-6">
              <div className="text-[#1A1A1A] text-xl md:text-2xl font-semibold font-gothamNarrow">
                Current Stage
              </div>
              <div className="text-[#1A1A1A] font-normal font-gothamNarrow">
                Find out which stage your product is in.
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="w-[70px] md:w-[90px] h-[70px] md:h-[90px] rounded-lg"
                src={RedRepairImg}
                alt="Stage"
              />
              <div>
                <div className="text-[#1A1A1A] text-lg font-semibold font-gothamNarrow">
                  {trackingProduct?.status}
                </div>
                <div className="text-[#667085] text-lg font-gothamNarrow">
                  {warrantyExpiryDate
                    ? warrantyExpiryDate.format("ddd, MMM D, YYYY")
                    : "N/A"}
                </div>
              </div>
            </div>
            {!isExpired ? (
              <div className="mt-6 text-[#1A1A1A] text-sm md:text-lg font-gothamNarrow">
                Your repaired item is ready for collection. Please visit our
                service center located in Teku.
              </div>
            ) : (
              <div className="mt-6 text-[#FF0000] text-sm md:text-lg font-gothamNarrow">
                The collection period for your repaired item has expired. Please
                contact our service center for further assistance.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBaltraRepairDamage;
