import React from "react";

const Sizing = ({ singleProduct }) => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <div className="text-[#282525] text-sm font-light leading-[27px] font-gothamNarrow">
          <span className="font-semibold">Sizing</span>
          <br />
          <div
            className="text-[#282525] text-sm font-light leading-[27px] break-words font-gothamNarrow ql-editor prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: singleProduct?.sizing }}
          />
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

export default React.memo(Sizing);
