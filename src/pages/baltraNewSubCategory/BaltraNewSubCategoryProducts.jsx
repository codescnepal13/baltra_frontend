import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import Breadcrumb from "../../components/layout/Breadcrumb";
import MetaData from "../../components/layout/metaData/MetaData";
import {
  baltraSubCategoryProducts,
  clearProductError,
} from "../../redux/features/product/productSlice";
import BaltraNewSubCategoryBanner from "./BaltraNewSubCategoryBanner";
import BaltraNewSubCategoryLayout from "./BaltraNewSubCategoryLayout";

const BaltraNewSubCategoryProducts = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const { loading, subCategoryProducts, categoryInfo } = useSelector(
    (state) => state.product,
  );

  // The selected subcategory now lives in the URL (?sub=id) instead of only
  // in component state. That's what makes the browser back button behave:
  // clicking a product pushes a new history entry, so going back returns to
  // this exact URL — and because the subcategory id is part of that URL, we
  // can restore the same product list instead of defaulting to the
  // top-level "All categories" tile view.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get("sub");

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!category_id) return;

    dispatch(clearProductError());
    dispatch(baltraSubCategoryProducts(category_id));

    // Only clear the subcategory selection when the category itself changes
    // (a real navigation to a different category page) — not on first
    // mount, since first mount is exactly when a `sub` param restored from
    // browser history needs to be honored, not wiped.
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [dispatch, category_id]);

  const subCategories = subCategoryProducts || [];

  const activeSubCategory = useMemo(
    () => subCategories.find((sc) => String(sc.id) === activeId) || null,
    [subCategories, activeId],
  );

  const handleSelect = (id) => {
    if (id === null || id === undefined) {
      setSearchParams({});
    } else {
      setSearchParams({ sub: id });
    }
  };

  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Home", to: "/baltra-aboutUs-Page" }];
    if (categoryInfo?.category_name) {
      items.push({
        label: categoryInfo.category_name,
        onClick: () => handleSelect(null),
      });
    }
    if (activeSubCategory) {
      items.push({ label: activeSubCategory.name });
    }
    return items;
  }, [categoryInfo, activeSubCategory]);

  return (
    <>
      <MetaData
        title={
          activeSubCategory?.name
            ? `${activeSubCategory.name} | Baltra`
            : categoryInfo?.category_name
              ? `${categoryInfo.category_name} | Baltra`
              : "Baltra New SubCategory Products"
        }
      />
      <BaltraNewSubCategoryBanner categoryInfo={categoryInfo} />
      <Breadcrumb items={breadcrumbItems} />

      <BaltraNewSubCategoryLayout
        loading={loading}
        subCategories={subCategories}
        categoryInfo={categoryInfo}
        activeId={activeId}
        onSelect={handleSelect}
        activeSubCategory={activeSubCategory}
      />
    </>
  );
};

export default BaltraNewSubCategoryProducts;
