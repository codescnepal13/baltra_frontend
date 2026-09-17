import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!category_id) return;

    dispatch(clearProductError());
    dispatch(baltraSubCategoryProducts(category_id));
    setActiveId(null); // reset selection when category changes
  }, [dispatch, category_id]);

  const subCategories = subCategoryProducts || [];

  const activeSubCategory = useMemo(
    () => subCategories.find((sc) => sc.id === activeId) || null,
    [subCategories, activeId],
  );

  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Home", to: "/" }];
    if (categoryInfo?.category_name) {
      items.push({
        label: categoryInfo.category_name,
        onClick: () => setActiveId(null),
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
        onSelect={setActiveId}
        activeSubCategory={activeSubCategory}
      />
    </>
  );
};

export default BaltraNewSubCategoryProducts;
