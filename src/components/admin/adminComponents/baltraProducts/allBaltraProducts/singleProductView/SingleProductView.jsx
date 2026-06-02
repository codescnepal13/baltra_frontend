import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaAward,
  FaCalendarAlt,
  FaCheck,
  FaCog,
  FaPlay,
  FaShoppingCart,
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
  const { loading, error, addProduct } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("specifications");
  const [imageZoomed, setImageZoomed] = useState(false);

  const handleColorSelection = (color) => setSelectedColor(color);
  const handleImageSelect = (imageUrl) => setSelectedImage(imageUrl);

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(singleProductView(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (addProduct?.main_image) setSelectedImage(addProduct.main_image);
  }, [addProduct]);

  const hasTabContent =
    addProduct?.specification || addProduct?.sizing || addProduct?.usage;

  const tabs = [
    addProduct?.specification && {
      key: "specifications",
      label: "Specifications",
      color: "#2563EB",
      content: addProduct?.specification,
      images: addProduct?.specification_images,
    },
    addProduct?.sizing && {
      key: "sizing",
      label: "Sizing",
      color: "#16A34A",
      content: addProduct?.sizing,
      images: addProduct?.sizing_images,
    },
    addProduct?.usage && {
      key: "usage",
      label: "Usage",
      color: "#7C3AED",
      content: addProduct?.usage,
      images: addProduct?.usage_images,
    },
  ].filter(Boolean);

  const activeTabData = tabs.find((t) => t.key === activeTab) || tabs[0];

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-SingleProductView" />

      <style>{`
        .spv-root {
          font-family: 'Inter', system-ui, sans-serif;
          background: #F8FAFC;
          min-height: 100vh;
        }

        /* ── Header ── */
        .spv-header {
          background: #fff;
          border-bottom: 1px solid #E2E8F0;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .spv-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .spv-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #2563EB;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .spv-back-btn:hover { background: #EFF6FF; }
        .spv-header-divider {
          width: 1px;
          height: 20px;
          background: #E2E8F0;
        }
        .spv-header-title {
          font-size: 16px;
          font-weight: 600;
          color: #0F172A;
          margin: 0;
        }

        /* ── Page wrapper ── */
        .spv-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Hero card ── */
        .spv-hero {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
        }
        .spv-hero-top {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #F1F5F9;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .spv-product-name {
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .spv-product-sub {
          font-size: 15px;
          color: #64748B;
          margin: 0;
        }
        .spv-price-block {
          text-align: right;
          flex-shrink: 0;
        }
        .spv-price {
          font-size: 28px;
          font-weight: 800;
          color: #DC2626;
          letter-spacing: -0.5px;
        }
        .spv-price-label {
          font-size: 12px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .spv-stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          margin-top: 6px;
        }
        .spv-stock-badge.in-stock {
          background: #F0FDF4;
          color: #16A34A;
          border: 1px solid #BBF7D0;
        }
        .spv-stock-badge.out-stock {
          background: #FFF1F2;
          color: #DC2626;
          border: 1px solid #FECDD3;
        }

        /* ── Main grid ── */
        .spv-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }
        @media (max-width: 900px) {
          .spv-main-grid { grid-template-columns: 1fr; }
        }

        /* ── Image pane ── */
        .spv-image-main {
          position: relative;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          cursor: zoom-in;
          aspect-ratio: 1;
        }
        .spv-image-main img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .spv-image-main:hover img { transform: scale(1.04); }
        .spv-warranty-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 56px;
          height: 56px;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));
        }
        .spv-thumbs {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .spv-thumb {
          width: 68px;
          height: 68px;
          flex-shrink: 0;
          border-radius: 10px;
          border: 2px solid transparent;
          background: #F8FAFC;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s;
        }
        .spv-thumb:hover { transform: translateY(-2px); }
        .spv-thumb.active { border-color: #2563EB; }
        .spv-thumb img { width: 100%; height: 100%; object-fit: contain; }

        /* ── Info pane ── */
        .spv-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .spv-info-grid.full { grid-template-columns: 1fr; }
        .spv-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 12px 14px;
          transition: border-color 0.15s;
        }
        .spv-info-item:hover { border-color: #93C5FD; }
        .spv-info-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563EB;
          flex-shrink: 0;
          font-size: 14px;
        }
        .spv-info-label {
          font-size: 11px;
          font-weight: 500;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .spv-info-value {
          font-size: 14px;
          font-weight: 600;
          color: #0F172A;
          margin-top: 1px;
        }

        /* ── Section headings ── */
        .spv-section-heading {
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin: 0 0 10px;
        }

        /* ── Color swatches ── */
        .spv-colors-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .spv-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }
        .spv-swatch {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 0 0 1.5px #CBD5E1;
          transition: box-shadow 0.15s, transform 0.15s;
          position: relative;
        }
        .spv-swatch:hover { transform: scale(1.1); }
        .spv-swatch.active { box-shadow: 0 0 0 2.5px #2563EB; }
        .spv-swatch-check {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Size pills ── */
        .spv-sizes-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .spv-size-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .spv-size-pill {
          padding: 6px 14px;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }
        .spv-size-pill:hover {
          border-color: #2563EB;
          color: #2563EB;
          background: #EFF6FF;
        }

        /* ── Reward banner ── */
        .spv-reward {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
          border: 1px solid #FDE68A;
          border-radius: 12px;
          padding: 12px 16px;
        }
        .spv-reward-icon {
          width: 36px;
          height: 36px;
          background: #F59E0B;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 16px;
          flex-shrink: 0;
        }
        .spv-reward-text {
          font-size: 14px;
          font-weight: 600;
          color: #92400E;
        }
        .spv-reward-pts {
          font-size: 20px;
          font-weight: 800;
          color: #D97706;
        }

        /* ── Tab section ── */
        .spv-tabs-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
        }
        .spv-tab-bar {
          display: flex;
          border-bottom: 1px solid #E2E8F0;
          background: #F8FAFC;
          padding: 0 1.5rem;
          gap: 4px;
        }
        .spv-tab-btn {
          padding: 14px 18px;
          font-size: 14px;
          font-weight: 500;
          color: #64748B;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          margin-bottom: -1px;
        }
        .spv-tab-btn.active {
          color: #2563EB;
          border-bottom-color: #2563EB;
          font-weight: 600;
        }
        .spv-tab-btn:hover:not(.active) { color: #0F172A; }
        .spv-tab-content {
          padding: 1.75rem 2rem;
        }
        .spv-tab-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 1.25rem;
        }
        .spv-tab-images img {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          object-fit: cover;
        }
        .spv-prose { color: #334155; font-size: 15px; line-height: 1.7; }

        /* ── Gallery ── */
        .spv-gallery-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
        }
        .spv-gallery-header {
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spv-gallery-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }
        .spv-gallery-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0F172A;
        }
        .spv-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #E2E8F0;
        }
        .spv-gallery-item {
          background: #F8FAFC;
          overflow: hidden;
        }
        .spv-gallery-item img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .spv-gallery-item:hover img { transform: scale(1.03); }
        @media (max-width: 600px) {
          .spv-gallery-grid { grid-template-columns: 1fr; }
        }

        /* ── Video ── */
        .spv-video-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
        }
        .spv-video-header {
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .spv-video-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }
        .spv-video-icon {
          width: 30px;
          height: 30px;
          background: #DC2626;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 11px;
        }
        .spv-video-body { padding: 1.5rem; }
        .spv-video-body video {
          width: 100%;
          border-radius: 12px;
          max-height: 420px;
          border: 1px solid #E2E8F0;
        }
      `}</style>

      <div className="spv-root">
        {/* ── Sticky Header ── */}
        <header className="spv-header">
          <div className="spv-header-inner">
            <Link
              to="/baltra-admin-dashboard/all-products-list"
              className="spv-back-btn"
            >
              <HiOutlineArrowLeftCircle size={20} />
              Back
            </Link>
            <div className="spv-header-divider" />
            <h1 className="spv-header-title">Product Details</h1>
          </div>
        </header>

        {loading ? (
          <ProductViewSkeleton />
        ) : (
          <main className="spv-page">
            {/* ── Hero Card ── */}
            <div className="spv-hero">
              {/* Name + Price row */}
              <div className="spv-hero-top">
                <div>
                  <h2 className="spv-product-name">{addProduct?.name}</h2>
                  <p className="spv-product-sub">{addProduct?.sub_heading}</p>
                </div>
                <div className="spv-price-block">
                  <div className="spv-price-label">Price</div>
                  <div className="spv-price">
                    Rs. {addProduct?.price?.toLocaleString()}
                  </div>
                  {addProduct?.stocks > 0 ? (
                    <span className="spv-stock-badge in-stock">
                      <FaCheck size={9} />
                      In Stock &nbsp;({addProduct?.stocks})
                    </span>
                  ) : (
                    <span className="spv-stock-badge out-stock">
                      <FaTimes size={9} />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Main content grid */}
              <div className="spv-main-grid">
                {/* ── Left: Images ── */}
                <div>
                  <div className="spv-image-main">
                    <img
                      src={selectedImage || addProduct?.main_image}
                      alt={addProduct?.name}
                    />
                    {addProduct?.warranty_icon && (
                      <img
                        className="spv-warranty-badge"
                        src={addProduct?.warranty_icon}
                        alt="Warranty"
                      />
                    )}
                  </div>

                  {addProduct?.images?.length > 0 && (
                    <div className="spv-thumbs">
                      <div
                        className={`spv-thumb ${
                          selectedImage === addProduct?.main_image
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleImageSelect(addProduct?.main_image)
                        }
                      >
                        <img src={addProduct?.main_image} alt="Main" />
                      </div>
                      {addProduct?.images?.map((img, i) => (
                        <div
                          key={i}
                          className={`spv-thumb ${
                            selectedImage === img.image_url ? "active" : ""
                          }`}
                          onClick={() => handleImageSelect(img.image_url)}
                        >
                          <img src={img.image_url} alt={`Variant ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Right: Info ── */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  {/* Category */}
                  <div>
                    <p className="spv-section-heading">Category</p>
                    <div className="spv-info-grid full">
                      <InfoItem
                        icon={<FaTag />}
                        label="Category"
                        value={addProduct?.category?.category_name}
                      />
                      <InfoItem
                        icon={<FaTag />}
                        label="Sub Category"
                        value={addProduct?.sub_category?.sub_category_name}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <p className="spv-section-heading">Product Details</p>
                    <div className="spv-info-grid">
                      <InfoItem
                        icon={<FaCog />}
                        label="Model Name"
                        value={addProduct?.model_name}
                      />
                      <InfoItem
                        icon={<FaCog />}
                        label="Model Number"
                        value={addProduct?.model_num}
                      />
                      <InfoItem
                        icon={<FaCog />}
                        label="Power"
                        value={addProduct?.power}
                      />
                      <InfoItem
                        icon={<FaAward />}
                        label="Warranty"
                        value={`${addProduct?.warranty} months`}
                      />
                      <InfoItem
                        icon={<FaShoppingCart />}
                        label="Packaging"
                        value={addProduct?.packaging}
                      />
                      <InfoItem
                        icon={<FaCalendarAlt />}
                        label="Created"
                        value={moment(addProduct?.date_joined).format(
                          "DD MMM YYYY",
                        )}
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  {addProduct?.color_styles?.length > 0 && (
                    <div className="spv-colors-box">
                      <p className="spv-section-heading" style={{ margin: 0 }}>
                        Available Colors
                      </p>
                      <div className="spv-swatches">
                        {addProduct.color_styles.map((color, i) => (
                          <div
                            key={i}
                            className={`spv-swatch ${selectedColor === color ? "active" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelection(color)}
                            title={color}
                          >
                            {selectedColor === color && (
                              <div className="spv-swatch-check">
                                <svg
                                  width="16"
                                  height="16"
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
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {addProduct?.sizes?.length > 0 && (
                    <div className="spv-sizes-box">
                      <p className="spv-section-heading" style={{ margin: 0 }}>
                        Available Sizes
                      </p>
                      <div className="spv-size-pills">
                        {addProduct.sizes.map((size, i) => (
                          <div key={i} className="spv-size-pill">
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reward */}
                  {addProduct?.reward_points > 0 && (
                    <div className="spv-reward">
                      <div className="spv-reward-icon">
                        <FaAward />
                      </div>
                      <div>
                        <div
                          className="spv-section-heading"
                          style={{ margin: 0 }}
                        >
                          Reward Points
                        </div>
                        <div className="spv-reward-pts">
                          +{addProduct.reward_points} pts
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Tabs: Spec / Sizing / Usage ── */}
            {hasTabContent && tabs.length > 0 && (
              <div className="spv-tabs-card">
                <div className="spv-tab-bar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`spv-tab-btn ${
                        (activeTab || tabs[0]?.key) === tab.key ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {activeTabData && (
                  <div className="spv-tab-content">
                    <div
                      className="spv-prose"
                      dangerouslySetInnerHTML={{
                        __html: activeTabData.content,
                      }}
                    />
                    {activeTabData.images?.length > 0 && (
                      <div className="spv-tab-images">
                        {activeTabData.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.image_url}
                            alt={`${activeTabData.label} ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Gallery ── */}
            {(addProduct?.galleryimageone || addProduct?.galleryimagetwo) && (
              <div className="spv-gallery-card">
                <div className="spv-gallery-header">
                  <div className="spv-gallery-dot" />
                  <h3>Product Gallery</h3>
                </div>
                <div
                  className="spv-gallery-grid"
                  style={{
                    gridTemplateColumns:
                      addProduct?.galleryimageone && addProduct?.galleryimagetwo
                        ? "1fr 1fr"
                        : "1fr",
                  }}
                >
                  {addProduct?.galleryimageone && (
                    <div className="spv-gallery-item">
                      <img src={addProduct.galleryimageone} alt="Gallery 1" />
                    </div>
                  )}
                  {addProduct?.galleryimagetwo && (
                    <div className="spv-gallery-item">
                      <img src={addProduct.galleryimagetwo} alt="Gallery 2" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Video ── */}
            {addProduct?.product_video && (
              <div className="spv-video-card">
                <div className="spv-video-header">
                  <div className="spv-video-icon">
                    <FaPlay />
                  </div>
                  <h3>Product Video</h3>
                </div>
                <div className="spv-video-body">
                  <video controls>
                    <source src={addProduct.product_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
};

/* ── Reusable InfoItem ── */
const InfoItem = ({ icon, label, value }) => (
  <div className="spv-info-item">
    <div className="spv-info-icon">{icon}</div>
    <div>
      <div className="spv-info-label">{label}</div>
      <div className="spv-info-value">{value ?? "—"}</div>
    </div>
  </div>
);

export default SingleProductView;
