import ProductCard from "./ProductCard";

export const gridClass = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5";

const SkeletonCard = () => (
  <div className="rounded-2xl bg-white p-3 ring-1 ring-line">
    <div className="aspect-square animate-pulse rounded-xl bg-gray-100" />
    <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-gray-100" />
    <div className="mt-2 h-5 w-4/5 animate-pulse rounded bg-gray-100" />
    <div className="mt-3 h-12 animate-pulse rounded-xl bg-gray-100" />
  </div>
);

// Compact mode (home page): 6 items on phones, 8 on laptops, 10 on wide screens
const compactVisibility = (index) => (index >= 8 ? "max-xl:hidden" : index >= 6 ? "max-lg:hidden" : "");

const ProductGrid = ({ products, loading = false, skeletons = 10, compact = false }) => (
  <div className={gridClass}>
    {loading
      ? Array.from({ length: skeletons }, (_, i) => (
          <div key={i} className={compact ? compactVisibility(i) : ""}>
            <SkeletonCard />
          </div>
        ))
      : products.map((product, i) => (
          <div key={product._id} className={compact ? compactVisibility(i) : ""}>
            <ProductCard product={product} />
          </div>
        ))}
  </div>
);

export default ProductGrid;
