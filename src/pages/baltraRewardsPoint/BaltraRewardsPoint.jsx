import React, { useEffect } from "react";
import BaltraRewardBanner from "./baltraRewardBanner/BaltraRewardBanner";
import BaltraHowItWorks from "./baltraHowItWorks/BaltraHowItWorks";
import BaltraTermsAndCondition from "./baltraHowItWorks/baltraTermsAndCondition/BaltraTermsAndCondition";
import BaltraFAQ from "./baltraHowItWorks/baltraFAQ/BaltraFAQ";
import MetaData from "../../components/layout/metaData/MetaData";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductError,
  getRewardPointValue,
} from "../../redux/features/product/productSlice";

const BaltraRewardsPoint = () => {
  const { loading, error, rewardPointValue } = useSelector(
    (state) => state.product
  );

  const { id } = useParams();
  const location = useLocation();
  const { stock_details, warranty_details } = location.state || {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(getRewardPointValue({ stock_id: id }));
    }
  }, [dispatch, id]);
  return (
    <>
      <MetaData title="Baltra Reward Points" />
      <BaltraRewardBanner
        rewardPointValue={rewardPointValue}
        stock_details={stock_details}
        warranty_details={warranty_details}
      />
      <BaltraHowItWorks />
      <BaltraTermsAndCondition />
      <BaltraFAQ />
    </>
  );
};

export default BaltraRewardsPoint;
