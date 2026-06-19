import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

const BaltraCompletedCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/baltra-tracking-ProductDetails/${item.id}`}>
      <AnimatePresence>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{
            boxShadow:
              "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
        >
          <div className="w-full max-w-xs mx-auto border font-gothamNarrow flex flex-col">
            <img
              className="w-56 h-56 mx-auto mt-3 object-contain"
              src={item?.damaged_image}
              alt="trackImage"
            />

            <div className="px-4 pt-2 pb-3 text-gray-500 text-xs font-gothamNarrow">
              Product type
            </div>

            <div className="px-4 pb-4 text-gray-700 text-sm font-gothamNarrow space-y-1">
              <p>
                Model Name:{" "}
                <span className="font-semibold whitespace-nowrap">
                  {item.model_name}
                </span>
              </p>
              <p>
                Model Number:{" "}
                <span className="font-semibold whitespace-nowrap">
                  {item.model_num}
                </span>
              </p>
              <p>
                Job ID:{" "}
                <span className="font-semibold whitespace-nowrap text-red-500">
                  {item.job_no}
                </span>
              </p>
              <p>
                Sent for:{" "}
                <span className="font-semibold whitespace-nowrap">
                  {item.problem_type}
                </span>
              </p>
              <p className="flex items-center gap-1">
                Complaint Stage:{" "}
                <span
                  className={`whitespace-nowrap text-xs font-semibold px-2 py-0.5 rounded-full ${
                    item.status === "Un-Assigned"
                      ? "bg-red-100 text-red-500"
                      : item.status === "Completed"
                        ? "bg-green-100 text-green-500"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p>
                Complaint Date:{" "}
                <span className="font-semibold whitespace-nowrap">
                  {moment(item?.date_joined ? item?.date_joined : "").format(
                    "ddd, MMM D, YYYY",
                  )}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

export default BaltraCompletedCard;
