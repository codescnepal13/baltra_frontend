import React from "react";
import PropTypes from "prop-types";
import SubCategoryLazyImage from "../../../components/layout/subCategoryLazyImage/SubCategoryLazyImage";

const BaltraSubCategorySliderCard = ({ item, isSelected }) => {
  return (
    <div
      className={`p-2 bg-gray-200/10 rounded-lg flex flex-col justify-start items-center 
        ${isSelected ? "border border-slate-200 shadow-sm" : ""}`}
    >
       {/* <img
        className="w-full h-20 sm:h-24 md:h-28 object-contain"
        src={item.image_url}
        alt={item.name}
      />  */}
      <SubCategoryLazyImage url={item?.image_url} />
      <div className="text-black text-xs sm:text-sm font-medium font-gothamNarrow leading-snug text-center">
        {item.name}
      </div>
    </div>
  );
};

BaltraSubCategorySliderCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default BaltraSubCategorySliderCard;
