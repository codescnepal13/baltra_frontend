import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import warrantyredRegisteredImg from "../../../../assets/images/warrantyRedRegisterdImg.png";
import UserRegisteredStepper from "../userRegisteredStepper/UserRegisteredStepper";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductError,
  SingleUserProductPage,
} from "../../../../redux/features/product/productSlice";
import BaltraSpinner from "../../../../components/layout/baltraSpinner/BaltraSpinner";
import moment from "moment";

const UserRegisteredViewDetails = () => {
  const { loading, error, singleAddedProduct } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  const warrantyExpiryDate = singleAddedProduct?.warranty_expiry
    ? moment(singleAddedProduct?.warranty_expiry)
    : null;

  const isExpired = warrantyExpiryDate && warrantyExpiryDate.isBefore(moment());

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

  useEffect(() => {
    if (id) {
      dispatch(SingleUserProductPage({ stock_id: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  if (loading) {
    return <BaltraSpinner />;
  }

  if (!singleAddedProduct) {
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
          <Link
            to="/baltra-user-ProductPage"
            className="p-3 rounded-full border-2 border-red-600 text-red-600"
          >
            <FaArrowLeftLong />
          </Link>
          <div className="text-left">
            <div className="text-xl md:text-2xl font-semibold font-gothamNarrow">
              {singleAddedProduct?.model_name}
            </div>

            <div className="font-gothamNarrow">
              Job ID:{" "}
              {singleAddedProduct?.job_no ? singleAddedProduct?.job_no : "-"}
            </div>
          </div>
        </div>

        <div className="my-10">
          <UserRegisteredStepper singleAddedProduct={singleAddedProduct} />
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap gap-x-0 md:gap-x-10">
          {/* Product Card */}
          <div className="w-full md:w-1/2 my-5">
            <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 mb-6 border">
              <div className="flex-shrink-0">
                <img
                  className="w-full sm:w-32 md:w-40 lg:w-56 h-auto sm:h-32 md:h-40 lg:h-56 object-cover"
                  src={singleAddedProduct?.product_image}
                  alt="registeredImg"
                />
              </div>
              <div className="ml-0 md:ml-12 mt-4 md:mt-0 text-center md:text-left w-full">
                <div className="text-lg font-semibold font-gothamNarrow">
                  {singleAddedProduct?.model_name}
                </div>
                <div className="text-sm text-[#77777E] mb-4 font-gothamNarrow">
                  Job ID:{" "}
                  {singleAddedProduct?.job_no
                    ? singleAddedProduct?.job_no
                    : "-"}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Model Number
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.model_num}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Serial Number
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.serial_number}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Store Name
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.store_name}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Store Location
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.store_location}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Purchase Date
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.purchase_date
                        ? moment(singleAddedProduct.purchase_date).format(
                            "MMMM Do, YYYY"
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow whitespace-nowrap">
                      Registered Date
                    </div>
                    <div className="text-sm font-gothamNarrow whitespace-nowrap">
                      {singleAddedProduct?.created_at
                        ? moment(singleAddedProduct.created_at).format(
                            "MMMM Do, YYYY"
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Complaint Date
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.date_joined
                        ? moment(singleAddedProduct?.date_joined).format(
                            "MMMM Do, YYYY"
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between xl:space-x-4 2xl:space-x-6">
                    <div className="font-semibold text-sm font-gothamNarrow">
                      Reward Points Earned
                    </div>
                    <div className="text-sm font-gothamNarrow">
                      {singleAddedProduct?.temp_reward
                        ? singleAddedProduct?.temp_reward
                        : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex flex-col space-y-4 font-gothamNarrow">
            {[
             {
              type: "image",
              src: singleAddedProduct?.damaged_image || singleAddedProduct?.product_image,
              label: singleAddedProduct?.damaged_image ? "Damaged Product Picture" : "Product Image",
            },
              {
                type: "image",
                src: singleAddedProduct?.bill_image_one,
                label: "Bill Image",
              },
              {
                type: "image",
                src: singleAddedProduct?.warranty_image,
                label: "Product warranty Image",
              },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold font-gothamNarrow">
                    {item.label}
                  </div>
                  <button
                    className="px-4 py-2 bg-[#122F5A] text-white text-sm font-gothamNarrow"
                    onClick={() =>
                      handleDownload(item.src, item.label, item.type)
                    }
                  >
                    Download
                  </button>
                </div>
                <img
                  className="w-full h-56 object-contain"
                  src={item.src}
                  alt={item.label}
                />
              </div>
            ))}
          </div>

          {/* Current Stage */}
          <div className=" w-full mx-auto p-6 bg-[#D0D5DD]/20 rounded-lg my-5">
            <div className="flex flex-col mb-6">
              <div className="text-[#1A1A1A] text-2xl font-semibold font-gothamNarrow">
                Warranty Status
              </div>
              <div className="text-[#1A1A1A] font-normal">
                Find out the warranty status of your product.
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="w-[90px] h-[90px] rounded-lg"
                src={warrantyredRegisteredImg}
                alt="Stage"
              />
              <div>
                <div className="text-[#1A1A1A] text-lg font-semibold font-gothamNarrow">
                  {isExpired ? "Expired Season" : "Available"}
                </div>
                <div className="text-[#667085] text-lg font-gothamNarrow">
                  {warrantyExpiryDate
                    ? warrantyExpiryDate.format("ddd, MMM D, YYYY")
                    : "N/A"}
                </div>
              </div>
            </div>
            {!isExpired ? (
              <div className="mt-6 text-[#1A1A1A] text-lg font-gothamNarrow">
                Your warranty for your product is still available, valid till{" "}
                {warrantyExpiryDate.format("ddd, MMM D, YYYY")}. For more
                details, visit nearby stores.
              </div>
            ) : (
              <div className="mt-6 text-[#FF0000] text-lg font-gothamNarrow">
                Your product warranty has expired. Please visit nearby stores
                for further assistance.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegisteredViewDetails;
