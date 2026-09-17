import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import MetaData from "../../components/layout/metaData/MetaData";
import ProductHeader from "../../components/topHeader/productHeader/ProductHeader";
import {
  clearProductError,
  singleProductView,
} from "../../redux/features/product/productSlice";
import ProductViewDetails from "./productViewDetails/ProductViewDetails";

const SITE_URL = "https://np.baltra.in";
const MAX_DESCRIPTION_LENGTH = 160;

const truncate = (text, max) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
};

const BaltraProductView = () => {
  const { loading, error, singleProduct, statRatingReview } = useSelector(
    (state) => state.product,
  );
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { product_id } = useParams();
  const location = useLocation(); // gives the real path regardless of route pattern

  useEffect(() => {
    if (product_id) {
      dispatch(singleProductView(product_id));
    }
  }, [dispatch, product_id]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [error, dispatch]);

  const canonicalUrl = `${SITE_URL}${location.pathname}`;

  const seo = useMemo(() => {
    if (!singleProduct) return null;

    const {
      id,
      name,
      model_name,
      model_num,
      sub_heading,
      main_image,
      images,
      price,
      category,
      sub_category,
      in_stock,
      warranty,
    } = singleProduct;

    const { average_rating, total_reviews } = statRatingReview || {};

    const modelLabel = [model_name, model_num].filter(Boolean).join(" ");

    const title = `${name}${modelLabel ? ` - ${modelLabel}` : ""} | Buy Online in Nepal | Baltra`;

    const rawDescription =
      sub_heading ||
      `Buy ${name}${modelLabel ? ` (${modelLabel})` : ""}${
        sub_category?.sub_category_name
          ? ` ${sub_category.sub_category_name}`
          : ""
      } online in Nepal at the best price from Baltra, Nepal's original home appliance brand since 1994.${
        warranty ? ` ${warranty} year warranty.` : ""
      } Nationwide delivery.`;

    const description = truncate(rawDescription, MAX_DESCRIPTION_LENGTH);

    const keywords = [
      name,
      model_name,
      model_num,
      category?.category_name,
      sub_category?.sub_category_name,
      "Baltra Nepal",
      `${name} price in Nepal`,
    ]
      .filter(Boolean)
      .join(", ");

    const image = main_image || images?.[0]?.image_url;
    const allImages = [
      image,
      ...(images?.map((img) => img.image_url) || []),
    ].filter(Boolean);

    const breadcrumbs = [
      { name: "Home", url: `${SITE_URL}/` },
      ...(category
        ? [
            {
              name: category.category_name,
              url: `${SITE_URL}/category/${category.id}`,
            },
          ]
        : []),
      ...(sub_category
        ? [
            {
              name: sub_category.sub_category_name,
              url: `${SITE_URL}/subcategory/${sub_category.id}`,
            },
          ]
        : []),
      { name, url: canonicalUrl },
    ];

    const priceValidUntil = new Date();
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

    const isInStock = in_stock !== false;

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name,
      image: allImages,
      description,
      sku: model_num,
      brand: { "@type": "Brand", name: "Baltra" },
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "NPR",
        price: price != null ? Number(price).toFixed(2) : undefined,
        priceValidUntil: priceValidUntil.toISOString().split("T")[0],
        availability: isInStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      ...(average_rating &&
        total_reviews > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average_rating,
            reviewCount: total_reviews,
          },
        }),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };

    return {
      id,
      title,
      description,
      keywords,
      image,
      breadcrumbs,
      productSchema,
      breadcrumbSchema,
      robots: isInStock ? "index, follow" : "noindex, follow",
    };
  }, [singleProduct, statRatingReview, canonicalUrl]);

  if (!singleProduct) return null;

  return (
    <div
      className="relative bg-no-repeat bg-cover bg-center"
      style={{ backgroundColor: "#f6f8fa" }}
    >
      {seo && (
        <MetaData
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          url={canonicalUrl}
          robots={seo.robots}
          ogTitle={seo.title}
          ogDescription={seo.description}
          ogImage={seo.image}
          ogUrl={canonicalUrl}
          ogType="product"
          twitterCard="summary_large_image"
          extraSchemas={[seo.productSchema, seo.breadcrumbSchema]}
        />
      )}
      <ProductHeader isAuthenticated={isAuthenticated} customer={customer} />
      <ProductViewDetails singleProduct={singleProduct} loading={loading} />
    </div>
  );
};

export default BaltraProductView;
