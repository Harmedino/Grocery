import CategoryTiles from "../components/CategoryTiles";
import { SearchForm } from "../components/Navbar";

const Categories = () => (
  <div className="pt-6 md:pt-10">
    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What are you shopping for?</h1>
    <p className="mt-1 text-lg text-muted">Tap a picture to see everything in it, or search below.</p>
    <SearchForm className="mt-5 max-w-2xl" />
    <div className="mt-6">
      <CategoryTiles showCounts />
    </div>
  </div>
);

export default Categories;
