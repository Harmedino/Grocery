import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../contex/AppContex";
import { categories, findCategory } from "../config/categories";
import { discountPercent } from "../utils/format";
import ProductGrid from "./ProductGrid";

const sorters = {
  popular: (a, b) => Number(b.tags?.includes("bestseller")) - Number(a.tags?.includes("bestseller")),
  "price-asc": (a, b) => a.offerPrice - b.offerPrice,
  "price-desc": (a, b) => b.offerPrice - a.offerPrice,
  savings: (a, b) => discountPercent(b) - discountPercent(a),
};

const PAGE = 20;

// Shared by All products (/products) and a single category (/products/:category)
const ProductListing = ({ category }) => {
  const { products, productsLoading } = useAppContext();
  const [params, setParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("popular");
  const [shown, setShown] = useState(PAGE);
  const query = (params.get("q") || "").trim();
  const current = findCategory(category);

  const list = useMemo(() => {
    const q = query.toLowerCase();
    return products
      .filter((p) => !category || p.category.toLowerCase() === category.toLowerCase())
      .filter((p) => !q || `${p.name} ${p.category} ${p.unit}`.toLowerCase().includes(q))
      .sort((a, b) => Number(b.inStock) - Number(a.inStock) || sorters[sortBy](a, b));
  }, [products, category, query, sortBy]);

  const title = query ? `Results for “${query}”` : current ? current.text : category || "All products";
  const chip = (active) =>
    `flex h-12 shrink-0 items-center gap-2 rounded-full px-4 font-bold whitespace-nowrap ring-1 transition ${
      active ? "bg-primary text-white ring-primary" : "bg-white text-ink ring-line hover:ring-primary"
    }`;

  return (
    <div className="pt-6 md:pt-10">
      {category && (
        <Link to="/categories" className="mb-4 inline-flex min-h-12 items-center gap-2 font-bold text-primary">
          <ArrowLeft className="size-5" aria-hidden="true" /> All categories
        </Link>
      )}

      <div
        className="flex items-center gap-5 rounded-3xl p-5 sm:p-7"
        style={{ backgroundColor: current?.bgColor || "#ffffff" }}
      >
        {current && <img src={current.image} alt="" className="size-20 shrink-0 object-contain sm:size-24" />}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-1 text-lg text-muted">
            {productsLoading ? "Loading products..." : `${list.length} ${list.length === 1 ? "item" : "items"}`}
          </p>
        </div>
      </div>

      {/* Category chips */}
      <nav aria-label="Categories" className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
        <Link to={`/products${query ? `?q=${encodeURIComponent(query)}` : ""}`} className={chip(!category)}>
          All
        </Link>
        {categories.map((c) => (
          <Link key={c.path} to={`/products/${c.path.toLowerCase()}${query ? `?q=${encodeURIComponent(query)}` : ""}`} className={chip(current?.path === c.path)}>
            <img src={c.image} alt="" className="size-6" />
            {c.text}
          </Link>
        ))}
      </nav>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {query ? (
          <button
            type="button"
            onClick={() => setParams({})}
            className="min-h-12 rounded-xl px-4 font-bold text-primary ring-1 ring-primary/30 hover:bg-primary-soft"
          >
            Clear search
          </button>
        ) : (
          <span />
        )}
        <label className="flex items-center gap-2 font-bold">
          Sort by
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 rounded-xl bg-white px-3 font-semibold ring-1 ring-line outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: lowest first</option>
            <option value="price-desc">Price: highest first</option>
            <option value="savings">Biggest savings</option>
          </select>
        </label>
      </div>

      <div className="mt-5">
        {!productsLoading && list.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line">
            <img src="/images/scenes/magnifier.webp" alt="" className="mx-auto size-20" />
            <h2 className="mt-4 text-2xl font-extrabold">We couldn't find that</h2>
            <p className="mt-2 text-lg text-muted">Try a simpler word, like “rice” or “oil”, or call us and we will help.</p>
            <Link to="/products" onClick={() => setParams({})} className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 font-bold text-white">
              See all products
            </Link>
          </div>
        ) : (
          <ProductGrid products={list.slice(0, shown)} loading={productsLoading} skeletons={10} />
        )}
      </div>

      {list.length > shown && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="h-14 rounded-2xl bg-white px-8 text-lg font-extrabold text-primary ring-2 ring-primary/30 hover:bg-primary-soft"
          >
            Show more products ({list.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
