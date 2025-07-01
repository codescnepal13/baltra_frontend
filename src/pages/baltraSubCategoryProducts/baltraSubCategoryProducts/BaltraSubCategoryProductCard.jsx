import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SubCategoryImageBased from "../../../components/layout/SubCategoryImageBased/SubCategoryImageBased";

const BaltraSubCategoryProductCard = ({ item, view }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
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
          <div
            className={`relative font-gothamNarrow ${
              view === "grid"
                ? "w-full h-auto sm:h-auto"
                : "flex flex-row sm:h-[200px]"
            } border border-gray-300 bg-white p-4`}
          >
            <Link
              to={`/baltra-product-view/${item.id}`}
              className={`${
                view === "list" ? "flex flex-row items-center" : ""
              }`}
            >
              <div
                className={`relative ${
                  view === "grid"
                    ? "w-[150px] sm:w-[180px] h-[150px] sm:h-[175px] mx-auto mb-4"
                    : "w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] flex-shrink-0"
                }`}
              >
                {/* <img
                  className="w-full h-full object-contain"
                  src={item?.main_image_url}
                  alt={item.name}
                /> */}
                <SubCategoryImageBased url={item?.main_image_url} />
              </div>
              <div
                className={`${
                  view === "grid"
                    ? "mt-4"
                    : "flex flex-col justify-between ml-4"
                }`}
              >
                {view === "grid" && (
                  <div className="border-t border-gray-300 my-4"></div>
                )}
             
                <div
                  className={`text-gray-700 text-sm sm:text-base font-normal mt-2 ${
                    view === "grid" ? "space-y-2" : "space-y-1"
                  }`}
                >
                  <div>
                    <span className="text-sm">Model Name: </span>
                    <span className="font-semibold text-sm">{item.model_name}</span>
                  </div>
                  <div>
                    <span className="text-sm">Model Number: </span>
                    <span className="font-semibold text-sm">{item.model_no}</span>
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
    </>
  );
};

export default BaltraSubCategoryProductCard;
