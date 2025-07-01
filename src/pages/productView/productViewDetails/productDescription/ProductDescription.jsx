import React, { useState } from "react";
import ProductSpecification from "./specification/ProductSpecification";
import Sizing from "./sizing/Sizing";
import Usage from "./usage/Usage";

const ProductDescription = ({ singleProduct }) => {
  const [activeTab, setActiveTab] = useState("specification");

  const handleSpecificationClicked = () => {
    setActiveTab("specification");
  };

  const handleSizingClicked = () => {
    setActiveTab("sizing");
  };

  const handleUsageClicked = () => {
    setActiveTab("usage");
  };

  return (
    <div className="bg-white">
      <div className="flex flex-wrap justify-center py-5">
        <div className="flex flex-wrap justify-center space-x-0 sm:space-x-4">
          <button
            className={`w-full sm:w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
              activeTab === "specification"
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
            onClick={handleSpecificationClicked}
          >
            <div className="text-center font-gothamNarrow font-normal">
              Specification
            </div>
          </button>
          <button
            className={`w-full sm:w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
              activeTab === "sizing"
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
            onClick={handleSizingClicked}
          >
            <div className="text-center font-gothamNarrow font-normal">
              Sizing
            </div>
          </button>
          <button
            className={`w-full sm:w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
              activeTab === "usage"
                ? "bg-[#F3232B] text-white"
                : "bg-white border border-[#DDDDDD] text-black"
            }`}
            onClick={handleUsageClicked}
          >
            <div className="text-center font-gothamNarrow font-normal">
              Usage
            </div>
          </button>
        </div>
      </div>
      <div className="flex justify-center p-4">
        {activeTab === "specification" && (
          <ProductSpecification singleProduct={singleProduct} />
        )}
        {activeTab === "sizing" && <Sizing singleProduct={singleProduct} />}
        {activeTab === "usage" && <Usage singleProduct={singleProduct} />}
      </div>
    </div>
  );
};

export default ProductDescription;
