import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LazyImage from "../../../components/layout/lazyImage/LazyImage";

const BaltraCard = ({ item, index }) => {
  return (
    <>
      <Link to={`/baltra-subCategoryProducts/${item.id}`}>
        <div
          className={`p-4 bg-gray-200/10 rounded-lg flex flex-col justify-start items-center gap-4 ${
            index === 0 ? "border border-slate-300" : "border-none"
          }`}
        >
          {/* <img
            className="w-full h-36 object-contain"
            src={item.image_url}
            alt={item.name}
          /> */}

          {item?.image_url && <LazyImage url={item?.image_url} />}
          <div className="text-black font-normal font-gothamNarrow leading-snug text-center">
            {item.name}
          </div>
        </div>
      </Link>
    </>
  );
};

BaltraCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
};

export default BaltraCard;
