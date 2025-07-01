import React, { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  singlePersonalizationView,
} from "../../../../../redux/features/admin/adminSlice";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";
import MetaData from "../../../../layout/metaData/MetaData";

const SinglePersonalizationView = () => {
  const { loading, error, personalizationSingleView } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(singlePersonalizationView({ personalization_id: id }));
    }
  }, [dispatch, id]);

  if (loading) {
    return <FormSkeleton />;
  }

  if (!personalizationSingleView) {
    return <div>No data available</div>;
  }

  const {
    customer_name,
    product_name,
    text,
    placement,
    font_style,
    color,
    size,
    status,
    main_image,
    created_at,
  } = personalizationSingleView || {};

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-single-personalization-product-view" />
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all/customize-products"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Customize Product List
        </Link>
      </div>
      <div className="font-gothamNarrow bg-[#ffffff] container px-8 py-4 my-5 flex flex-col md:flex-row">
        {/* Left content */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-semibold font-gothamNarrow">
            Customer Personalize Product Information
          </h2>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Customer Name:{" "}
            </span>
            <span>{customer_name}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Product Name:{" "}
            </span>
            <span>{product_name}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Product Text:{" "}
            </span>
            <span>{text}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">Placement: </span>
            <span>{placement}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold font-gothamNarrow">Color:</span>
            {color ? (
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            ) : (
              "-"
            )}
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Product Size:{" "}
            </span>
            <span>{size}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Font Style:{" "}
            </span>
            <span>{font_style}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">Status: </span>
            {status === "pending" ? (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer">
                Pending
              </span>
            ) : status === "approved" ? (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer">
                Approved
              </span>
            ) : (
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-pointer">
                {status}
              </span>
            )}
          </div>

          <div>
            <span className="font-semibold font-gothamNarrow">
              Created At:{" "}
            </span>
            <span>{moment(created_at).format("dddd, D MMM YYYY, h:mm A")}</span>
          </div>
        </div>

        {/* Right images */}
        <div className="md:w-1/2 space-y-4 md:pl-8">
          <div>
            <span className="font-semibold font-gothamNarrow">
              Personalize Image:{" "}
            </span>
            <img src={main_image} alt="Product" className="mt-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePersonalizationView;
