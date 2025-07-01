import React from "react";

const ProductVaccum = ({ singleProduct }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 my-14 px-4 sm:px-8">
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          className="w-full h-96 sm:h-96 object-contain"
          src={singleProduct?.galleryimageone}
          alt="Baltra Blue Vacuum"
        />
      </div>
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-96 sm:h-96 object-contain"
          src={singleProduct?.galleryimagetwo}
          alt="Baltra Red Vacuum"
        />
      </div>
    </div>
  );
};

export default ProductVaccum;
