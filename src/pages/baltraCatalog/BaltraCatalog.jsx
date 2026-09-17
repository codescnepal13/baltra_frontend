import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
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

const SITE_URL = "https://np.baltra.in";
const PAGE_PATH = "/baltra-catalog"; // update to match your real route

// ─── RippleButton ────────────────────────────────────────────────────────────
const RippleButton = memo(
  ({ label, onClick, disabled = false, variant = "primary" }) => {
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

    const isPrimary = variant === "primary";

    return (
      <motion.button
        whileTap={disabled ? {} : { scale: 0.97 }}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full py-3 relative overflow-hidden transition-colors duration-200"
        style={{
          border: isPrimary
            ? "1px solid #C0161F"
            : "1px solid rgba(192, 22, 31, 0.55)",
          background: isPrimary
            ? hovered
              ? "#8B0000"
              : "#C0161F"
            : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
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
                backgroundColor: isPrimary ? "#6B0000" : "#1A0C0C",
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
          style={{
            color: isPrimary ? "#F2EAEA" : hovered ? "#F2EAEA" : "#C0161F",
          }}
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
      className="flex flex-col h-full items-center gap-4"
      style={{ padding: "14px" }}
    >
      <div
        className="relative group cursor-pointer w-full flex-1 min-h-0"
        onClick={() => onPreview(catalog)}
      >
        <img
          src={catalog.catalogue_image}
          alt={`${catalog.catalogue_type} - Baltra Nepal product catalog`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ border: "none", outline: "none", boxShadow: "none" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(120, 8, 12, 0.62)" }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#F2EAEA", letterSpacing: "0.2em" }}
          >
            Preview
          </span>
        </div>
      </div>

      <h3
        className="text-center text-sm sm:text-base font-medium tracking-wide font-gothamNarrow w-full"
        style={{ color: "#000000", minHeight: "2.5rem" }}
      >
        {catalog.catalogue_type}
      </h3>

      <div
        style={{
          width: "40px",
          height: "2px",
          background: "linear-gradient(90deg, #C0161F, #FF4D55)",
          borderRadius: "2px",
          marginTop: "-8px",
        }}
      />

      <div className="flex flex-col w-full gap-2 mt-auto">
        <RippleButton
          variant="primary"
          label="Explore"
          onClick={() => onExplore(catalog.file)}
        />
        <RippleButton
          variant="secondary"
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

  // Build page-specific keywords from whatever catalog types actually
  // exist, instead of a fixed generic keyword string.
  const dynamicKeywords = useMemo(() => {
    const base = [
      "Baltra",
      "Baltra Nepal",
      "Baltra product catalog",
      "Baltra catalogue Nepal",
      "Baltra kitchen appliances catalog",
      "Baltra brochure",
      "download Baltra catalog PDF",
    ];
    const fromList =
      allProductsCatalogList?.map((c) => `${c.catalogue_type} catalog`) || [];
    return [...base, ...fromList].join(", ");
  }, [allProductsCatalogList]);

  // ItemList schema — one entry per catalog PDF, so each is understood as
  // a distinct downloadable item rather than the page being one blob.
  const catalogItemListSchema = useMemo(() => {
    if (!allProductsCatalogList?.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Baltra Nepal Product Catalogs",
      itemListElement: allProductsCatalogList.map((catalog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "DigitalDocument",
          name: `Baltra ${catalog.catalogue_type} Catalog`,
          url: catalog.file,
          image: catalog.catalogue_image,
          encodingFormat: "application/pdf",
        },
      })),
    };
  }, [allProductsCatalogList]);

  return (
    <>
      <MetaData
        title="Baltra Product Catalog | Download Full Appliance Range PDF"
        description="Browse and download Baltra Nepal's complete product catalogs — kitchen appliances, home appliances, and more. View online or download the full PDF brochure for the latest Baltra range in Nepal."
        keywords={dynamicKeywords}
        url={`${SITE_URL}${PAGE_PATH}`}
        image={
          allProductsCatalogList?.[0]?.catalogue_image ||
          `${SITE_URL}/images/baltraAllProductsBanner.png`
        }
        ogTitle="Baltra Product Catalog | Download Full Appliance Range PDF"
        ogDescription="Explore Baltra Nepal's full range of home and kitchen appliances. Download official product catalogs in PDF."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Product Catalog", url: PAGE_PATH },
        ]}
        extraSchemas={
          catalogItemListSchema ? [catalogItemListSchema] : undefined
        }
      />

      {/* Page wrapper with bg image */}
      <div className="relative min-h-screen">
        <img
          src={ArtCoverImg}
          alt="ArtImage"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
          style={{ maxWidth: "none" }}
          loading="lazy"
        />

        <div className="absolute top-0 left-0 w-full z-50">
          <ProductHeader
            isAuthenticated={isAuthenticated}
            customer={customer}
          />
        </div>

        <main className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-24 pb-16 min-h-screen">
          <div className="absolute inset-0 bg-white/20 -z-10" />

          {/* SEO-visible heading — the page had no <h1>, and everything else
              is images/buttons with no crawlable body text explaining what
              the page is. */}
          <h1 className="sr-only">
            Baltra Nepal Product Catalog — Download Kitchen and Home Appliance
            Brochures
          </h1>

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
                  className="h-full"
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

      <PdfModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        catalog={selectedCatalog}
      />
    </>
  );
};

export default BaltraCatalog;
