import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import MetaData from "../../components/layout/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addBaltraPersonalization,
  clearProductError,
} from "../../redux/features/product/productSlice";

const BaltraPersonalization = ({
  selectedColor,
  selectedSize,
  productId,
  mainImage,
  closeModal,
}) => {
  const { isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [addText, setAddText] = useState("");
  const [orientation, setOrientation] = useState("horizontal");
  const [selectedFont, setSelectedFont] = useState("gothamNarrow");
  const [personalizeErr, setPersonalizeErr] = useState({});

  const handleClose = () => {
    closeModal();
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!addText) {
      newErrors.addText = "Please enter your text";
    }

    setPersonalizeErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to get the vertical text

  const getVerticalText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="block leading-tight font-inter">
        {char}
      </span>
    ));
  };

  // Ensure text is within limits
  const verticalText = addText.slice(0, 13);
  const horizontalText = addText.slice(0, 8);

  const urlToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatedForm()) {
      const formData = new FormData();
      formData.append("text", addText);
      formData.append("font_style", selectedFont);
      formData.append("placement", orientation);
      formData.append("color", selectedColor);
      formData.append("size", selectedSize);
      formData.append("product_id", productId);

      const file = await urlToFile(mainImage);
      formData.append("main_image", file);
      try {
        await dispatch(addBaltraPersonalization({ formData, toast }));
        closeModal();
      } catch (error) {
        toast.error("An error occurred while submitting");
      }
    } else {
      toast.info("Please enter valid input");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra personalization" />
      <div className="w-full h-auto flex flex-col items-center px-4 md:px-8">
        <div className="w-full flex justify-between items-center p-6 md:p-8 bg-gradient-to-r from-[#C871CA] to-[#6F2CFF]">
          <div className="text-white text-lg md:text-2xl font-gothamNarrow uppercase text-center flex-grow">
            Give your product your personal touch
          </div>
          <button className="flex-shrink-0" onClick={handleClose}>
            <FaTimes className="text-white w-6 h-6" />
          </button>
        </div>

        <div className="mt-10 text-black text-xl md:text-2xl font-gothamNarrow font-semibold uppercase">
          Preview
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-6 w-full max-w-5xl">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <div className="bg-gray-200 w-full h-[300px] md:h-[500px] flex justify-center items-center relative">
              <img
                className="w-32 md:w-48 h-auto"
                src={mainImage}
                alt="PreviewImg"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                {orientation === "horizontal" ? (
                  <div
                    className={`absolute text-[#ffffff] text-base md:text-lg font-semibold font-${selectedFont}`}
                  >
                    {horizontalText}
                  </div>
                ) : (
                  <div
                    className={`absolute text-[#ffffff] text-base md:text-lg font-semibold font-${selectedFont} flex flex-col items-center`}
                  >
                    {getVerticalText(verticalText)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="flex flex-col gap-2">
              <div className="text-[#4F4F4F] font-gothamNarrow font-semibold">
                Enter your text
              </div>
              <input
                type="text"
                className="w-full outline-none py-2 px-3 border border-[#C2C2C2] hover:border-orange-500 rounded-sm text-base font-gothamNarrow"
                placeholder="eg. Baltra"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
              />
              {personalizeErr && (
                <span className="text-red-500 text-sm font-gothamNarrow">
                  {personalizeErr.addText}
                </span>
              )}
              <p className="text-[#4F4F4F] text-sm font-gothamNarrow">
                Type the word you want to show on your product
              </p>
              <p className="text-[#4F4F4F] text-sm font-gothamNarrow">
                (Vertical max 13 characters)
              </p>
              <p className="text-[#4F4F4F] text-sm font-gothamNarrow">
                (Horizontal max 8 characters)
              </p>
            </div>

            {/* Placement Option */}
            <div className="flex flex-col gap-2">
              <div className="text-[#4F4F4F] font-gothamNarrow font-semibold">
                Placement
              </div>
              <div className="flex gap-4">
                <div
                  className={`cursor-pointer flex flex-col items-center gap-2 ${
                    orientation === "vertical"
                      ? "border-orange-500"
                      : "border-[#808080]"
                  }`}
                  onClick={() => setOrientation("vertical")}
                >
                  <div
                    className={`border w-16 h-16 p-2 flex justify-center items-center ${
                      orientation === "vertical" ? "border-orange-500" : ""
                    }`}
                  >
                    <div className="texto text-black text-base font-gothamNarrow font-light">
                      <span className="block leading-none">A</span>
                      <span className="block leading-none">B</span>
                      <span className="block leading-none">C</span>
                    </div>
                  </div>
                  <div className="text-sm text-black font-gothamNarrow">
                    Vertical
                  </div>
                </div>

                <div
                  className={`cursor-pointer flex flex-col items-center gap-2 ${
                    orientation === "horizontal"
                      ? "border-orange-500"
                      : "border-[#808080]"
                  }`}
                  onClick={() => setOrientation("horizontal")}
                >
                  <div
                    className={`border w-16 h-16 p-2 font-gothamNarrow flex justify-center items-center ${
                      orientation === "horizontal" ? "border-orange-500" : ""
                    }`}
                  >
                    ABC
                  </div>
                  <div className="text-sm text-black font-gothamNarrow">
                    Horizontal
                  </div>
                </div>
              </div>
            </div>

            {selectedColor && selectedSize && (
              <div className="flex items-center space-x-4 font-gothamNarrow">
                <div className="relative w-8 h-8 rounded-full border border-gray-400">
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: selectedColor }}
                  ></div>

                  {/* Checkmark icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="border border-gray-400 px-4 py-2 text-sm font-medium font-gothamNarrow">
                  {selectedSize}
                </div>
              </div>
            )}

            {/* Font Selection */}
            <div className="flex flex-col gap-2">
              <div className="text-[#4F4F4F] font-gothamNarrow font-semibold">
                Select Font Style
              </div>
              <select
                className="w-full p-2 border border-[#808080] bg-[#FAFAFA] text-base font-bold font-gothamNarrow"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                <option value="gothamNarrow">Gotham Narrow</option>
                <option value="arial">Arial</option>
              </select>
            </div>

            <button
              className="relative flex font-gothamNarrow justify-center items-center gap-2 w-full py-3 bg-gradient-to-r from-[#C871CA] to-[#6F2CFF] text-white rounded-md"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              PERSONALIZE
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaltraPersonalization;
