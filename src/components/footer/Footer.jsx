import { useEffect } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FooterImg from "../../assets/images/BALTRALOGO.png";
import {
  baltraCategoryProducts,
  clearProductError,
} from "../../redux/features/product/productSlice";

const STATIC_NAV_COLUMNS = [
  {
    title: "Who We Are",
    links: [
      { label: "About Us", to: "/baltra-readAboutUS" },
      { label: "Contact Us", to: "/baltra-contact-us" },
    ],
  },
  {
    title: "Appliance Care",
    links: [
      { label: "Register a Complaint", to: "/baltra-user-ProductPage" },
      { label: "Track Your Product", to: "/baltra-user-ProductPage" },
    ],
  },
  {
    title: "Best Sellers",
    links: [
      { label: "Air Fryer", to: "/baltra-allProducts" },
      { label: "Heater", to: "/baltra-allProducts" },
      { label: "Air Cooler", to: "/baltra-allProducts" },
      { label: "Bottle", to: "/baltra-allProducts" },
      { label: "Pressure Cooker", to: "/baltra-allProducts" },
      { label: "Water Dispenser", to: "/baltra-allProducts" },
      { label: "Induction", to: "/baltra-allProducts" },
      { label: "Kettle", to: "/baltra-allProducts" },
    ],
  },
  {
    title: "E-Catalog",
    links: [{ label: "Download Catalogues", to: "/baltra-catalog" }],
  },
];

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/baltra.nepal/",
    label: "Instagram",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/BaltraHomeAppliancesNepal",
    label: "Facebook",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@baltra.nepal?lang=en",
    label: "TikTok",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@BaltraHomeProducts",
    label: "YouTube",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/baltra-nepal/",
    label: "LinkedIn",
  },
];

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="
      relative inline-block text-gray-400 text-sm
      font-gothamNarrow mb-2 w-fit
      transition-colors duration-200 hover:text-white
      after:absolute after:left-0 after:bottom-0
      after:h-[1px] after:w-0 after:bg-white
      after:transition-all after:duration-300
      hover:after:w-full
    "
  >
    {children}
  </Link>
);

const Footer = () => {
  const { error, categoryProducts, subcategoryData } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) dispatch(clearProductError());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(baltraCategoryProducts());
  }, [dispatch]);

  const currentYear = new Date().getFullYear();

  /* Dynamic Products column — categories → /baltra-subCategoryProducts/:id */
  const productsColumn = {
    title: "Products",
    links:
      categoryProducts?.length > 0
        ? categoryProducts.map((cat) => ({
            label: cat.name,
            to: `/baltra-subCategoryProducts/${cat.id}`,
          }))
        : [{ label: "All Products", to: "/baltra-allProducts" }],
  };

  /* Dynamic Best Sellers column — subcategories of first category from API */
  const staticBestSellers = STATIC_NAV_COLUMNS.find(
    (c) => c.title === "Best Sellers",
  );
  const bestSellersColumn = {
    title: "Best Sellers",
    links:
      subcategoryData?.length > 0
        ? subcategoryData.map((sub) => ({
            label: sub.name,
            to: `/baltra-allProducts?subcategory=${sub.id}`,
          }))
        : staticBestSellers.links,
  };

  /* Final column order */
  const allColumns = [
    STATIC_NAV_COLUMNS[0], // Who We Are
    productsColumn, // Dynamic categories
    STATIC_NAV_COLUMNS[1], // Appliance Care
    bestSellersColumn, // Dynamic subcategories
    STATIC_NAV_COLUMNS[3], // E-Catalog
  ];

  return (
    <footer className="bg-[#000C13] w-full">
      <div className="py-12 px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-10">
          {allColumns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col font-gothamNarrow w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] lg:w-auto"
            >
              <h2 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                {col.title}
              </h2>
              {col.links.map((link) => (
                <FooterLink key={link.label} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          ))}

          {/* Get in Touch */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] lg:w-auto">
            <h2 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Get in Touch
            </h2>
            <a
              href="mailto:info@balajeenp.com"
              className="
                relative flex items-center gap-2 text-gray-400 text-sm mb-2 w-fit
                font-gothamNarrow transition-colors duration-200 hover:text-white
                after:absolute after:left-0 after:bottom-0
                after:h-[1px] after:w-0 after:bg-white
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              <AiOutlineMail className="flex-shrink-0" />
              info@balajeenp.com
            </a>
            <a
              href="tel:+97715970088"
              className="
                relative flex items-center gap-2 text-gray-400 text-sm mb-2 w-fit
                font-gothamNarrow transition-colors duration-200 hover:text-white
                after:absolute after:left-0 after:bottom-0
                after:h-[1px] after:w-0 after:bg-white
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              <AiOutlinePhone className="flex-shrink-0" />
              +977-15970088
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 xl:px-32">
        <hr className="border-gray-800" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-6 font-gothamNarrow">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs order-3 lg:order-1 text-center lg:text-left">
            &copy; {currentYear}{" "}
            <span className="text-gray-300 font-semibold">Baltra&reg;</span> —
            All rights reserved.
          </p>

          <Link to="/" className="order-1 lg:order-2 flex-shrink-0">
            <img
              src={FooterImg}
              alt="Baltra Logo"
              className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>

          <div className="flex items-center gap-4 order-2 lg:order-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Baltra on ${label}`}
                className="text-gray-500 transition-all duration-200 hover:text-white hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-1 mt-4 pt-4 border-t border-gray-800">
          {[
            { label: "Privacy Policy", to: "/baltra/privacy-policy" },
            { label: "Terms of Service", to: "/baltra-term-of-use" },
          ].map(({ label, to }) => (
            <a
              key={label}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-xs font-gothamNarrow hover:text-gray-300 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
