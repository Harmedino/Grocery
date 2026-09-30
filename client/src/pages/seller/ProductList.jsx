import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PackagePlus, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../../contex/AppContex";
import { categoryTint, findCategory } from "../../config/categories";
import { formatPrice } from "../../utils/format";

const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => !q || `${p.name} ${p.category}`.toLowerCase().includes(q));
  }, [products, query]);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(inStock ? "Marked as in stock" : "Marked as out of stock");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Products</h1>
          <p className="mt-1 text-muted">{products.length} products in the shop. Switch off anything you have run out of.</p>
        </div>
        <Link to="/seller/add-product" className="flex h-12 items-center gap-2 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dull">
          <PackagePlus className="size-5" aria-hidden="true" /> Add product
        </Link>
      </div>

      <label className="mt-5 flex h-12 max-w-md items-center gap-2 rounded-xl bg-white px-4 ring-2 ring-line focus-within:ring-primary">
        <Search className="size-5 text-muted" aria-hidden="true" />
        <span className="sr-only">Search products</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-full flex-1 bg-transparent outline-none" />
      </label>

      <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        {list.map((product) => (
          <li key={product._id} className="flex items-center gap-4 p-3 sm:p-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: categoryTint(product.category) }}>
              <img src={product.images?.[0]} alt="" className="size-11 object-contain mix-blend-multiply" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{product.name}</p>
              <p className="text-sm text-muted">
                {product.unit && `${product.unit} · `}
                {findCategory(product.category)?.text || product.category}
              </p>
            </div>
            <p className="hidden w-28 text-right font-extrabold sm:block">{formatPrice(product.offerPrice)}</p>
            <label className="flex cursor-pointer items-center gap-3">
              <span className={`hidden w-24 text-right text-sm font-bold sm:block ${product.inStock ? "text-primary" : "text-accent"}`}>
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
              <input
                type="checkbox"
                className="peer sr-only"
                checked={product.inStock}
                onChange={() => toggleStock(product._id, !product.inStock)}
                aria-label={`${product.name} in stock`}
              />
              <span className="relative h-8 w-14 rounded-full bg-gray-300 transition peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-amber-500 after:absolute after:left-1 after:top-1 after:size-6 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-6" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
