import React from "react";

const Specification = ({ addProduct }) => {
  const imagesToDisplay = addProduct?.specification_images?.slice(0, 2) || [];
  const specificationText = addProduct?.specification || "";
  const specifications = specificationText
    .replace(/<\/?ul>/g, "")
    .split(/<\/?li>/)
    .filter((item) => item.trim())
    .map((item) => item.trim());

  return (
    <div className="w-full bg-white py-4">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <p className="text-[#282525] text-base font-semibold leading-[27px] break-words font-gothamNarrow">
          Product Specifications
          <br />
        </p>
        <ul className="list-disc list-inside text-[#282525] text-sm font-light leading-[27px] break-words font-gothamNarrow">
          {specifications.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      {imagesToDisplay.length > 0 && (
        <div className="flex flex-col md:flex-row gap-x-6 items-start mt-6 justify-center">
          {imagesToDisplay.map((image, index) => (
            <img
              key={index}
              className="w-full md:w-96 h-auto mb-4 md:mb-0 object-contain"
              src={image.image_url}
              alt={`SpecificationImg${index + 1}`}
            />
          ))}
        </div>
      )}

      {addProduct?.specification_images?.[2]?.image_url && (
        <div className="flex justify-center mt-6">
          <img
            className="w-full md:w-96 h-auto object-contain"
            src={addProduct?.specification_images[2]?.image_url}
            alt="specificationImg3"
          />
        </div>
      )}
    </div>
  );
};

export default Specification;
