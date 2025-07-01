import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LazyLoadImage from "../../../../components/layout/lazyLoadImage/LazyLoadImage";

const BaltraCategoryBasedCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link to={`/baltra-subCategoryProducts/${item.category_id}`}>
        <AnimatePresence>
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
              boxShadow:
                "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
            className="p-4 bg-gray-200/10 rounded-sm border border-slate-300 flex flex-col justify-between items-center h-full"
          >
            {/* <img
              className="w-full h-48 object-contain"
              src={item.image_url}
              alt={item.name}
            /> */}
            {item?.image_url && <LazyLoadImage url={item?.image_url} />}

            <div className="text-black text-sm font-gothamNarrow leading-snug text-center flex-grow flex items-center">
              {item.name}
            </div>
          </motion.div>
        </AnimatePresence>
      </Link>
    </>
  );
};

BaltraCategoryBasedCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BaltraCategoryBasedCard;
