import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import { FaInfoCircle, FaTimes, FaTrash } from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addBaltraProduct,
  clearAdminError,
  dropdownCategory,
  dropdownSubCategory,
} from "../../../../../../redux/features/admin/adminSlice";

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
const AddProduct = () => {
  const { dropdownCategories, error, isLoading, dropdownSubCategories } =
    useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addProductValue, setAddProductValue] = useState({
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
  } = addProductValue;

  const [variantImgPreview, setVariantImgPreview] = useState([]);
  const [product_images, setProduct_Images] = useState([]);

  const [productErr, setProductErr] = useState({});

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

  const handleSpecificationChange = (value) => {
    setProductSpecification(value);
  };

  const handleSizingChange = (value) => {
    setProductSizing(value);
  };

  const handleUsageChange = (value) => {
    setProductUsage(value);
  };

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setMainImagePreview(reader.result);
        setMainImage(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setAddProductValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleGalleryTwoFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setGalleryImageTwoPreview(reader.result);
        setGalleryImageTwo(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };
  const handleGalleryOneFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setGalleryImageOnePreview(reader.result);
        setGalleryImageOne(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const handleProductVideoInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProductVideoPreview(reader.result);
        setProductVideo(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const handleWarrantyFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setWarrantyImgPreview(reader.result);
        setWarranty_icon(file);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };
    }
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!name) {
      newErrors.name = "productName is required";
    }
    if (!category_id) {
      newErrors.category_id = "Category is required";
    }
    if (!sub_category_id) {
      newErrors.sub_category_id = "SubCategory is required";
    }
    if (!sub_heading) {
      newErrors.sub_heading = "SubHeading is required";
    }

    if (!packaging) {
      newErrors.packaging = "packaging is required";
    }

    if (!warranty) {
      newErrors.warranty = "Warranty is required";
    }
    if (!model_num) {
      newErrors.model_num = "Model Number is required";
    }
    if (!model_name) {
      newErrors.model_name = "Model Name is required";
    }
    if (!price) {
      newErrors.price = "price is required";
    }

    if (color_styles.length === 0) {
      newErrors.color_styles = "color is required";
    }

    if (!productSpecification) {
      newErrors.productSpecification = "ProductSpecification is required";
    }
    if (!productSizing) {
      newErrors.productSizing = "ProductSizing is required";
    }
    if (!productUsage) {
      newErrors.productUsage = "ProductUsage is required";
    }
    if (product_images.length === 0) {
      newErrors.product_images = "product_images is required";
    }

    setProductErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewArray = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            previewArray.push(reader.result);
            resolve();
          };
        });
      });

      await Promise.all(promises);

      setVariantImgPreview(previewArray);
      setProduct_Images(Array.from(files));
    } else {
      setVariantImgPreview([]);
      setProduct_Images([]);
    }
  };

  const handleSpecificationImageChange = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewArray = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            previewArray.push(reader.result);
            resolve();
          };
        });
      });

      await Promise.all(promises);

      setSpecificationImgPreview(previewArray);
      setSpecification_Images(Array.from(files));
    } else {
      setSpecificationImgPreview([]);
      setSpecification_Images([]);
    }
  };

  const handleUsageImageChange = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewArray = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            previewArray.push(reader.result);
            resolve();
          };
        });
      });

      await Promise.all(promises);

      setUsageImgPreview(previewArray);
      setUsage_Images(Array.from(files));
    } else {
      setUsageImgPreview([]);
      setUsage_Images([]);
    }
  };

  const handleSizingImageChange = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewArray = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            previewArray.push(reader.result);
            resolve();
          };
        });
      });

      await Promise.all(promises);

      setSizingImgPreview(previewArray);
      setSizing_Images(Array.from(files));
    } else {
      setSizingImgPreview([]);
      setSizing_Images([]);
    }
  };

  const handleSizingRemoveImage = (index) => {
    const updatedPreview = [...usageImgPreview];
    updatedPreview.splice(index, 1);
    setSizingImgPreview(updatedPreview);

    const updatedImages = [...sizing_images];
    updatedImages.splice(index, 1);
    setSizing_Images(updatedImages);
  };

  const handleUsageRemoveImage = (index) => {
    const updatedPreview = [...usageImgPreview];
    updatedPreview.splice(index, 1);
    setUsageImgPreview(updatedPreview);

    const updatedImages = [...usage_images];
    updatedImages.splice(index, 1);
    setUsage_Images(updatedImages);
  };

  const handleSpecificationRemoveImage = (index) => {
    const updatedPreview = [...specificationImgPreview];
    updatedPreview.splice(index, 1);
    setSpecificationImgPreview(updatedPreview);

    const updatedImages = [...specification_images];
    updatedImages.splice(index, 1);
    setSpecification_Images(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedPreview = [...variantImgPreview];
    updatedPreview.splice(index, 1);
    setVariantImgPreview(updatedPreview);

    const updatedImages = [...product_images];
    updatedImages.splice(index, 1);
    setProduct_Images(updatedImages);
  };

  const handleColorChange = (color) => {
    if (!color_styles.includes(color.hex)) {
      setAddProductValue((prevValue) => ({
        ...prevValue,
        color_styles: [...prevValue.color_styles, color.hex],
      }));
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setAddProductValue((prevValue) => ({
      ...prevValue,
      color_styles: prevValue.color_styles.filter(
        (color) => color !== colorToRemove
      ),
    }));
  };

  const handleAddSize = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setSizes([...sizes, inputValue.trim()]);
      setInputValue("");
    }
  };

  // Function to remove a size
  const removeSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category_id", category_id);
      formData.append("sub_category_id", sub_category_id);
      formData.append("price", parseInt(price));
      formData.append("stocks", parseInt(stocks));
      formData.append("power", power);
      formData.append("warranty", warranty);
      formData.append("packaging", packaging);
      formData.append("serial_number", serial_number);
      formData.append("model_num", model_num);
      formData.append("sub_heading", sub_heading);
      formData.append("model_name", model_name);
      formData.append("reward_points", parseInt(reward_points));
      formData.append("specification", productSpecification);
      formData.append("sizing", productSizing);
      formData.append("usage", productUsage);
      formData.append("warranty_icon", warranty_icon);
      formData.append("galleryimageone", galleryimageone);
      formData.append("galleryimagetwo", galleryimagetwo);
      formData.append("product_video", product_video);
      formData.append("main_image", main_image);

      // Convert arrays to JSON strings
      formData.append("color_styles", JSON.stringify(color_styles));
      formData.append("sizes", JSON.stringify(sizes));

      // Append product images
      if (product_images.length > 0) {
        product_images.forEach((photo) => {
          formData.append("product_images", photo);
        });
      }

      if (sizing_images.length > 0) {
        sizing_images.forEach((photo) => {
          formData.append("sizing_images", photo);
        });
      }

      if (usage_images.length > 0) {
        usage_images.forEach((photo) => {
          formData.append("usage_images", photo);
        });
      }

      if (specification_images.length > 0) {
        specification_images.forEach((photo) => {
          formData.append("specification_images", photo);
        });
      }
      dispatch(addBaltraProduct({ formData, enqueueSnackbar, navigate }));
    } else {
      enqueueSnackbar("Invalid Input", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(dropdownCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category_id) {
      dispatch(dropdownSubCategory(category_id));
    }
  }, [dispatch, category_id]);

  return (
    <>
      <div className="flex items-center w-full my-2 px-8">
        <FaInfoCircle className="text-black mr-2" size={20} />
        <p className="text-xs text-black font-outfit flex-grow md:text-sm">
          To ensure proper product addition, carefully select the colors and
          images. Hold the
          <strong>Ctrl</strong> key (or <strong>Cmd</strong> on Mac) to select
          multiple colors or images. For sizes, you can manually add multiple
          entries. To add a product specification, select the editor list
          options and manually add the list. For sizing, write the description,
          and for usage, write the description in list format using the editor.
        </p>
      </div>

      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex justify-between items-center">
        <Link
          to="/baltra-admin-dashboard/all-products-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          Add Product
        </Link>
      </div>
      <div className="container mx-auto px-8 my-5 font-sans">
        <form className="bg-[#FFFFFF] px-3 py-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  focus:ring-1 focus:ring-sky-200">
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
                value={category_id}
                onChange={handleChange}
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
              {productErr && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.category_id}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="sub_category_id"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Select Sub Category
              </label>
              <select
                id="sub_category_id"
                name="sub_category_id"
                className="w-full font-gothamNarrow my-1 px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={sub_category_id}
                onChange={handleChange}
              >
                <option value="">Select Sub Category</option>
                {category_id &&
                  (dropdownSubCategories && dropdownSubCategories.length > 0 ? (
                    dropdownSubCategories.map((subcategory) => (
                      <option
                        key={subcategory.subcategory_id}
                        value={subcategory.subcategory_id}
                      >
                        {subcategory.subcategory_name}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading categories...</option>
                  ))}
              </select>
              {productErr && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.sub_category_id}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="stock"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Product Name"
                value={name}
                onChange={handleChange}
              />
              {productErr.name && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.name}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="stock"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Product Sub Heading
              </label>
              <input
                type="text"
                id="sub_heading"
                name="sub_heading"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Product Sub Heading"
                value={sub_heading}
                onChange={handleChange}
              />
              {productErr.sub_heading && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.sub_heading}
                </span>
              )}
            </div>
            <div className="font-gothamNarrow">
              <label htmlFor="price" className="text-black font-normal">
                Price
              </label>
              <div className="flex items-center font-gothamNarrow text-black font-normal">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full font-gothamNarrow px-4 my-1 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                  placeholder="Enter your price"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              {productErr.price && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.price}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="stock"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Stock
              </label>
              <input
                type="number"
                id="stocks"
                name="stocks"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter product stock"
                value={stocks}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Model Name"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Model Name
              </label>
              <input
                type="text"
                id="model_name"
                name="model_name"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Model Name"
                value={model_name}
                onChange={handleChange}
              />
              {productErr.model_name && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.model_name}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="model_num"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Model Number
              </label>
              <input
                type="text"
                id="model_num"
                name="model_num"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Model Number"
                value={model_num}
                onChange={handleChange}
              />
              {productErr.model_num && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.model_num}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="serial_number"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Serial Number
              </label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Serial Number"
                value={serial_number}
                onChange={handleChange}
              />
            </div>

            <div className="font-gothamNarrow">
              <label htmlFor="price" className="text-black font-normal">
                Power
              </label>
              <div className="flex items-center font-gothamNarrow text-black font-normal">
                <input
                  type="text"
                  id="power"
                  name="power"
                  className="w-full font-gothamNarrow px-4 my-1 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                  placeholder="Enter your power"
                  value={power}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="font-gothamNarrow">
              <label htmlFor="price" className="text-black font-normal">
                Warranty:
              </label>
              <div className="flex items-center font-gothamNarrow text-black font-normal">
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  className="w-full font-gothamNarrow px-4 my-1 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                  placeholder="Enter your warranty"
                  value={warranty}
                  onChange={handleChange}
                />
              </div>
              {productErr.warranty && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.warranty}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="packaging"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Packaging
              </label>
              <input
                type="text"
                id="packaging"
                name="packaging"
                className="w-full font-gothamNarrow px-4 my-1 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter product packaging"
                value={packaging}
                onChange={handleChange}
              />
              {productErr.packaging && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.packaging}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="color"
                className="text-black font-normal font-gothamNarrow"
              >
                Select Product Colors (please select multiple colors)
              </label>
              <div className="flex flex-wrap my-1">
                {color_styles.map((color, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs"
                      onClick={() => handleRemoveColor(color)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <BlockPicker
                  colors={presetColors}
                  width="100%"
                  onChangeComplete={handleColorChange}
                />
              </div>
              {productErr.color_styles && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.color_styles}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="sizes"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Please Enter multiple Product Sizes
              </label>
              <input
                type="text"
                id="input-size"
                className="w-full font-gothamNarrow px-4 my-1 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500 focus:ring-gray-300"
                placeholder="Enter product sizes"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={handleAddSize}
                className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-gothamNarrow"
              >
                Add Size
              </button>

              {/* Display the list of sizes */}
              <ul className="mt-2">
                {sizes.map((size, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center font-gothamNarrow"
                  >
                    {size}{" "}
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      className="text-red-500 hover:text-red-700 font-gothamNarrow"
                    >
                      <FaTrash size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label
                htmlFor="specification"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Product Specification
              </label>
              <div className="my-1">
                {/* <ReactQuill
                  theme="snow"
                  value={productSpecification}
                  onChange={handleSpecificationChange}
                  className="tex-lg"
                /> */}
                <ReactQuill
                  theme="snow"
                  value={productSpecification}
                  onChange={handleSpecificationChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                  placeholder="Enter detailed product description..."
                />

                {productErr && (
                  <span className="text-xs text-red-600 font-gothamNarrow">
                    {productErr.productSpecification}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="sizing"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Product Sizing
              </label>
              <div className="my-1">
                {/* <ReactQuill
                  theme="snow"
                  value={productSizing}
                  onChange={handleSizingChange}
                  className="tex-lg"
                /> */}

                <ReactQuill
                  theme="snow"
                  value={productSizing}
                  onChange={handleSizingChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                  placeholder="Enter detailed product sizing..."
                />
                {productErr && (
                  <span className="text-xs text-red-600 font-gothamNarrow">
                    {productErr.productSizing}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="usage"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Product Usage(Both description and List format)
              </label>
              <div className="my-1">
                {/* <ReactQuill
                  theme="snow"
                  value={productUsage}
                  onChange={handleUsageChange}
                  className="tex-lg"
                /> */}

                <ReactQuill
                  theme="snow"
                  value={productUsage}
                  onChange={handleUsageChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                  placeholder="Enter detailed product Usage..."
                />
                {productErr && (
                  <span className="text-xs text-red-600 font-gothamNarrow">
                    {productErr.productUsage}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="reward_points"
                className="text-black font-normal mb-2 font-gothamNarrow"
              >
                Reward Points
              </label>
              <input
                type="text"
                id="reward_points"
                name="reward_points"
                className="w-full font-gothamNarrow my-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-red-500  focus:ring-gray-300"
                placeholder="Enter Reward Point"
                value={reward_points}
                onChange={handleChange}
              />
              {productErr && (
                <span className="text-xs text-red-600 font-gothamNarrow">
                  {productErr.reward_points}
                </span>
              )}
            </div>
            <div className="lg:w-full my-2">
              <span className="font-gothamNarrow font-normal">
                Add Warranty Image
              </span>
              <div className="w-full font-gothamNarrow h-64 border border-red-400 relative mx-auto my-1">
                <label
                  htmlFor="warrantyFile"
                  className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
                >
                  {warrantyImgPreview ? (
                    <img
                      src={warrantyImgPreview}
                      alt="warranty"
                      className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                    />
                  ) : (
                    <span className="font-gothamNarrow">
                      <IoCloudUploadOutline size={24} />
                    </span>
                  )}
                </label>
                <input
                  id="warrantyFile"
                  type="file"
                  name="warranty_icon"
                  accept="image/*"
                  className="hidden"
                  onChange={handleWarrantyFileInputChange}
                />
              </div>
            </div>

            <div className="lg:w-full my-2">
              <span className="font-gothamNarrow font-normal">
                Upload Product Video
              </span>
              <div className="w-full font-gothamNarrow h-64 border border-red-400 relative mx-auto my-1">
                <label
                  htmlFor="productVideo"
                  className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
                >
                  {productVideoPreview ? (
                    <video
                      src={productVideoPreview}
                      alt="product video"
                      className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                      controls
                    />
                  ) : (
                    <span className="font-gothamNarrow">
                      <IoCloudUploadOutline size={24} />
                    </span>
                  )}
                </label>
                <input
                  id="productVideo"
                  type="file"
                  name="product_video"
                  accept="video/*"
                  className="hidden"
                  onChange={handleProductVideoInputChange}
                />
              </div>
            </div>
            {/* <button type="submit" className="btn btn-primary">
              Upload Video
            </button> */}

            <div className="lg:w-full">
              <span className="font-gothamNarrow font-normal">
                Add Gallery Image(One)
              </span>
              <div className="w-full font-gothamNarrow h-64 border border-red-400 relative mx-auto my-1">
                <label
                  htmlFor="galleryimageone"
                  className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
                >
                  {galleryImageOnePreview ? (
                    <img
                      src={galleryImageOnePreview}
                      alt="galleryImag1"
                      className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                    />
                  ) : (
                    <span className="font-gothamNarrow">
                      <IoCloudUploadOutline size={24} />
                    </span>
                  )}
                </label>
                <input
                  id="galleryimageone"
                  type="file"
                  name="galleryimageone"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryOneFileInputChange}
                />
              </div>
            </div>
            <div className="lg:w-full">
              <span className="font-gothamNarrow font-normal">
                Add Gallery Image(Two)
              </span>
              <div className="w-full font-gothamNarrow h-64 border border-red-400 relative mx-auto my-1">
                <label
                  htmlFor="galleryimagetwo"
                  className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
                >
                  {galleryImageTwoPreview ? (
                    <img
                      src={galleryImageTwoPreview}
                      alt="galleryimagetwo"
                      className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                    />
                  ) : (
                    <span className="font-gothamNarrow">
                      <IoCloudUploadOutline size={24} />
                    </span>
                  )}
                </label>
                <input
                  id="galleryimagetwo"
                  type="file"
                  name="galleryimagetwo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryTwoFileInputChange}
                />
              </div>
            </div>
            <div className="lg:w-full">
              <span className="font-gothamNarrow font-normal">
                Product Main Image
              </span>
              <div className="w-full font-gothamNarrow h-64 border border-red-400 relative mx-auto my-1">
                <label
                  htmlFor="main_image"
                  className="w-full font-gothamNarrow h-full flex items-center justify-center cursor-pointer"
                >
                  {mainImagePreview ? (
                    <img
                      src={mainImagePreview}
                      alt="main_image"
                      className="object-contain w-full font-gothamNarrow h-full cursor-pointer"
                    />
                  ) : (
                    <span className="font-gothamNarrow">
                      <IoCloudUploadOutline size={24} />
                    </span>
                  )}
                </label>
                <input
                  id="main_image"
                  type="file"
                  name="main_image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainFileChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add ProductVariantImages (please upload Product Variant
              images(Multiple))
            </span>
            <div className="mt-4 border border-gray-200 p-4 rounded">
              <input
                type="file"
                name="product_images"
                multiple
                accept="image/*"
                className="file:mr-3 file:py-2 file:px-4 file:border-0 hover:file:bg-gray-200"
                onChange={handleImageChange}
              />
              <div className="flex">
                {variantImgPreview.map((variantImg, index) => (
                  <div
                    key={index}
                    className="w-56 h-auto border border-gray-300 relative overflow-hidden rounded-sm m-1"
                  >
                    <img
                      src={variantImg}
                      alt={`variantImages-${index}`}
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add SpecificationImages (please upload multiple images)
            </span>
            <div className="mt-4 border border-gray-200 p-4 rounded">
              <input
                type="file"
                name="specification_images"
                multiple
                accept="image/*"
                className="file:mr-3 file:py-2 file:px-4 file:border-0 hover:file:bg-gray-200"
                onChange={handleSpecificationImageChange}
              />
              <div className="flex">
                {specificationImgPreview.map((specificationImg, index) => (
                  <div
                    key={index}
                    className="w-56 h-auto border border-gray-300 relative overflow-hidden rounded-sm m-1"
                  >
                    <img
                      src={specificationImg}
                      alt={`variantImages-${index}`}
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={() => handleSpecificationRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add UsageImages (please upload multiple images)
            </span>
            <div className="mt-4 border border-gray-200 p-4 rounded">
              <input
                type="file"
                name="usage_images"
                multiple
                accept="image/*"
                className="file:mr-3 file:py-2 file:px-4 file:border-0 hover:file:bg-gray-200"
                onChange={handleUsageImageChange}
              />
              <div className="flex">
                {usageImgPreview.map((usageImage, index) => (
                  <div
                    key={index}
                    className="w-56 h-auto border border-gray-300 relative overflow-hidden rounded-sm m-1"
                  >
                    <img
                      src={usageImage}
                      alt={`variantImages-${index}`}
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={() => handleUsageRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 my-5">
            <span className="font-gothamNarrow font-normal">
              Add SizingImages (please upload multiple images)
            </span>
            <div className="mt-4 border border-gray-200 p-4 rounded">
              <input
                type="file"
                name="sizing_images"
                multiple
                accept="image/*"
                className="file:mr-3 file:py-2 file:px-4 file:border-0 hover:file:bg-gray-200"
                onChange={handleSizingImageChange}
              />
              <div className="flex">
                {sizingImgPreview.map((sizingImage, index) => (
                  <div
                    key={index}
                    className="w-56 h-auto border border-gray-300 relative overflow-hidden rounded-sm m-1"
                  >
                    <img
                      src={sizingImage}
                      alt={`variantImages-${index}`}
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={() => handleSizingRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-2 py-2">
            <button
              className="relative bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded font-gothamNarrow"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                </span>
              )}
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
