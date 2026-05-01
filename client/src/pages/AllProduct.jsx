import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../contex/AppContex";
import ProductCard from "../components/ProductCard";
import { categories as categoryList } from "../assets/assets";

const AllProduct = () => {
  const { products = [], searchQuery } = useAppContext();

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState("grid"); // grid or list
  const [priceMax, setPriceMax] = useState(1000);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    // set an initial max price based on product data
    const max = products.reduce((m, p) => Math.max(m, p.offerPrice || p.price || 0), 0);
    setPriceMax(max || 1000);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (searchQuery && searchQuery.length > 0) {
      list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    list = list.filter((p) => p.inStock && (p.offerPrice || p.price || 0) <= priceMax);

    if (sortBy === "price-asc") list.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
    if (sortBy === "price-desc") list.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
    if (sortBy === "newest") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [products, searchQuery, activeCategory, sortBy, priceMax]);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold uppercase">All products</p>
          <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-1">
            <button onClick={() => setView("grid")} className={`px-3 py-1 rounded ${view === "grid" ? "bg-primary text-white" : "text-gray-600"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-1 rounded ${view === "list" ? "bg-primary text-white" : "text-gray-600"}`}>List</button>
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 rounded px-2 py-1">
            <option value="popular">Sort: Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden lg:block">
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveCategory("all")} className={`text-sm ${activeCategory === "all" ? "text-primary font-medium" : "text-gray-600"}`}>All</button>
              </li>
              {categoryList.map((c, i) => (
                <li key={i}>
                  <button onClick={() => setActiveCategory(c.path)} className={`text-sm ${activeCategory === c.path ? "text-primary font-medium" : "text-gray-600"}`}>{c.text}</button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Max price: {priceMax}</h4>
              <input type="range" min={0} max={Math.max(1000, priceMax)} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className={`${view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4" : "flex flex-col"} gap-6`}>
            {filtered.slice(0, pageSize).map((product, index) => (
              <div key={product._id || index} className={`${view === "grid" ? "" : "w-full"}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && <p className="text-gray-500 mt-6">No products found.</p>}

          {filtered.length > pageSize && (
            <div className="mt-6 text-center">
              <button onClick={() => setPageSize((s) => s + 12)} className="px-6 py-2 bg-primary text-white rounded">Load more</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProduct;
