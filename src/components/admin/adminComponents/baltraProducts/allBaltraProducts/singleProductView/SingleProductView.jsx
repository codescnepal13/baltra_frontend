import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaAward,
  FaBolt,
  FaBoxOpen,
  FaCalendarAlt,
  FaCog,
  FaHashtag,
  FaPlay,
  FaShieldAlt,
  FaTag,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAdminError,
  singleProductView,
} from "../../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../../layout/metaData/MetaData";
import ProductViewSkeleton from "../../../../../layout/productViewSkeleton/ProductViewSkeleton";

const SingleProductView = () => {
  const { loading, error, addProduct } = useSelector((s) => s.admin);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("specifications");

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);
  useEffect(() => {
    if (id) dispatch(singleProductView(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (addProduct?.main_image) setSelectedImage(addProduct.main_image);
  }, [addProduct]);

  const tabs = [
    addProduct?.specification && {
      key: "specifications",
      label: "Specifications",
      content: addProduct.specification,
      images: addProduct.specification_images,
    },
    addProduct?.sizing && {
      key: "sizing",
      label: "Sizing",
      content: addProduct.sizing,
      images: addProduct.sizing_images,
    },
    addProduct?.usage && {
      key: "usage",
      label: "Usage guide",
      content: addProduct.usage,
      images: addProduct.usage_images,
    },
  ].filter(Boolean);

  const activeTabData = tabs.find((t) => t.key === activeTab) || tabs[0];
  const hasTabContent = tabs.length > 0;

  return (
    <>
      <MetaData title="Baltra — Product Details" />

      <div className="min-h-screen bg-slate-50">
        {/* ── Sticky topbar ── */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-screen-2xl mx-auto px-6 h-12 flex items-center gap-3">
            <Link
              to="/baltra-admin-dashboard/all-products-list"
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <HiOutlineArrowLeftCircle size={18} />
              Back
            </Link>
            <div className="w-px h-4 bg-slate-200" />
            <h1 className="text-sm font-semibold text-slate-900">
              Product details
            </h1>
          </div>
        </header>

        {loading ? (
          <ProductViewSkeleton />
        ) : (
          <main className="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col gap-4">
            {/* ── Hero card ── */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Name + price strip */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-slate-900 leading-snug">
                    {addProduct?.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5 mb-2">
                    {addProduct?.sub_heading}
                  </p>
                  {(addProduct?.category || addProduct?.sub_category) && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {addProduct?.category?.category_name}
                      {addProduct?.sub_category?.sub_category_name && (
                        <> › {addProduct.sub_category.sub_category_name}</>
                      )}
                    </span>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">
                    Retail price
                  </div>
                  <div className="text-3xl font-extrabold text-red-600 tracking-tight">
                    Rs.&nbsp;{addProduct?.price?.toLocaleString()}
                  </div>
                  {addProduct?.stocks > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mt-1.5 bg-green-50 text-green-700 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      In stock ({addProduct.stocks})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mt-1.5 bg-red-50 text-red-600 border border-red-200">
                      <FaTimes size={9} /> Out of stock
                    </span>
                  )}
                </div>
              </div>

              {/* Image pane (left) + Info pane (right) */}
              <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                {/* ── Image pane ── */}
                <div className="p-6 flex flex-col gap-3">
                  {/* Main image with warranty badge overlay */}
                  <div className="relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden aspect-square">
                    <img
                      src={selectedImage || addProduct?.main_image}
                      alt={addProduct?.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                    {addProduct?.warranty_icon && (
                      <div className="absolute top-2.5 right-2.5">
                        <img
                          src={addProduct.warranty_icon}
                          alt="Warranty"
                          className="w-14 h-14 object-contain drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {addProduct?.images?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      <Thumb
                        src={addProduct.main_image}
                        active={selectedImage === addProduct.main_image}
                        onClick={() => setSelectedImage(addProduct.main_image)}
                        alt="Main"
                      />
                      {addProduct.images.map((img, i) => (
                        <Thumb
                          key={i}
                          src={img.image_url}
                          active={selectedImage === img.image_url}
                          onClick={() => setSelectedImage(img.image_url)}
                          alt={`View ${i + 2}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Info pane ── */}
                <div className="p-6 flex flex-col gap-5">
                  {/* Product detail grid */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                      Product details
                    </p>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                      <InfoItem
                        icon={<FaCog />}
                        label="Model name"
                        value={addProduct?.model_name}
                      />
                      <InfoItem
                        icon={<FaHashtag />}
                        label="Model number"
                        value={addProduct?.model_num}
                      />
                      <InfoItem
                        icon={<FaBolt />}
                        label="Power"
                        value={addProduct?.power}
                      />
                      <InfoItem
                        icon={<FaShieldAlt />}
                        label="Warranty"
                        value={
                          addProduct?.warranty
                            ? `${addProduct.warranty} months`
                            : null
                        }
                      />
                      <InfoItem
                        icon={<FaBoxOpen />}
                        label="Packaging"
                        value={addProduct?.packaging}
                      />
                      <InfoItem
                        icon={<FaCalendarAlt />}
                        label="Added on"
                        value={
                          addProduct?.date_joined
                            ? moment(addProduct.date_joined).format(
                                "DD MMM YYYY",
                              )
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  {addProduct?.color_styles?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                        Available colors
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {addProduct.color_styles.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedColor(color)}
                            title={color}
                            aria-label={`Color: ${color}`}
                            className="relative w-8 h-8 rounded-full border-2 border-white transition-transform hover:scale-110"
                            style={{
                              backgroundColor: color,
                              boxShadow:
                                selectedColor === color
                                  ? "0 0 0 2.5px #2563EB"
                                  : "0 0 0 1.5px #CBD5E1",
                            }}
                          >
                            {selectedColor === color && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  width="12"
                                  height="12"
                                  fill="none"
                                  stroke="#fff"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {addProduct?.sizes?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                        Available sizes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {addProduct.sizes.map((size, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reward */}
                  {addProduct?.reward_points > 0 && (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0 text-base">
                        <FaAward />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-widest">
                          Reward points
                        </p>
                        <div className="text-xl font-extrabold text-amber-600">
                          +{addProduct.reward_points} pts
                        </div>
                        <div className="text-[11px] text-amber-700 opacity-70">
                          Earned on purchase
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Tabs: Spec / Sizing / Usage ── */}
            {hasTabContent && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                        activeTab === tab.key ||
                        (!activeTab && tabs[0].key === tab.key)
                          ? "text-blue-600 border-blue-600 font-semibold"
                          : "text-slate-500 border-transparent hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {activeTabData && (
                  <div className="p-6">
                    <div
                      className="text-slate-600 text-sm leading-7 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: activeTabData.content,
                      }}
                    />
                    {activeTabData.images?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                        {activeTabData.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.image_url}
                            alt={`${activeTabData.label} ${i + 1}`}
                            className="w-full rounded-lg border border-slate-200 object-cover aspect-video"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Gallery + Video ── */}
            {(addProduct?.galleryimageone ||
              addProduct?.galleryimagetwo ||
              addProduct?.product_video) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {(addProduct?.galleryimageone ||
                  addProduct?.galleryimagetwo) && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-xs">
                        <FaTag />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Product gallery
                      </h3>
                    </div>
                    <div
                      className="grid gap-px bg-slate-200"
                      style={{
                        gridTemplateColumns:
                          addProduct?.galleryimageone &&
                          addProduct?.galleryimagetwo
                            ? "1fr 1fr"
                            : "1fr",
                      }}
                    >
                      {addProduct?.galleryimageone && (
                        <div className="overflow-hidden bg-slate-50">
                          <img
                            src={addProduct.galleryimageone}
                            alt="Gallery 1"
                            className="w-full aspect-video object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      {addProduct?.galleryimagetwo && (
                        <div className="overflow-hidden bg-slate-50">
                          <img
                            src={addProduct.galleryimagetwo}
                            alt="Gallery 2"
                            className="w-full aspect-video object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {addProduct?.product_video && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center text-xs">
                        <FaPlay />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Product video
                      </h3>
                    </div>
                    <div className="p-5">
                      <video
                        controls
                        className="w-full rounded-xl border border-slate-200 max-h-72"
                      >
                        <source
                          src={addProduct.product_video}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
};

/* ─── Sub-components ── */
const Thumb = ({ src, active, onClick, alt }) => (
  <div
    onClick={onClick}
    className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-slate-50 border-2 transition-colors ${
      active ? "border-blue-500" : "border-transparent hover:border-slate-300"
    }`}
  >
    <img src={src} alt={alt} className="w-full h-full object-contain" />
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 hover:border-blue-200 transition-colors">
    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-[10px] text-slate-400">{label}</div>
      <div className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
        {value ?? "—"}
      </div>
    </div>
  </div>
);

export default SingleProductView;
