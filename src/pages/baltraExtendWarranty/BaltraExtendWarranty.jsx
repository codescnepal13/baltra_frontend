import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BalltraExtendWarrantyBanner from "./baltraExtendBanner/BalltraExtendWarrantyBanner";
import BaltraExtendPackage from "./baltraExtendPackage/BaltraExtendPackage";
import MetaData from "../../components/layout/metaData/MetaData";
import {
  clearProductError,
  getSingleBaltraLoyaltyPoints,
} from "../../redux/features/product/productSlice";

const BaltraExtendWarranty = () => {
  const { loading, error, loyaltyProduct } = useSelector(
    (state) => state.product
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSingleBaltraLoyaltyPoints({ stock_id: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra Extended Warranty" />
      <BalltraExtendWarrantyBanner />
      <BaltraExtendPackage loyaltyProduct={loyaltyProduct} loading={loading} />
    </>
  );
};

export default BaltraExtendWarranty;
