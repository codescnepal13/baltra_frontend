import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArtCoverImg from "../../assets/images/userAuthImg.png";
import MetaData from "../../components/layout/metaData/MetaData";
import ProductHeader from "../../components/topHeader/productHeader/ProductHeader";
import {
  allProductsCatalog,
  clearProductError,
} from "../../redux/features/product/productSlice";
import CatalogSkeleton from "./CatalogSkeleton";
import PdfModal from "./pdfModal/PdfModal";

// ─── RippleButton ────────────────────────────────────────────────────────────
const RippleButton = memo(
  ({ label, onClick, disabled = false, variant = "dark" }) => {
    const [ripple, setRipple] = useState(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = useCallback((e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHovered(false);
      setRipple(null);
    }, []);

    return (
      <motion.button
        whileTap={disabled ? {} : { scale: 0.97 }}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full py-3 relative overflow-hidden transition-colors duration-200"
        style={{
          border: "1px solid rgba(74, 122, 138, 0.4)",
          background: hovered ? "transparent" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Ripple fill */}
        <AnimatePresence>
          {hovered && ripple && (
            <motion.span
              key="ripple"
              className="absolute rounded-full pointer-events-none"
              style={{
                top: ripple.y,
                left: ripple.x,
                translateX: "-50%",
                translateY: "-50%",
                backgroundColor: variant === "dark" ? "#071C2E" : "#0D2233",
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 700, height: 700, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <span
          className="relative z-10 text-sm font-semibold tracking-widest uppercase font-gothamNarrow transition-colors duration-200"
          style={{ color: hovered ? "#90C4D0" : "#202D31" }}
        >
          {label}
        </span>
      </motion.button>
    );
  },
);

RippleButton.displayName = "RippleButton";

// ─── CatalogCard ─────────────────────────────────────────────────────────────
const CatalogCard = memo(
  ({ catalog, onExplore, onDownload, onPreview, isDownloading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-full items-center gap-4" // ← h-full + flex col
    >
      {/* Catalog Image — grows to fill available height */}
      <div
        className="relative group cursor-pointer w-full flex-1 min-h-0" // ← flex-1 min-h-0
        onClick={() => onPreview(catalog)}
      >
        <img
          src={catalog.catalogue_image}
          alt={catalog.catalogue_type}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
            padding: "6px",
            background: "#fff",
          }}
          loading="lazy"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(7, 24, 36, 0.55)" }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#90C4D0" }}
          >
            Preview
          </span>
        </div>
      </div>

      {/* Title — fixed min-height so 1-line vs 2-line titles don't shift buttons */}
      <h3
        className="text-center text-sm sm:text-base font-medium tracking-wide font-gothamNarrow w-full"
        style={{ color: "#202D31", minHeight: "2.5rem" }} // ← minHeight
      >
        {catalog.catalogue_type}
      </h3>

      {/* Buttons — always at bottom */}
      <div className="flex flex-col w-full gap-2 mt-auto">
        {" "}
        {/* ← mt-auto */}
        <RippleButton label="Explore" onClick={() => onExplore(catalog.file)} />
        <RippleButton
          label={isDownloading ? "Downloading…" : "Download"}
          onClick={() => onDownload(catalog.file)}
          disabled={isDownloading}
        />
      </div>
    </motion.div>
  ),
);

CatalogCard.displayName = "CatalogCard";

// ─── BaltraCatalog ────────────────────────────────────────────────────────────
const BaltraCatalog = () => {
  const { loading, error, allProductsCatalogList } = useSelector(
    (state) => state.product,
  );
  const { isAuthenticated, customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    if (error) dispatch(clearProductError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(allProductsCatalog());
  }, [dispatch]);

  const handlePreview = useCallback((catalog) => {
    setSelectedCatalog(catalog);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedCatalog(null);
  }, []);

  const handleExplore = useCallback((pdfUrl) => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  }, []);

  const handleDownload = useCallback(
    async (pdfUrl, catalogId) => {
      if (downloadingId) return;
      try {
        setDownloadingId(catalogId);
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `catalog-${catalogId || "baltra"}.pdf`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download failed:", err);
        alert("Failed to download. Please try again.");
      } finally {
        setDownloadingId(null);
      }
    },
    [downloadingId],
  );

  return (
    <>
      <MetaData title="Baltra Products Catalog" />

      {/* Page wrapper with bg image */}
      <div className="relative min-h-screen">
        {/* Background image — full-bleed, no dim, matches About page pattern */}
        <img
          src={ArtCoverImg}
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
          style={{ maxWidth: "none" }}
          loading="lazy"
        />

        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-50">
          <ProductHeader
            isAuthenticated={isAuthenticated}
            customer={customer}
          />
        </div>

        {/* Page Content */}
        <main className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-24 pb-16 min-h-screen">
          {/* Soft scrim — keeps catalog cards readable over the bright image */}
          <div className="absolute inset-0 bg-white/20 -z-10" />
          {loading ? (
            <CatalogSkeleton />
          ) : allProductsCatalogList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {allProductsCatalogList.map((catalog, index) => (
                <motion.div
                  key={catalog.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  className="h-full" // ← add this
                >
                  <CatalogCard
                    catalog={catalog}
                    onPreview={handlePreview}
                    onExplore={handleExplore}
                    onDownload={(url) => handleDownload(url, catalog.id)}
                    isDownloading={downloadingId === catalog.id}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <span className="text-4xl opacity-20">📂</span>
              <p
                className="text-sm tracking-widest uppercase"
                style={{ color: "#6A90A0" }}
              >
                No catalogs available
              </p>
            </div>
          )}
        </main>
      </div>
      {/* end page wrapper */}

      {/* PDF Modal — outside wrapper so it overlays the full viewport */}
      <PdfModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        catalog={selectedCatalog}
      />
    </>
  );
};

export default BaltraCatalog;
