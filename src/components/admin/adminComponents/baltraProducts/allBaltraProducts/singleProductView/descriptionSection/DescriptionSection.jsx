import React, { useState } from "react";
import Specification from "./specification/Specification";
import Sizing from "./sizing/Sizing";
import Usage from "./usage/Usage";

const DescriptionSection = ({ addProduct }) => {
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
    <>
      <div className="bg-[#ffffff]">
        <div className="flex justify-center py-5">
          <div className="flex">
            <button
              className={`w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
                activeTab === "specification"
                  ? "bg-[#F3232B]"
                  : "bg-white border border-[#DDDDDD]"
              }`}
              onClick={handleSpecificationClicked}
            >
              <div
                className={`text-center ${
                  activeTab === "specification" ? "text-white" : "text-black"
                } font-gothamNarrow font-normal break-words`}
              >
                Specification
              </div>
            </button>
            <button
              className={`w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
                activeTab === "sizing"
                  ? "bg-[#F3232B]"
                  : "bg-white border border-[#DDDDDD]"
              }`}
              onClick={handleSizingClicked}
            >
              <div
                className={`text-center ${
                  activeTab === "sizing" ? "text-white" : "text-black"
                } font-gothamNarrow font-normal break-words`}
              >
                Sizing
              </div>
            </button>
            <button
              className={`w-[252.5px] h-[60px] flex justify-center items-center gap-2 ${
                activeTab === "usage"
                  ? "bg-[#F3232B]"
                  : "bg-white border border-[#DDDDDD]"
              }`}
              onClick={handleUsageClicked}
            >
              <div
                className={`text-center ${
                  activeTab === "usage" ? "text-white" : "text-black"
                } font-gothamNarrow font-normal break-words`}
              >
                Usage
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {activeTab === "specification" && (
            <Specification addProduct={addProduct} />
          )}
          {activeTab === "sizing" && <Sizing addProduct={addProduct} />}
          {activeTab === "usage" && <Usage addProduct={addProduct} />}
        </div>
      </div>
    </>
  );
};

export default DescriptionSection;
