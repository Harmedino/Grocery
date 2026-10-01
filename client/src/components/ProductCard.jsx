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
    <article className="card-pop group relative flex h-full flex-col p-2.5 transition hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--color-ink)]">
      {off > 0 && (
        <span className="absolute -right-2 -top-3 z-10 grid size-14 rotate-12 place-items-center rounded-full border-2 border-ink bg-sun text-center font-display text-sm font-extrabold leading-none shadow-[0_3px_0_0_var(--color-ink)]">
          -{off}%
        </span>
      )}
      <Link
        to={productUrl(product)}
        onClick={() => scrollTo(0, 0)}
        className="relative grid aspect-square place-items-center overflow-hidden rounded-[1.25rem]"
        style={{ backgroundColor: categoryTint(product.category) }}
      >
        <img
          src={product.images?.[0]}
          alt=""
          loading="lazy"
          className="size-[70%] object-contain mix-blend-multiply transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
        />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <Link
          to={productUrl(product)}
          onClick={() => scrollTo(0, 0)}
          className="line-clamp-2 text-[1.05rem] font-extrabold leading-snug text-ink hover:text-primary"
        >
          {product.name}
        </Link>
        {product.unit && <p className="mt-0.5 text-sm font-bold text-muted">{product.unit}</p>}

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-2xl font-extrabold text-ink">{formatPrice(product.offerPrice)}</span>
          {off > 0 && <s className="text-sm font-semibold text-muted">{formatPrice(product.price)}</s>}
        </div>

        <div className="mt-auto pt-3">
          {!product.inStock ? (
            <p className="grid h-12 place-items-center rounded-2xl border-2 border-dashed border-ink/30 font-extrabold text-muted">Out of stock</p>
          ) : inBasket ? (
            <QuantityStepper product={product} />
          ) : (
            <button type="button" onClick={() => addToCart(product._id)} className="btn btn-sun h-12 w-full">
              <Plus className="size-5" strokeWidth={3.2} aria-hidden="true" />
              <span>
                Add<span className="sr-only"> {product.name}</span> to basket
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
