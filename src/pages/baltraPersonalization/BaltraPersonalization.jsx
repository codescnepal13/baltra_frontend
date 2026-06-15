import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../components/layout/metaData/MetaData";
import {
  addBaltraPersonalization,
  clearProductError,
} from "../../redux/features/product/productSlice";

const FONT_OPTIONS = [
  { value: "gothamNarrow", label: "Gotham Narrow" },
  { value: "arial", label: "Arial" },
];

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
    if (!addText.trim()) {
      newErrors.addText = "Please enter your text";
    }

    setPersonalizeErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Ensure text is within limits
  const maxLength = orientation === "vertical" ? 13 : 8;
  const displayText =
    orientation === "vertical" ? addText.slice(0, 13) : addText.slice(0, 8);

  const urlToFile = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      const blob = await response.blob();
      const extension = blob.type.split("/")[1] || "jpg";
      const file = new File([blob], `image.${extension}`, {
        type: blob.type || "image/jpeg",
      });
      return file;
    } catch (err) {
      console.error("urlToFile error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatedForm()) {
      enqueueSnackbar("Please enter valid input", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("text", addText);
    formData.append("font_style", selectedFont);
    formData.append("placement", orientation);
    formData.append("color", selectedColor);
    formData.append("size", selectedSize);
    formData.append("product_id", productId);

    const file = await urlToFile(mainImage);
    if (!file) {
      enqueueSnackbar("Could not load product image. Please try again.", {
        variant: "error",
      });
      return;
    }
    formData.append("main_image", file);

    try {
      await dispatch(addBaltraPersonalization({ formData, enqueueSnackbar }));
      closeModal();
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Baltra personalization" />
      <div className="w-full h-auto flex flex-col items-center bg-white">
        {/* Header */}
        <div className="w-full flex justify-between items-center p-6 md:p-8 bg-gradient-to-r from-[#C871CA] to-[#6F2CFF]">
          <div className="text-white text-lg md:text-2xl font-gothamNarrow font-semibold uppercase text-center flex-grow tracking-wide">
            Give your product your personal touch
          </div>
          <button
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            onClick={handleClose}
            aria-label="Close"
          >
            <FaTimes className="text-white w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 p-6 md:p-8 w-full max-w-5xl">
          {/* Preview */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="text-black text-lg md:text-xl font-gothamNarrow font-semibold uppercase mb-4 self-start">
              Preview
            </div>
            <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl w-full h-[320px] md:h-[460px] flex justify-center items-center overflow-hidden">
              <img
                className="w-36 md:w-52 h-auto drop-shadow-xl select-none"
                src={mainImage}
                alt="Bottle preview"
                draggable={false}
              />

              {/* Text overlay on bottle */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                {displayText &&
                  (orientation === "horizontal" ? (
                    <span
                      className={`text-sm md:text-base font-bold font-${selectedFont} tracking-wider uppercase drop-shadow-md`}
                      style={{ color: "#ffffff" }}
                    >
                      {displayText}
                    </span>
                  ) : (
                    <div
                      className={`flex flex-col items-center leading-[1.15] font-bold font-${selectedFont} uppercase drop-shadow-md`}
                      style={{ color: "#ffffff" }}
                    >
                      {displayText.split("").map((char, index) => (
                        <span key={index} className="text-sm md:text-base">
                          {char}
                        </span>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            {(selectedColor || selectedSize) && (
              <div className="flex items-center gap-3 mt-4 font-gothamNarrow self-start">
                {selectedColor && (
                  <div className="relative w-8 h-8 rounded-full border border-gray-300 shadow-sm">
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white drop-shadow"
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
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {selectedSize && (
                  <div className="border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium text-gray-700">
                    {selectedSize}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Text input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="personalize-text"
                className="text-[#4F4F4F] font-gothamNarrow font-semibold"
              >
                Enter your text
              </label>
              <input
                id="personalize-text"
                type="text"
                className={`w-full outline-none py-2.5 px-3 border rounded-md text-base font-gothamNarrow transition-colors ${
                  personalizeErr.addText
                    ? "border-red-500"
                    : "border-[#C2C2C2] hover:border-orange-500 focus:border-orange-500"
                }`}
                placeholder="eg. Baltra"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                maxLength={maxLength}
              />
              <div className="flex justify-between items-center">
                {personalizeErr.addText ? (
                  <span className="text-red-500 text-sm font-gothamNarrow">
                    {personalizeErr.addText}
                  </span>
                ) : (
                  <p className="text-[#4F4F4F] text-sm font-gothamNarrow">
                    Type the word you want to show on your product
                  </p>
                )}
                <span className="text-[#9CA3AF] text-xs font-gothamNarrow whitespace-nowrap ml-2">
                  {displayText.length}/{maxLength}
                </span>
              </div>
              <p className="text-[#9CA3AF] text-xs font-gothamNarrow">
                Vertical: max 13 characters · Horizontal: max 8 characters
              </p>
            </div>

            {/* Placement Option */}
            <div className="flex flex-col gap-2">
              <div className="text-[#4F4F4F] font-gothamNarrow font-semibold">
                Placement
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="cursor-pointer flex flex-col items-center gap-2"
                  onClick={() => setOrientation("vertical")}
                >
                  <div
                    className={`rounded-lg w-16 h-16 p-2 flex justify-center items-center transition-colors ${
                      orientation === "vertical"
                        ? "border-2 border-orange-500 bg-orange-50"
                        : "border border-[#C2C2C2]"
                    }`}
                  >
                    <div className="text-black text-sm font-gothamNarrow font-light leading-tight">
                      <span className="block leading-none">A</span>
                      <span className="block leading-none">B</span>
                      <span className="block leading-none">C</span>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-gothamNarrow ${
                      orientation === "vertical"
                        ? "text-orange-500 font-semibold"
                        : "text-black"
                    }`}
                  >
                    Vertical
                  </div>
                </button>

                <button
                  type="button"
                  className="cursor-pointer flex flex-col items-center gap-2"
                  onClick={() => setOrientation("horizontal")}
                >
                  <div
                    className={`rounded-lg w-16 h-16 p-2 font-gothamNarrow flex justify-center items-center transition-colors ${
                      orientation === "horizontal"
                        ? "border-2 border-orange-500 bg-orange-50"
                        : "border border-[#C2C2C2]"
                    }`}
                  >
                    ABC
                  </div>
                  <div
                    className={`text-sm font-gothamNarrow ${
                      orientation === "horizontal"
                        ? "text-orange-500 font-semibold"
                        : "text-black"
                    }`}
                  >
                    Horizontal
                  </div>
                </button>
              </div>
            </div>

            {/* Font Selection */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="font-style"
                className="text-[#4F4F4F] font-gothamNarrow font-semibold"
              >
                Select font style
              </label>
              <select
                id="font-style"
                className="w-full p-2.5 border border-[#C2C2C2] hover:border-orange-500 focus:border-orange-500 outline-none rounded-md bg-[#FAFAFA] text-base font-semibold font-gothamNarrow transition-colors"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="relative flex font-gothamNarrow justify-center items-center gap-2 w-full py-3.5 mt-2 bg-gradient-to-r from-[#C871CA] to-[#6F2CFF] text-white font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : (
                <>
                  PERSONALIZE
                  <FaArrowRightLong />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaltraPersonalization;
