import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductViewHeader from "./productViewHeader/ProductViewHeader";
import ProductViewDetails from "./productViewDetails/ProductViewDetails";
import {
  clearProductError,
  singleProductView,
} from "../../redux/features/product/productSlice";

const BaltraProductView = () => {
  const { loading, error, singleProduct } = useSelector(
    (state) => state.product
  );
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { product_id } = useParams();

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

  if (!singleProduct) return null;

  return (
    <div
      className="relative bg-no-repeat bg-cover bg-center"
      style={{ backgroundColor: "#f6f8fa" }}
    >
      <ProductViewHeader isAuthenticated={isAuthenticated} customer={customer} />
      <ProductViewDetails singleProduct={singleProduct} loading={loading} />
    </div>
  );
};

export default BaltraProductView;
