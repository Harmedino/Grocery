import { useParams } from "react-router-dom";
import ProductListing from "../components/ProductListing";

const ProductCategory = () => {
  const { category } = useParams();
  // key resets paging/sort when switching categories
  return <ProductListing key={category} category={category} />;
};

export default ProductCategory;
