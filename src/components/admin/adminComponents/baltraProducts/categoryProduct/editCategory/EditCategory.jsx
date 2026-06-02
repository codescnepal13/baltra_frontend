import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLayerGroup } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  categoryProductById,
  clearAdminError,
  editCategory,
} from "../../../../../../redux/features/admin/adminSlice";
import FormSkeleton from "../../../adminLayout/formSkeleton/FormSkeleton";

// ─── Reusable input field ─────────────────────────────────────────────────────
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
        ${
          error
            ? "border-red-400 bg-red-50/40"
            : "border-gray-200 hover:border-gray-300"
        }
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

// ─── Reusable image upload zone ───────────────────────────────────────────────
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
        border-2 border-dashed rounded-xl overflow-hidden transition-all group
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
            className={
              aspect === "banner"
                ? "object-cover w-full h-full"
                : "object-contain w-full h-full p-2"
            }
          />
          {/* Re-upload overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-[11.5px] font-medium tracking-[0.03em] transition-opacity flex items-center gap-1.5">
              <MdOutlineEdit size={13} />
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

    {preview && (
      <p className="text-[10.5px] text-emerald-500 tracking-[0.02em]">
        ✓ Image ready
      </p>
    )}
  </div>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────
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
const EditCategory = () => {
  const { loading, isLoading, error, categoryProduct } = useSelector(
    (state) => state.admin,
  );
  const { category_id } = useParams();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ── Shared file reader ──────────────────────────────────────────────────────
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

  // ── Pre-fill form with existing data ───────────────────────────────────────
  useEffect(() => {
    if (categoryProduct) {
      Object.keys(categoryProduct).forEach((key) =>
        setValue(key, categoryProduct[key]),
      );
      setBannerPreview(categoryProduct?.banner || null);
      setImagePreview(categoryProduct?.image_url || null);
    }
  }, [categoryProduct, setValue]);

  // ── Fetch category on mount ─────────────────────────────────────────────────
  useEffect(() => {
    if (category_id) dispatch(categoryProductById(category_id));
  }, [dispatch, category_id]);

  // ── Clear errors ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    if (image) formData.append("image", image);
    if (banner) formData.append("banner", banner);
    dispatch(editCategory({ category_id, formData, enqueueSnackbar }));
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) return <FormSkeleton />;

  return (
    <div className="font-inter px-5 py-4 max-w-screen-2xl mx-auto">
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
            Edit Category
          </h1>
          <p className="text-[12px] text-gray-400 tracking-[0.01em] mt-0.5">
            Update the details and images for{" "}
            <span className="text-gray-600 font-medium">
              {categoryProduct?.name ?? "this category"}
            </span>
          </p>
        </div>

        {/* Edit badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg">
          <MdOutlineEdit className="text-amber-400" size={13} />
          <span className="text-[11.5px] font-medium tracking-[0.03em] text-amber-500">
            Editing
          </span>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-6">
        <svg
          className="text-amber-400 mt-0.5 flex-shrink-0 h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-[12px] text-amber-600 tracking-[0.01em] leading-[1.6]">
          You are editing an existing category. Uploading new images will
          replace the current ones. Leave image fields unchanged to keep
          existing images.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ── Section 1: Category Details ── */}
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
              Upload new to replace · Leave empty to keep current
            </span>
          </div>

          <div className="px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner image */}
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

            {/* Category image */}
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
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between py-2">
          <p className="text-[11.5px] text-gray-300 tracking-[0.02em]">
            Changes are saved immediately on submit
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/baltra-admin-dashboard/all-category-List"
              className="px-4 py-2.5 text-[12.5px] font-medium tracking-[0.02em] text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.03em] text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  Saving...
                </>
              ) : (
                <>
                  <MdOutlineEdit size={12} />
                  Update Category
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
