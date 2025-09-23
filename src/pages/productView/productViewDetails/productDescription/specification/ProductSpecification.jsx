import React from "react";

const ProductSpecification = ({ singleProduct }) => {
  const imagesToDisplay =
    singleProduct?.specification_images?.slice(0, 2) || [];

  return (
    <div className="w-full bg-white py-4">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <p className="text-[#282525] text-sm font-light leading-[27px] break-words font-gothamNarrow mb-2">
          <strong className="font-semibold font-gothamNarrow">
            Specifications
          </strong>
        </p>

        {/* ✅ Render editor content with formatting */}
        <div
          className="text-[#282525] text-sm font-light leading-[27px] break-words font-gothamNarrow ql-editor prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: singleProduct?.specification }}
        />
      </div>

      {/* ✅ Specification images */}
      {imagesToDisplay.length > 0 && (
        <div className="flex flex-col md:flex-row gap-x-6 items-start mt-6 justify-center">
          {imagesToDisplay.map((image, index) => (
            <img
              key={index}
              className="w-full md:w-96 h-auto mb-4 md:mb-0 object-contain"
              src={image?.image_url}
              alt={`SpecificationImg${index + 1}`}
            />
          ))}
        </div>
      )}

      {singleProduct?.specification_images?.[2]?.image_url && (
        <div className="flex justify-center mt-6">
          <img
            className="w-full md:w-96 h-auto object-contain"
            src={singleProduct.specification_images[2].image_url}
            alt="specificationImg3"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductSpecification);
