import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCategory,
  clearAdminError,
} from "../../../../../../redux/features/admin/adminSlice";

const AddCategoryProduct = () => {
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [banner, setBanner] = useState(null);
  const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
    useState(null);
  const [image, setImage] = useState(null);
  const [categoryProductImagePreview, setCategoryProductImagePreview] =
    useState(null);

  const handleCategoryBannerFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setCategoryBannerImagePreview(reader.result);
        setBanner(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const handleCategoryFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setCategoryProductImagePreview(reader.result);
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
    formData.append("desc", data.desc);
    if (image) formData.append("image", image);
    if (banner) formData.append("banner", banner);

    dispatch(addCategory({ formData, enqueueSnackbar, navigate }));
  };

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
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs text-black font-gothamNarrow flex-grow md:text-sm">
          To ensure proper addition of a category product, please carefully
          insert the categoryname,SubHeading,Category Banner Image and category
          Image before confirming your choice.
        </p>
      </div>
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-category-List"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add Category Product
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
                htmlFor="category_name"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter category product"
                {...register("name", { required: "Category name is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-xs font-gothamNarrow">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="desc"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Sub Heading
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter Sub heading"
                {...register("desc", { required: "Sub Heading is required" })}
              />
              {errors.desc && (
                <span className="text-red-600 text-xs font-gothamNarrow">
                  {errors.desc.message}
                </span>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add Category BannerImage
            </span>
            <div className="w-full font-gothamNarrow h-56 border border-gray-400 relative mx-auto my-1">
              <label
                htmlFor="bannerFile"
                className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
              >
                {categoryBannerImagePreview ? (
                  <img
                    src={categoryBannerImagePreview}
                    alt="profile"
                    className="object-cover w-full font-gothamNarrow h-full cursor-pointer"
                  />
                ) : (
                  <span className="font-gothamNarrow">
                    <IoCloudUploadOutline size={24} />
                  </span>
                )}
              </label>
              <input
                id="bannerFile"
                type="file"
                name="banner"
                accept="image/*"
                className="hidden"
                onChange={handleCategoryBannerFileInputChange}
              />
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add Category Image
            </span>
            <div className="w-full font-gothamNarrow h-56 border border-gray-400 relative mx-auto my-1">
              <label
                htmlFor="imageFile"
                className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
              >
                {categoryProductImagePreview ? (
                  <img
                    src={categoryProductImagePreview}
                    alt="profile"
                    className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                  />
                ) : (
                  <span className="font-gothamNarrow">
                    <IoCloudUploadOutline size={24} />
                  </span>
                )}
              </label>
              <input
                id="imageFile"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={handleCategoryFileInputChange}
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

export default AddCategoryProduct;
