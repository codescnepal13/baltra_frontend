import React, { useEffect } from "react";
import MetaData from "../../../../layout/metaData/MetaData";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomerError,
  getSingleProductView,
} from "../../../../../redux/features/customer/customerSlice";

const SingleCustomerProductList = () => {
  const { loading, error, singleCustomerView } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearCustomerError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductView({ stock_id: id }));
    }
  }, [dispatch, id]);

  if (loading) {
    return <FormSkeleton />;
  }

  if (!singleCustomerView) {
    return <div>No data available</div>;
  }

  const {
    firstname,
    lastname,
    model_name,
    model_num,
    serial_number,
    status,
    store_name,
    store_location,
    store_number,
    purchase_date,
    warranty_issue,
    warranty_expiry,
    product_image,
    warranty_image,
    bill_image_one,
    created_at,
  } = singleCustomerView || {};

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-single-Customer-product-List" />
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-customer-products-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Customer Product List
        </Link>
      </div>
      <div className="font-gothamNarrow bg-[#ffffff] container px-8 py-4 my-5 flex flex-col md:flex-row">
        {/* Left content */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-xl font-semibold font-gothamNarrow">
            Customer Product Information
          </h2>
          <div>
            <span className="font-semibold font-gothamNarrow">Name: </span>
            <span>{`${firstname} ${lastname}`}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Model Name:{" "}
            </span>
            <span>{model_name}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Model Number:{" "}
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
            <span className="font-semibold font-gothamNarrow">Status: </span>
            <span>{status}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Store Name:{" "}
            </span>
            <span>{store_name}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Store Location:{" "}
            </span>
            <span>{store_location}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Store Number:{" "}
            </span>
            <span>{store_number}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Purchase Date:{" "}
            </span>
            <span>{moment(purchase_date).format("dddd, D MMM YYYY")}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Warranty Issue Date:{" "}
            </span>
            <span>{moment(warranty_issue).format("dddd, D MMM YYYY")}</span>
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Warranty Expiry Date:{" "}
            </span>
            <span>{moment(warranty_expiry).format("dddd, D MMM YYYY")}</span>
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
              Product Image:{" "}
            </span>
            <img src={product_image} alt="Product" className="mt-2" />
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Warranty Image:{" "}
            </span>
            <img src={warranty_image} alt="Warranty" className="mt-2" />
          </div>
          <div>
            <span className="font-semibold font-gothamNarrow">
              Bill Image:{" "}
            </span>
            <img src={bill_image_one} alt="Bill" className="mt-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCustomerProductList;
