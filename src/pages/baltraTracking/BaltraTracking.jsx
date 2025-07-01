import React from "react";
import BaltraPending from "./baltraPending/BaltraPending";
import MetaData from "../../components/layout/metaData/MetaData";

const BaltraTracking = () => {
  return (
    <>
      <MetaData title="Baltra-tracking-products" />
      <BaltraPending />
    </>
  );
};

export default BaltraTracking;
