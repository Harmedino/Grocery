import { Link } from "react-router-dom";
import { categories } from "../config/categories";
import { useAppContext } from "../contex/AppContex";

const CategoryTiles = ({ showCounts = false }) => {
  const { products } = useAppContext();
  const countFor = (path) => products.filter((p) => p.category === path).length;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-6">
      {categories.map((category) => (
        <li key={category.path}>
          <Link
            to={`/products/${category.path.toLowerCase()}`}
            onClick={() => scrollTo(0, 0)}
            className="group flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: category.bgColor }}
          >
            <img src={category.image} alt="" className="size-20 object-contain transition group-hover:scale-110 sm:size-24" />
            <span className="font-extrabold leading-tight text-ink">{category.text}</span>
            {showCounts && <span className="-mt-2 text-sm font-semibold text-muted">{countFor(category.path)} items</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTiles;
