import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAppContext } from "../contex/AppContex";
import { categoryTint } from "../config/categories";
import { discountPercent, formatPrice, productUrl } from "../utils/format";
import QuantityStepper from "./QuantityStepper";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useAppContext();
  const off = discountPercent(product);
  const inBasket = cartItems[product._id] > 0;

  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-3 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/30">
      <Link
        to={productUrl(product)}
        onClick={() => scrollTo(0, 0)}
        className="relative grid aspect-square place-items-center overflow-hidden rounded-xl"
        style={{ backgroundColor: categoryTint(product.category) }}
      >
        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-0.5 text-sm font-bold text-white">
            {off}% off
          </span>
        )}
        <img
          src={product.images?.[0]}
          alt=""
          loading="lazy"
          className="size-[68%] object-contain mix-blend-multiply transition duration-300 group-hover:scale-110"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        {product.unit && <p className="text-sm font-semibold text-muted">{product.unit}</p>}
        <Link
          to={productUrl(product)}
          onClick={() => scrollTo(0, 0)}
          className="mt-0.5 line-clamp-2 font-bold leading-snug text-ink hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-xl font-extrabold text-ink">{formatPrice(product.offerPrice)}</span>
          {off > 0 && <s className="text-sm text-muted">{formatPrice(product.price)}</s>}
        </div>

        <div className="mt-auto pt-3">
          {!product.inStock ? (
            <p className="grid h-12 place-items-center rounded-xl bg-gray-100 font-bold text-muted">Out of stock</p>
          ) : inBasket ? (
            <QuantityStepper product={product} />
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product._id)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-white transition hover:bg-primary-dull active:scale-[0.98]"
            >
              <Plus className="size-5" strokeWidth={3} aria-hidden="true" />
              Add<span className="sr-only"> {product.name}</span> to basket
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
