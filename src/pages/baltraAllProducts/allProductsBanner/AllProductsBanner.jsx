import React, { useCallback, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RiceCookerImg from "../../../assets/images/RiceCookerImg.png";
import FanImg from "../../../assets/images/FanImg.png";
import UserProductHeader from "../../userProductPage/userProductHeader/UserProductHeader";
import { baltraSearchProducts } from "../../../redux/features/product/productSlice";
import { useDispatch } from "react-redux";

const AllProductsBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product_name, setProductName] = useState("");

  const handleSearch = useCallback(() => {
    const query = {
      product_name: product_name || "",
    };
    dispatch(baltraSearchProducts(query));

    navigate("/baltra-search-products", {
      state: { query },
    });
  }, [dispatch, product_name, navigate]);

  // Handle input change
  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  // Handle key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="relative w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60">
        <div className="absolute top-0 left-0 w-full z-10">
          <UserProductHeader />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-14 h-auto md:h-[258px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          <img
            src={RiceCookerImg}
            alt="Rice Cooker"
            className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[230px] lg:h-[170px] object-contain"
          />
          <div className="text-white text-center my-4 md:my-0">
            <div className="text-lg sm:text-xl lg:text-3xl 2xl:text-4xl font-medium font-gothamNarrow tracking-wide">
              What are You Looking for?
            </div>
            <div className="text-sm lg:text-base 2xl:text-lg font-gothamNarrow tracking-wide mt-2">
              Empower Your Home, Elevate Your Lifestyle!
            </div>
          </div>
          <img
            src={FanImg}
            alt="Fan"
            className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[190px] object-contain"
          />
        </div>
      </div>
      {/* Search */}
      <div className="flex justify-center relative -top-6 md:-top-10">
        <div className="w-full max-w-[632px] h-12 px-4 bg-white rounded-lg shadow flex items-center gap-4 mt-4 mx-4 sm:mx-auto">
          <FiSearch className="w-4 h-4 text-neutral-600 opacity-50" />
          <input
            type="text"
            placeholder="Search product using name, category or model"
            value={product_name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="grow bg-transparent border-none outline-none text-[#000000] text-sm font-gothamNarrow leading-loose focus:border-red-600"
          />
          <div className="flex items-center gap-2">
            <FiFilter className="text-lg opacity-50 text-zinc-950" />
            <div className="opacity-50 text-zinc-950 text-sm font-gothamNarrow leading-loose">
              Filters
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsBanner;
