import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import { FaTimes } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAdminError,
  editProduct,
  singleProductView,
} from "../../../../../../redux/features/admin/adminSlice";
import FormSkeleton from "../../../adminLayout/formSkeleton/FormSkeleton";

const presetColors = [
  "#D32F2F",
  "#C2185B",
  "#7B1FA2",
  "#512DA8",
  "#303F9F",
  "#1976D2",
  "#0288D1",
  "#0097A7",
  "#00796B",
  "#388E3C",
  "#689F38",
  "#AFB42B",
  "#FBC02D",
  "#FFA000",
  "#F57C00",
  "#E64A19",
  "#5D4037",
  "#616161",
  "#455A64",
  "#000000",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
  "#FFFFFF",
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];

/* ── Shared micro-components ── */
const Label = ({ children, disabled }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
    {children}
    {disabled && (
      <span className="ml-2 text-[10px] font-normal normal-case text-gray-400 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-full">
        locked
      </span>
    )}
  </label>
);

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition placeholder:text-gray-400";

const disabledInputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed";

const SectionCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const UploadZone = ({
  id,
  name,
  accept,
  preview,
  onChange,
  label,
  isVideo,
}) => (
  <div>
    <Label>{label}</Label>
    <label
      htmlFor={id}
      className="group flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-400 bg-gray-50 hover:bg-red-50/30 cursor-pointer transition-all duration-200 overflow-hidden relative"
    >
      {preview ? (
        isVideo ? (
          <video
            src={preview}
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-contain p-2"
          />
        )
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-red-400 transition-colors">
          <IoCloudUploadOutline size={28} />
          <span className="text-xs font-medium">Click to upload</span>
          <span className="text-[11px] text-gray-300">
            {isVideo ? "MP4, MOV, AVI" : "PNG, JPG, WEBP"}
          </span>
        </div>
      )}
      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
    </label>
  </div>
);

const MultiUploadZone = ({ id, name, previews, onChange, onRemove, label }) => (
  <div>
    <Label>{label}</Label>
    <label
      htmlFor={id}
      className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-400 bg-gray-50 hover:bg-red-50/30 cursor-pointer transition-all duration-200 text-gray-400 group-hover:text-red-400"
    >
      <IoCloudUploadOutline size={18} />
      <span className="text-xs font-medium">Upload multiple images</span>
      <input
        id={id}
        type="file"
        name={name}
        multiple
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
    {previews.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-3">
        {previews.map((src, i) => (
          <div
            key={i}
            className="relative w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50"
          >
            <img
              src={src}
              alt={`preview-${i}`}
              className="w-full h-full object-contain p-1"
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
            >
              <FaTimes size={8} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const EditProduct = () => {
  const { error, isLoading, loading, addProduct } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const [addEditValue, setEditProductValue] = useState({
    name: "",
    sub_heading: "",
    price: "",
    stocks: "",
    model_name: "",
    model_num: "",
    power: "",
    warranty: "",
    reward_points: "",
    serial_number: "",
    packaging: "",
    color_styles: [],
    category_id: "",
    sub_category_id: "",
  });
  const {
    name,
    sub_heading,
    price,
    stocks,
    color_styles,
    model_name,
    model_num,
    power,
    warranty,
    reward_points,
    serial_number,
    packaging,
    category_id,
    sub_category_id,
  } = addEditValue;

  const [variantImgPreview, setVariantImgPreview] = useState([]);
  const [product_images, setProduct_Images] = useState([]);
  const [specificationImgPreview, setSpecificationImgPreview] = useState([]);
  const [specification_images, setSpecification_Images] = useState([]);
  const [usageImgPreview, setUsageImgPreview] = useState([]);
  const [usage_images, setUsage_Images] = useState([]);
  const [sizingImgPreview, setSizingImgPreview] = useState([]);
  const [sizing_images, setSizing_Images] = useState([]);
  const [warranty_icon, setWarranty_icon] = useState(null);
  const [warrantyImgPreview, setWarrantyImgPreview] = useState(null);
  const [product_video, setProductVideo] = useState(null);
  const [productVideoPreview, setProductVideoPreview] = useState(null);
  const [galleryimageone, setGalleryImageOne] = useState(null);
  const [galleryImageOnePreview, setGalleryImageOnePreview] = useState(null);
  const [galleryimagetwo, setGalleryImageTwo] = useState(null);
  const [galleryImageTwoPreview, setGalleryImageTwoPreview] = useState(null);
  const [main_image, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [productSizing, setProductSizing] = useState("");
  const [productUsage, setProductUsage] = useState("");

  /* ── Populate from fetched product ── */
  useEffect(() => {
    if (addProduct) {
      setEditProductValue({
        name: addProduct.name || "",
        sub_heading: addProduct.sub_heading || "",
        model_name: addProduct.model_name || "",
        model_num: addProduct.model_num || "",
        power: addProduct.power || "",
        warranty: addProduct.warranty || "",
        reward_points: addProduct.reward_points
          ? parseInt(addProduct.reward_points)
          : 0,
        serial_number: addProduct.serial_number || "",
        packaging: addProduct.packaging || "",
        category_id: addProduct.category?.category_name || "",
        sub_category_id: addProduct?.sub_category?.sub_category_name || "",
        price:
          typeof addProduct.price === "number"
            ? addProduct.price
            : parseFloat(addProduct.price) || "",
        stocks:
          typeof addProduct.stocks === "number"
            ? addProduct.stocks
            : parseInt(addProduct.stocks) || "",
        color_styles: addProduct.color_styles
          ? addProduct.color_styles.map((item) => item)
          : [],
      });
      setProductSpecification(addProduct?.specification || "");
      setProductSizing(addProduct?.sizing || "");
      setProductUsage(addProduct?.usage || "");
      setSizes(addProduct.sizes ? addProduct.sizes.map((item) => item) : []);
      setWarrantyImgPreview(addProduct.warranty_icon);
      setProductVideoPreview(addProduct.product_video);
      setGalleryImageOnePreview(addProduct.galleryimageone);
      setGalleryImageTwoPreview(addProduct.galleryimagetwo);
      setMainImagePreview(addProduct?.main_image);
      setVariantImgPreview(
        addProduct.images ? addProduct.images.map((p) => p.image_url) : [],
      );
      setSpecificationImgPreview(
        addProduct.specification_images
          ? addProduct.specification_images.map((p) => p.image_url)
          : [],
      );
      setUsageImgPreview(
        addProduct.usage_images
          ? addProduct.usage_images.map((p) => p.image_url)
          : [],
      );
      setSizingImgPreview(
        addProduct.sizing_images
          ? addProduct.sizing_images.map((p) => p.image_url)
          : [],
      );
    }
  }, [addProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProductValue((prev) => ({ ...prev, [name]: value }));
  };

  const makeSingleFileHandler = (setPreview, setFile) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      setFile(file);
    };
  };

  const makeMultiFileHandler = (setPreview, setFiles) => async (e) => {
    const files = e.target.files;
    if (!files?.length) {
      setPreview([]);
      setFiles([]);
      return;
    }
    const previews = await Promise.all(
      Array.from(files).map(
        (f) =>
          new Promise((res) => {
            const r = new FileReader();
            r.readAsDataURL(f);
            r.onloadend = () => res(r.result);
          }),
      ),
    );
    setPreview(previews);
    setFiles(Array.from(files));
  };

  const makeRemoveHandler =
    (previews, setPreviews, files, setFiles) => (index) => {
      setPreviews(previews.filter((_, i) => i !== index));
      setFiles(files.filter((_, i) => i !== index));
    };

  const handleColorChange = (color) => {
    if (!color_styles.includes(color.hex)) {
      setEditProductValue((prev) => ({
        ...prev,
        color_styles: [...prev.color_styles, color.hex],
      }));
    }
  };
  const handleRemoveColor = (c) =>
    setEditProductValue((prev) => ({
      ...prev,
      color_styles: prev.color_styles.filter((x) => x !== c),
    }));

  const handleAddSize = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSizes([...sizes, inputValue.trim()]);
      setInputValue("");
    }
  };
  const removeSize = (s) => setSizes(sizes.filter((x) => x !== s));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseInt(price));
    formData.append("stocks", stocks ? parseInt(stocks) : 0);
    formData.append("power", power);
    formData.append("warranty", warranty);
    formData.append("packaging", packaging);
    formData.append("serial_number", serial_number);
    formData.append("model_num", model_num);
    formData.append("sub_heading", sub_heading);
    formData.append("model_name", model_name);
    formData.append(
      "reward_points",
      reward_points ? parseInt(reward_points) : 0,
    );
    formData.append("specification", productSpecification);
    formData.append("sizing", productSizing);
    formData.append("usage", productUsage);
    if (warranty_icon) formData.append("warranty_icon", warranty_icon);
    if (product_video) formData.append("product_video", product_video);
    if (galleryimageone) formData.append("galleryimageone", galleryimageone);
    if (galleryimagetwo) formData.append("galleryimagetwo", galleryimagetwo);
    if (main_image) formData.append("main_image", main_image);
    formData.append("color_styles", JSON.stringify(color_styles));
    formData.append("sizes", JSON.stringify(sizes));
    product_images.forEach((p) => formData.append("product_images", p));
    sizing_images.forEach((p) => formData.append("sizing_images", p));
    usage_images.forEach((p) => formData.append("usage_images", p));
    specification_images.forEach((p) =>
      formData.append("specification_images", p),
    );
    dispatch(editProduct({ product_id: id, formData, enqueueSnackbar }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(singleProductView(id));
  }, [id]);

  if (loading) return <FormSkeleton />;

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link
            to="/baltra-admin-dashboard/all-products-list"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition"
          >
            <HiOutlineArrowLeftCircle size={20} />
            Back to Products
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900 text-right">
              Edit Product
            </h1>
            <p className="text-xs text-gray-400 text-right">
              Update the fields you want to change
            </p>
          </div>
        </div>
      </div>

      {/* ── Change indicator banner ── */}
      <div className="max-w-screen-2xl mx-auto px-4 pt-5">
        <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <span className="text-amber-400 mt-0.5 flex-shrink-0 text-sm">✎</span>
          <p className="text-xs text-amber-700 leading-relaxed">
            You are editing an existing product. Category and sub-category are{" "}
            <strong>locked</strong> and cannot be changed. Only upload new media
            files if you want to replace the existing ones — leave upload zones
            empty to keep current media.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-screen-2xl mx-auto px-4 py-4 space-y-6"
      >
        {/* ── 1. Classification (read-only) ── */}
        <SectionCard
          title="Classification"
          subtitle="Category cannot be changed after creation"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label disabled>Category</Label>
              <select
                name="category_id"
                value={category_id}
                disabled
                className={disabledInputCls}
              >
                <option value={category_id}>{category_id}</option>
              </select>
            </div>
            <div>
              <Label disabled>Sub Category</Label>
              <select
                name="sub_category_id"
                value={sub_category_id}
                disabled
                className={disabledInputCls}
              >
                <option value={sub_category_id}>{sub_category_id}</option>
              </select>
            </div>
          </div>
        </SectionCard>

        {/* ── 2. Basic Info ── */}
        <SectionCard
          title="Basic Information"
          subtitle="Core product identity and pricing"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Product Name</Label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Product name"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Sub Heading</Label>
              <input
                type="text"
                name="sub_heading"
                value={sub_heading}
                onChange={handleChange}
                placeholder="Short tagline"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Price (NPR)</Label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="0.00"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Stock</Label>
              <input
                type="number"
                name="stocks"
                value={stocks}
                onChange={handleChange}
                placeholder="Available quantity"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Reward Points</Label>
              <input
                type="number"
                name="reward_points"
                value={reward_points}
                onChange={handleChange}
                placeholder="Points earned on purchase"
                className={inputCls}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 3. Product Details ── */}
        <SectionCard
          title="Product Details"
          subtitle="Technical specifications and identifiers"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Model Name</Label>
              <input
                type="text"
                name="model_name"
                value={model_name}
                onChange={handleChange}
                placeholder="e.g. AP-2000X"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Model Number</Label>
              <input
                type="text"
                name="model_num"
                value={model_num}
                onChange={handleChange}
                placeholder="e.g. BAL-2024-001"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Serial Number</Label>
              <input
                type="text"
                name="serial_number"
                value={serial_number}
                onChange={handleChange}
                placeholder="Product serial number"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Power</Label>
              <input
                type="text"
                name="power"
                value={power}
                onChange={handleChange}
                placeholder="e.g. 220V / 50Hz / 45W"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Warranty</Label>
              <input
                type="text"
                name="warranty"
                value={warranty}
                onChange={handleChange}
                placeholder="e.g. 2 Years"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Packaging</Label>
              <input
                type="text"
                name="packaging"
                value={packaging}
                onChange={handleChange}
                placeholder="e.g. Box with foam lining"
                className={inputCls}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 4. Colors & Sizes ── */}
        <SectionCard
          title="Colors & Sizes"
          subtitle="Update available variants"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colors */}
            <div>
              <Label>Product Colors</Label>
              {color_styles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {color_styles.map((c, i) => (
                    <div key={i} className="relative group">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: c }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTimes size={7} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="border border-gray-200 rounded-xl overflow-hidden p-3 bg-gray-50">
                <BlockPicker
                  colors={presetColors}
                  width="100%"
                  onChangeComplete={handleColorChange}
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Label>Product Sizes</Label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. S, M, L, XL or 32, 34…"
                  className={inputCls}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSize(e)}
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition active:scale-95 whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              {sizes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSize(s)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FaTimes size={9} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No sizes added yet
                </p>
              )}
            </div>
          </div>
        </SectionCard>

        {/* ── 5. Rich Text Content ── */}
        <SectionCard
          title="Product Content"
          subtitle="Update specification, sizing, and usage descriptions"
        >
          <div className="space-y-6">
            <div>
              <Label>Product Specification</Label>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill
                  theme="snow"
                  value={productSpecification}
                  onChange={setProductSpecification}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter detailed product specification…"
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <Label>Product Sizing</Label>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill
                  theme="snow"
                  value={productSizing}
                  onChange={setProductSizing}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter sizing details and guide…"
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <Label>Product Usage</Label>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill
                  theme="snow"
                  value={productUsage}
                  onChange={setProductUsage}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Describe how to use this product…"
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── 6. Media — Single uploads ── */}
        <SectionCard
          title="Media — Single Uploads"
          subtitle="Leave a zone empty to keep the existing file. Upload a new file to replace it."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <UploadZone
              id="main_image"
              name="main_image"
              accept="image/*"
              preview={mainImagePreview}
              label="Main Product Image"
              onChange={makeSingleFileHandler(
                setMainImagePreview,
                setMainImage,
              )}
            />
            <UploadZone
              id="galleryimageone"
              name="galleryimageone"
              accept="image/*"
              preview={galleryImageOnePreview}
              label="Gallery Image 1"
              onChange={makeSingleFileHandler(
                setGalleryImageOnePreview,
                setGalleryImageOne,
              )}
            />
            <UploadZone
              id="galleryimagetwo"
              name="galleryimagetwo"
              accept="image/*"
              preview={galleryImageTwoPreview}
              label="Gallery Image 2"
              onChange={makeSingleFileHandler(
                setGalleryImageTwoPreview,
                setGalleryImageTwo,
              )}
            />
            <UploadZone
              id="warrantyFile"
              name="warranty_icon"
              accept="image/*"
              preview={warrantyImgPreview}
              label="Warranty Icon"
              onChange={makeSingleFileHandler(
                setWarrantyImgPreview,
                setWarranty_icon,
              )}
            />
            <UploadZone
              id="productVideo"
              name="product_video"
              accept="video/*"
              preview={productVideoPreview}
              label="Product Video"
              isVideo
              onChange={makeSingleFileHandler(
                setProductVideoPreview,
                setProductVideo,
              )}
            />
          </div>
        </SectionCard>

        {/* ── 7. Media — Multi uploads ── */}
        <SectionCard
          title="Media — Multiple Uploads"
          subtitle="Existing images shown below. Upload new files to replace the entire set."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiUploadZone
              id="product_images"
              name="product_images"
              previews={variantImgPreview}
              label="Variant Images"
              onChange={makeMultiFileHandler(
                setVariantImgPreview,
                setProduct_Images,
              )}
              onRemove={makeRemoveHandler(
                variantImgPreview,
                setVariantImgPreview,
                product_images,
                setProduct_Images,
              )}
            />
            <MultiUploadZone
              id="specification_images"
              name="specification_images"
              previews={specificationImgPreview}
              label="Specification Images"
              onChange={makeMultiFileHandler(
                setSpecificationImgPreview,
                setSpecification_Images,
              )}
              onRemove={makeRemoveHandler(
                specificationImgPreview,
                setSpecificationImgPreview,
                specification_images,
                setSpecification_Images,
              )}
            />
            <MultiUploadZone
              id="usage_images"
              name="usage_images"
              previews={usageImgPreview}
              label="Usage Images"
              onChange={makeMultiFileHandler(
                setUsageImgPreview,
                setUsage_Images,
              )}
              onRemove={makeRemoveHandler(
                usageImgPreview,
                setUsageImgPreview,
                usage_images,
                setUsage_Images,
              )}
            />
            <MultiUploadZone
              id="sizing_images"
              name="sizing_images"
              previews={sizingImgPreview}
              label="Sizing Images"
              onChange={makeMultiFileHandler(
                setSizingImgPreview,
                setSizing_Images,
              )}
              onRemove={makeRemoveHandler(
                sizingImgPreview,
                setSizingImgPreview,
                sizing_images,
                setSizing_Images,
              )}
            />
          </div>
        </SectionCard>

        {/* ── Submit ── */}
        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
          <p className="text-xs text-gray-400">
            Only changed fields will be updated on the server
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-md shadow-red-200 transition active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
