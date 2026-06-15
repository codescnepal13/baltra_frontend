import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LazyRelatedImage from "../../../components/layout/lazyRelatedImage/LazyRelatedImage";

const RelatedProductCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
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
        className="h-full"
      >
        <Link
          to={`/baltra-product-view/${item.id}`}
          className="flex flex-col h-full w-full bg-white border border-[#E4E4E4] p-5"
        >
          {/* Image area - fixed height, consistent across all cards */}
          <div className="flex justify-center items-center w-full h-48 shrink-0 mb-6">
            {item?.main_image_url && (
              <LazyRelatedImage url={item.main_image_url} altText={item.name} />
            )}
          </div>

          {/* Details area - grows to fill remaining space */}
          <div className="border-t border-[#E4E4E4] mt-2 pt-2 flex-1 flex flex-col">
            <div className="text-[#4A4A4A] text-xs mt-4 font-gothamNarrow mb-2 space-y-2">
              <div className="line-clamp-1">
                <span className="text-sm">Model Name: </span>
                <span className="font-semibold text-sm">{item.model_name}</span>
              </div>
              <div className="line-clamp-1">
                <span className="text-sm">Model Number: </span>
                <span className="font-semibold text-sm">{item.model_num}</span>
              </div>
              <div className="line-clamp-1">
                <span className="text-sm">Sub Category: </span>
                <span className="font-semibold text-sm">
                  {item.sub_category}
                </span>
              </div>
              <div className="line-clamp-1">
                <span className="text-sm">Warranty: </span>
                <span className="font-semibold text-sm">{item.warranty}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(RelatedProductCard);
