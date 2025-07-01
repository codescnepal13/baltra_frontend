import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";

const BaltraCompletedCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link to={`/baltra-tracking-ProductDetails/${item.id}`}>
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
            <div className="relative w-full max-w-xs mx-auto h-[465px] border font-gothamNarrow">
              <img
                className="absolute w-56 h-56 top-[23px] left-[50%] transform -translate-x-1/2 object-contain"
                src={item?.damaged_image}
                alt="trackImage"
              />
              <div className="absolute top-[290.32px] left-4 right-4 text-gray-500 text-xs font-gothamNarrow">
                Product type
              </div>
              <div className="absolute top-[324.32px] left-4 right-4 text-gray-700 text-sm font-gothamNarrow">
                <span>Model Name: </span>
                <span className="font-semibold font-gothamNarrow whitespace-nowrap">
                  {item.model_name}
                  <br />
                </span>
                <span>Model Number: </span>
                <span className="font-semibold font-gothamNarrow whitespace-nowrap">
                  {item.model_num}
                  <br />
                </span>
                <span>Job ID: </span>
                <span className="font-semibold font-gothamNarrow whitespace-nowrap">
                  {item.job_no}
                  <br />
                </span>
                <span>Sent for: </span>
                <span className="font-semibold font-gothamNarrow whitespace-nowrap">
                  {item.problem_type}
                  <br />
                </span>
                <span>Complaint Stage: </span>
                <span
                  className={`flex-1 whitespace-nowrap ${
                    item.status === "Un-Assigned"
                      ? "text-red-500"
                      : item.status === "Assigned"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {item.status}
                  <br />
                </span>
                <span>Complaint Date: </span>
                <span className="font-semibold font-gothamNarrow whitespace-nowrap">
                  {moment(item?.date_joined ? item?.date_joined : "").format(
                    "ddd, MMM D, YYYY"
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Link>
    </>
  );
};

export default BaltraCompletedCard;
