import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";

const BaltraTrackingCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const statusColors = {
    "Un-Assigned": "text-red-500",
    "Completed": "text-green-500",
    "Service Center Allocated": "text-yellow-500",
    "Engineer Allocated": "text-blue-500",
    "On Service": "text-blue-500",
    "Cancelled": "text-gray-500",
    "Cancelled Not Approved By Customer": "text-gray-500",
    "Cancelled Not Approved By HO": "text-gray-500",
    "Product Delivered": "text-gray-500",
    "Happy Calling Completed": "text-gray-500",
    "Request For Cancel": "text-gray-500",
    "Request For Close": "text-gray-500",
    "Transfer To Third Party": "text-gray-500",
  };

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
            <div className="p-4 bg-white rounded-md border border-[#DDDDDD] flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
              <img
                className="w-full sm:w-32 md:w-40 lg:w-56 h-auto sm:h-32 md:h-40 lg:h-56 object-contain"
                src={item.damaged_image}
                alt="TrackingCardImg"
              />
              <div className="flex flex-col w-full py-2">
                {/* Container for labels and values */}
                <div className="flex flex-col space-y-2">
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Model Name:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {item.model_name}
                    </div>
                  </div>
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Model Code:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {item.model_num}
                    </div>
                  </div>
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Job ID:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {item.job_no ? item.job_no : "-"}
                    </div>
                  </div>
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Sent for:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {item.problem_type}
                    </div>
                  </div>
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Complaint:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {item.problem_description}
                    </div>
                  </div>
                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Complaint Stage:
                    </div>
                    <div
                      className={`flex-1 lg:ml-14 whitespace-nowrap ${
                        statusColors[item.status] || "text-black"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className="flex text-black text-sm lg:font-normal font-gothamNarrow">
                    <div className="font-semibold w-40 sm:w-1/2 lg:w-1/3 whitespace-nowrap">
                      Complaint Date:
                    </div>
                    <div className="flex-1 lg:ml-14 whitespace-nowrap">
                      {moment(
                        item?.date_joined ? item?.date_joined : ""
                      ).format("ddd, MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Link>
    </>
  );
};

export default BaltraTrackingCard;
