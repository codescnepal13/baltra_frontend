import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import {
  addSubCategory,
  clearAdminError,
  dropdownCategory,
} from "../../../../../../redux/features/admin/adminSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";

const AddSubCategory = () => {
  const { loading, error, dropdownCategories } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [subCategoryImagePreview, setSubCategoryImagePreview] = useState(null);

  const handleSubCategoryFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setSubCategoryImagePreview(reader.result);
        setImage(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category_id", data.category_id);
    if (image) formData.append("image", image);

    dispatch(addSubCategory({ formData, toast, navigate }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
    dispatch(dropdownCategory());
  }, [dispatch, error]);

  return (
    <>
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs md:text-sm text-black font-outfit flex-grow">
          To properly add a sub-category product, first select the category
          carefully, then add the sub-category name and image before confirming
          your choice.
        </p>
      </div>
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-sub-category-List"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add SubCategory
        </Link>
      </div>
      <div className="container mx-auto px-8 my-5 font-sans">
        <form
          className="bg-[#FFFFFF] px-3 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 focus:ring-1 focus:ring-sky-200">
            <div>
              <label
                htmlFor="category_id"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Select Category
              </label>
              <select
                id="category_id"
                name="category_id"
                className="w-full font-gothamNarrow my-1 px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                {...register("category_id", {
                  required: "Category is required",
                })}
              >
                <option value="">Select a category</option>
                {dropdownCategories && dropdownCategories.length > 0 ? (
                  dropdownCategories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading categories...</option>
                )}
              </select>
              {errors.category_id && (
                <span className="text-red-600 text-xs font-gothamNarrow">
                  {errors.category_id.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                SubCategory Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter subCategory Name"
                {...register("name", {
                  required: "SubCategory name is required",
                })}
              />
              {errors.name && (
                <span className="text-red-600 text-xs font-gothamNarrow">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add SubCategory Image
            </span>
            <div className="w-full font-gothamNarrow h-56 border border-gray-400 relative mx-auto my-1">
              <label
                htmlFor="subCategoryImageFile"
                className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
              >
                {subCategoryImagePreview ? (
                  <img
                    src={subCategoryImagePreview}
                    alt="SubCategory"
                    className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                  />
                ) : (
                  <span className="font-gothamNarrow">
                    <IoCloudUploadOutline size={24} />
                  </span>
                )}
              </label>
              <input
                id="subCategoryImageFile"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={handleSubCategoryFileInputChange}
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-2 py-2">
            <button
              className="relative bg-red-600 hover:bg-red-700 text-sm text-white py-3 px-8 rounded font-gothamNarrow"
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

export default AddSubCategory;
