import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import {
  addWarrantyPackage,
  clearAdminError,
  dropdownSubCategoryList,
} from "../../../../../redux/features/admin/adminSlice";

const AddWarrantyPackage = () => {
  const { loading, error, subCategoryList } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [warrantyValue, setWarrantyValue] = useState({
    period: "",
    type: "",
    amt: "",
    subcategory: "",
  });

  const [warrantyErr, setWarrantyErr] = useState({});

  const { period, type, amt, subcategory } = warrantyValue;

  const [offersDesc, setOffersDesc] = useState("");

  const handleOfferChange = (value) => {
    setOffersDesc(value);
  };

  const removeOfferParagraphTags = (offers) => {
    return offers.replace(/<p[^>]*>|<\/p>/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarrantyValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!period) newErrors.period = "Enter Product duration";
    if (!type) newErrors.type = "Enter Package Type";
    if (!amt) newErrors.amt = "Enter Warranty Amount";
    if (!offersDesc) newErrors.offersDesc = "Enter Offers";
    if (!subcategory) newErrors.subcategory = "Please Select SubCategoryName";

    setWarrantyErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      const sanitizedOfferDescription = removeOfferParagraphTags(offersDesc);
      dispatch(
        addWarrantyPackage({
          warrantyValue,
          sanitizedOfferDescription,
          enqueueSnackbar,
          navigate,
        })
      );
    } else {
      enqueueSnackbar("Invalid Input", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    dispatch(dropdownSubCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex justify-between items-center">
        <Link
          to="/baltra-admin-dashboard/all/warranty-package-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add Warranty Package
        </Link>
      </div>

      <div className="container mx-auto px-8 my-5 font-sans">
        <form className="bg-white px-3 py-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 focus:ring-1 focus:ring-sky-200">
            <div>
              <label
                htmlFor="subcategory"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Select Sub Category
              </label>
              <select
                id="subcategory"
                name="subcategory"
                className="w-full font-gothamNarrow my-1 px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={subcategory}
                onChange={handleChange}
              >
                <option value="">Select Sub Category</option>
                {subCategoryList?.length > 0 ? (
                  subCategoryList.map((subcategory) => (
                    <option
                      key={subcategory.subcategory_id}
                      value={subcategory.subcategory_id}
                    >
                      {subcategory.subcategory_name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading categories...</option>
                )}
              </select>
              {warrantyErr.subcategory && (
                <span className="text-xs text-red-600 font-outfit">
                  {warrantyErr.subcategory}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="period"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Duration
              </label>
              <input
                type="text"
                id="period"
                name="period"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter Product Duration"
                value={period}
                onChange={handleChange}
              />
              {warrantyErr.period && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {warrantyErr.period}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="type"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Package Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter Package Type"
                value={type}
                onChange={handleChange}
              />
              {warrantyErr.type && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {warrantyErr.type}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="amt"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Package Price
              </label>
              <input
                type="text"
                id="amt"
                name="amt"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter Serial Number"
                value={amt}
                onChange={handleChange}
              />
              {warrantyErr.amt && (
                <span className="text-sm text-red-600 font-gothamNarrow">
                  {warrantyErr.amt}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="specification"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Package Offers
              </label>
              <div className="my-1">
                <ReactQuill
                  theme="snow"
                  value={offersDesc}
                  onChange={handleOfferChange}
                  className="tex-lg"
                />
                {warrantyErr.offersDesc && (
                  <span className="text-xs text-red-600 font-gothamNarrow">
                    {warrantyErr.offersDesc}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-2 py-2">
            <button
              className="relative bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded font-gothamNarrow"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Save Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(AddWarrantyPackage);
