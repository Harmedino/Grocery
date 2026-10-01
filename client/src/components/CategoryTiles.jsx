import { Link } from "react-router-dom";
import { categories } from "../config/categories";
import { useAppContext } from "../contex/AppContex";

// Alternate tilts so the grid looks like pinned market signs
const tilt = ["hover:-rotate-2", "hover:rotate-2"];

const CategoryTiles = ({ showCounts = false }) => {
  const { products } = useAppContext();
  const countFor = (path) => products.filter((p) => p.category === path).length;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {categories.map((category, i) => (
        <li key={category.path}>
          <Link
            to={`/products/${category.path.toLowerCase()}`}
            onClick={() => scrollTo(0, 0)}
            className={`group flex h-full flex-col items-center gap-2 rounded-[1.75rem] border-2 border-ink p-4 text-center transition hover:shadow-[0_6px_0_0_var(--color-ink)] ${tilt[i % 2]}`}
            style={{ backgroundColor: category.bgColor }}
          >
            <span className="grid size-24 place-items-center rounded-full bg-white/70 sm:size-28">
              <img src={category.image} alt="" className="size-16 object-contain transition group-hover:scale-110 sm:size-20" />
            </span>
            <span className="font-display text-lg font-extrabold leading-tight text-ink">{category.text}</span>
            {showCounts && <span className="-mt-1 text-sm font-bold text-muted">{countFor(category.path)} items</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTiles;
