import React from "react";

const Sizing = ({ singleProduct }) => {
  const extractListFromUsage = (sizing) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sizing;

    const ulElement = tempDiv.querySelector("ul");
    return ulElement ? Array.from(ulElement.querySelectorAll("li")) : [];
  };

  const sizingText = singleProduct?.sizing?.replace(/<ul>.*<\/ul>/s, "").trim();

  const listItems = extractListFromUsage(singleProduct?.sizing);

  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <div className="text-[#282525] text-sm font-light leading-[27px] font-gothamNarrow">
          <span className="font-semibold">Sizing</span>
          <br />
          <p className="text-[#282525] text-sm font-light leading-[27px] font-gothamNarrow">
            {sizingText}
          </p>

          {listItems.length > 0 && (
            <ul className="mt-4 list-disc pl-6">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className="text-[#282525] text-sm font-light leading-[27px] font-gothamNarrow"
                >
                  {item.textContent}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {singleProduct?.sizing_images[1]?.image_url && (
        <div className="flex justify-center mt-6">
          <img
            className="w-full md:w-80 h-auto object-contain"
            src={singleProduct?.sizing_images[1]?.image_url}
            alt="boxSizeImg"
          />
        </div>
      )}

      <div className="text-[#282525] text-sm font-semibold leading-[27px] font-gothamNarrow text-center md:px-72 mt-6">
        Box Dimension:
      </div>

      {singleProduct?.sizing_images[0]?.image_url && (
        <div className="flex justify-center mt-6">
          <img
            className="w-full md:w-2/5 h-auto object-contain"
            src={singleProduct?.sizing_images[0]?.image_url}
            alt="boxDimensionImg"
          />
        </div>
      )}
    </div>
  );
};

export default Sizing;
