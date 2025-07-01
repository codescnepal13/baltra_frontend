import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
      >
        <div className="w-full bg-white border border-[#E4E4E4] p-5 my-2 sm:my-0">
          <Link to={`/baltra-product-view/${item.id}`}>
            <div className="flex justify-center items-center w-full h-48 mb-6">
              {item?.main_image_url && (
                <LazyRelatedImage
                  url={item.main_image_url}
                  altText={item.name}
                />
              )}
            </div>

            <div className="border-t border-[#E4E4E4] mt-2 pt-2">
            
              <div className="text-[#4A4A4A] text-xs mt-4 font-gothamNarrow mb-2 space-y-2">
                <div>
                  <span className="text-sm">Model Name: </span>
                  <span className="font-semibold text-sm">{item.model_name}</span>
                </div>
                <div>
                  <span className="text-sm">Model Number: </span>
                  <span className="font-semibold text-sm">{item.model_num}</span>
                </div>
                <div>
                  <span className="text-sm">Sub Category: </span>
                  <span className="font-semibold text-sm">{item.sub_category}</span>
                </div>
                <div>
                  <span className="text-sm">Warranty: </span>
                  <span className="font-semibold text-sm">{item.warranty}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RelatedProductCard;
