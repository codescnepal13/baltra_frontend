import React from "react";
import { Link } from "react-router-dom";

const BaltraSearchCard = ({ item, view }) => {
  return (
    <>
      <div
        className={`relative w-full ${
          view === "list"
            ? "flex h-auto border border-[#E4E4E4] p-4 bg-white"
            : "sm:w-[293px] h-auto sm:h-[454px] border border-[#E4E4E4] bg-white"
        }`}
      >
        <Link to={`/baltra-product-view/${item.id}`} className="flex w-full">
          <div
            className={`${
              view === "list"
                ? "w-[180px] h-[175px] flex-shrink-0"
                : "absolute w-[180px] h-[175px] left-1/2 transform -translate-x-1/2 top-8 sm:top-[30.31px]"
            }`}
          >
            <img
              className={`${
                view === "list"
                  ? "w-full h-full object-contain"
                  : "absolute w-full h-full"
              }`}
              src={item?.image_url}
              alt={item.name}
            />
          </div>

          {view === "grid" && (
            <>
              <div className="absolute w-full border-t border-[#E4E4E4] top-[265.32px] sm:top-[265.32px]"></div>
              <div className="absolute left-4 sm:left-[23px] top-[290.32px] text-[#A9A9A9] text-xs font-normal">
                Product Type
              </div>
              <div className="absolute left-4 sm:left-[23px] top-[324.32px] text-[#4A4A4A] text-sm font-normal font-gothamNarrow space-y-2">
                <div>
                  <span>Model Name: </span>
                  <span className="font-semibold">{item.model_name}</span>
                </div>
                <div>
                  <span>Model Number: </span>
                  <span className="font-semibold">{item.model_num}</span>
                </div>
                <div>
                  <span>Power: </span>
                  <span className="font-semibold">{item.power}</span>
                </div>
                <div>
                  <span>Warranty: </span>
                  <span className="font-semibold">{item.warranty}</span>
                </div>
              </div>
            </>
          )}

          {view === "list" && (
            <div className="ml-4 text-[#4A4A4A] text-sm font-normal font-gothamNarrow space-y-2 flex flex-col justify-center">
              <div className="text-[#A9A9A9] text-xs font-normal">
                Product Type
              </div>
              <div>
                <span>Model Name: </span>
                <span className="font-semibold">{item.model_name}</span>
              </div>
              <div>
                <span>Model Number: </span>
                <span className="font-semibold">{item.model_num}</span>
              </div>
              <div>
                <span>Power: </span>
                <span className="font-semibold">{item.power}</span>
              </div>
              <div>
                <span>Warranty: </span>
                <span className="font-semibold">{item.warranty}</span>
              </div>
            </div>
          )}
        </Link>
      </div>
    </>
  );
};

export default BaltraSearchCard;
