import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLayerGroup } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCategory,
  clearAdminError,
} from "../../../../../../redux/features/admin/adminSlice";

// ─── Reusable input field ───────────────────────────────────────────────────
const InputField = ({ id, label, placeholder, error, registration }) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-[11.5px] font-semibold tracking-[0.07em] uppercase text-gray-500"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className={`
        w-full px-3.5 py-2.5 text-[13px] tracking-[0.01em] text-gray-800
        bg-white border rounded-lg outline-none transition-all
        placeholder:text-gray-300
        focus:ring-2 focus:ring-red-500/20 focus:border-red-400
        ${error ? "border-red-400 bg-red-50/40" : "border-gray-200 hover:border-gray-300"}
      `}
      {...registration}
    />
    {error && (
      <span className="text-[11px] text-red-500 tracking-[0.02em] flex items-center gap-1">
        <span>·</span> {error.message}
      </span>
    )}
  </div>
);

// ─── Reusable image upload zone ─────────────────────────────────────────────
const ImageUploadZone = ({
  id,
  label,
  hint,
  preview,
  onChange,
  onClear,
  aspect = "banner",
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label
        htmlFor={id}
        className="text-[11.5px] font-semibold tracking-[0.07em] uppercase text-gray-500"
      >
        {label}
      </label>
      {preview && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-600 tracking-[0.02em] transition-colors"
        >
          <IoTrashOutline size={11} />
          Remove
        </button>
      )}
    </div>

    <label
      htmlFor={id}
      className={`
        relative flex items-center justify-center cursor-pointer
        border-2 border-dashed rounded-xl overflow-hidden
        transition-all group
        ${
          preview
            ? "border-gray-200"
            : "border-gray-200 hover:border-red-300 hover:bg-red-50/30"
        }
        ${aspect === "banner" ? "h-40 w-full" : "h-40 w-40"}
      `}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt={label}
            className={`${aspect === "banner" ? "object-cover w-full h-full" : "object-contain w-full h-full p-2"}`}
          />
          {/* Hover overlay to re-upload */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-[11.5px] font-medium tracking-[0.03em] transition-opacity">
              Click to change
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-300 group-hover:text-red-400 transition-colors">
          <IoCloudUploadOutline size={28} />
          <div className="text-center">
            <p className="text-[12px] font-medium tracking-[0.02em]">
              Click to upload
            </p>
            {hint && (
              <p className="text-[10.5px] tracking-[0.02em] mt-0.5">{hint}</p>
            )}
          </div>
        </div>
      )}
    </label>

    <input
      id={id}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={onChange}
    />
  </div>
);

// ─── Spinner ─────────────────────────────────────────────────────────────────
const SpinnerIcon = () => (
  <svg
    className="animate-spin h-3.5 w-3.5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

// ─── Main component ───────────────────────────────────────────────────────────
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
  const [bannerPreview, setBannerPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const readFile = (file, setPreview, setFile) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      setFile(file);
    };
    reader.onerror = () => console.error("File read error");
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
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <div className="font-inter px-4 py-4 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/baltra-admin-dashboard/all-category-List"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.02em] text-gray-400 hover:text-gray-600 transition-colors mb-2"
          >
            <HiOutlineArrowLeftCircle size={15} />
            Back to Category List
          </Link>
          <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
            Add Category
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Fill in the details and upload images to create a new category
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6">
        <svg
          className="text-blue-400 mt-0.5 flex-shrink-0 h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-[12px] text-blue-600 tracking-[0.01em] leading-[1.6]">
          Provide a <strong>category name</strong>, <strong>sub heading</strong>
          , and upload both a banner image (wide format) and a category image
          (square/portrait) before saving.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ── Section 1: Basic Info ── */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
            <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
              <FaLayerGroup className="text-red-400" size={10} />
            </div>
            <h2 className="text-[12px] font-semibold tracking-[0.07em] uppercase text-gray-400">
              Category Details
            </h2>
          </div>

          <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="name"
              label="Category Name"
              placeholder="e.g. Fans & Coolers"
              error={errors.name}
              registration={register("name", {
                required: "Category name is required",
              })}
            />
            <InputField
              id="desc"
              label="Sub Heading"
              placeholder="e.g. Stay cool with our range"
              error={errors.desc}
              registration={register("desc", {
                required: "Sub heading is required",
              })}
            />
          </div>
        </div>

        {/* ── Section 2: Images ── */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
            <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
              <IoCloudUploadOutline className="text-red-400" size={11} />
            </div>
            <h2 className="text-[12px] font-semibold tracking-[0.07em] uppercase text-gray-400">
              Images
            </h2>
            <span className="ml-auto text-[10.5px] text-gray-300 tracking-[0.02em]">
              Accepted: JPG, PNG, WEBP
            </span>
          </div>

          <div className="px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner */}
            <div className="flex flex-col gap-3">
              <ImageUploadZone
                id="bannerFile"
                label="Banner Image"
                hint="Recommended: 1200 × 400px (wide)"
                preview={bannerPreview}
                aspect="banner"
                onChange={(e) =>
                  readFile(e.target.files[0], setBannerPreview, setBanner)
                }
                onClear={() => {
                  setBanner(null);
                  setBannerPreview(null);
                }}
              />
              {bannerPreview && (
                <p className="text-[10.5px] text-gray-400 tracking-[0.02em]">
                  ✓ Banner image selected
                </p>
              )}
            </div>

            {/* Category image */}
            <div className="flex flex-col gap-3">
              <ImageUploadZone
                id="imageFile"
                label="Category Image"
                hint="Recommended: 400 × 400px (square)"
                preview={imagePreview}
                aspect="square"
                onChange={(e) =>
                  readFile(e.target.files[0], setImagePreview, setImage)
                }
                onClear={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              />
              {imagePreview && (
                <p className="text-[10.5px] text-gray-400 tracking-[0.02em]">
                  ✓ Category image selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer: Save ── */}
        <div className="flex items-center justify-between py-2">
          <p className="text-[11.5px] text-gray-300 tracking-[0.02em]">
            All fields marked are required
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.03em] text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <SpinnerIcon />
                Saving...
              </>
            ) : (
              <>
                <FaLayerGroup size={11} />
                Save Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryProduct;
