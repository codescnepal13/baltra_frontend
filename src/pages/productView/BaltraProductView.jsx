import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductHeader from "../../components/topHeader/productHeader/ProductHeader";
import {
  clearProductError,
  singleProductView,
} from "../../redux/features/product/productSlice";
import ProductViewDetails from "./productViewDetails/ProductViewDetails";

const BaltraProductView = () => {
  const { loading, error, singleProduct } = useSelector(
    (state) => state.product,
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
      <ProductHeader isAuthenticated={isAuthenticated} customer={customer} />
      <ProductViewDetails singleProduct={singleProduct} loading={loading} />
    </div>
  );
};

export default BaltraProductView;
