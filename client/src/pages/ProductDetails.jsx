import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ShoppingBasket, Truck, Wallet } from "lucide-react";
import { useAppContext } from "../contex/AppContex";
import { categoryTint, findCategory } from "../config/categories";
import { STORE } from "../config/store";
import { discountPercent, formatPrice, whatsappLink } from "../utils/format";
import QuantityStepper from "../components/QuantityStepper";
import ProductGrid from "../components/ProductGrid";
import SectionHeader from "../components/SectionHeader";
import WhatsAppIcon from "../components/WhatsAppIcon";
import NotFound from "./NotFound";

const ProductDetails = () => {
  const { products, productsLoading, navigate, addToCart, cartItems } = useAppContext();
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const [selected, setSelected] = useState(0);

  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p._id !== product._id && p.inStock).slice(0, 10) : []),
    [products, product]
  );

  if (productsLoading) {
    return <div className="card-pop mt-10 h-96 animate-pulse" />;
  }
  if (!product) return <NotFound message="This product is no longer available." />;

  const category = findCategory(product.category);
  const off = discountPercent(product);
  const inBasket = cartItems[product._id] > 0;
  const image = product.images?.[selected] || product.images?.[0];

  return (
    <div className="pt-6 md:pt-10">
      <Link to={`/products/${product.category.toLowerCase()}`} className="inline-flex min-h-12 items-center gap-2 font-bold text-primary">
        <ArrowLeft className="size-5" aria-hidden="true" /> Back to {category?.text || product.category}
      </Link>

      <div className="card-pop mt-3 grid gap-6 p-4 sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="relative grid aspect-square place-items-center rounded-[1.5rem] border-2 border-ink" style={{ backgroundColor: categoryTint(product.category) }}>
            {off > 0 && (
              <span className="font-display absolute left-4 top-4 grid size-20 -rotate-12 place-items-center rounded-full border-2 border-ink bg-sun text-xl font-extrabold shadow-[0_3px_0_0_var(--color-ink)]">-{off}%</span>
            )}
            <img src={image} alt={product.name} className="size-[62%] object-contain mix-blend-multiply" />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`Show picture ${i + 1}`}
                  className={`grid size-20 place-items-center rounded-2xl border-2 bg-white ${i === selected ? "border-ink" : "border-line"}`}
                >
                  <img src={src} alt="" className="size-14 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-primary">{category?.text || product.category}</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{product.name}</h1>
          {product.unit && <p className="mt-2 text-xl font-semibold text-muted">{product.unit}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-display text-5xl font-extrabold">{formatPrice(product.offerPrice)}</span>
            {off > 0 && (
              <>
                <s className="text-xl text-muted">{formatPrice(product.price)}</s>
                <span className="rounded-full bg-accent-soft px-3 py-1 font-extrabold text-accent">
                  You save {formatPrice(product.price - product.offerPrice)}
                </span>
              </>
            )}
          </div>

          <p className={`mt-4 flex items-center gap-2 text-lg font-bold ${product.inStock ? "text-accent" : "text-primary"}`}>
            {product.inStock ? <><Check className="size-5" strokeWidth={3} aria-hidden="true" /> In stock</> : "Out of stock right now"}
          </p>

          {product.inStock && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {inBasket ? (
                <>
                  <div className="sm:w-56">
                    <QuantityStepper product={product} size="lg" />
                  </div>
                  <button
                    type="button"
                    onClick={() => { navigate("/cart"); scrollTo(0, 0); }}
                    className="btn btn-sun h-14 flex-1 px-6 text-lg"
                  >
                    <ShoppingBasket className="size-6" aria-hidden="true" /> Go to basket
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(product._id)}
                  className="btn btn-sun h-14 flex-1 px-6 text-lg"
                >
                  <ShoppingBasket className="size-6" aria-hidden="true" /> Add to basket
                </button>
              )}
            </div>
          )}

          <ul className="mt-6 space-y-3 rounded-2xl border-2 border-dashed border-ink/30 bg-sun-soft p-4 text-base font-semibold">
            <li className="flex items-start gap-3"><Truck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /> {STORE.deliveryPromise}</li>
            <li className="flex items-start gap-3"><Wallet className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /> Pay when it arrives: cash or bank transfer</li>
          </ul>

          {product.description?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-extrabold">About this product</h2>
              <ul className="mt-3 space-y-2 text-lg">
                {product.description.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={whatsappLink(`Hello ${STORE.name}, I have a question about ${product.name} (${product.unit}).`)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 self-start font-bold text-primary underline underline-offset-4"
          >
            <WhatsAppIcon className="size-5 text-[#1ea952]" /> Ask us about this on WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <SectionHeader title="You may also need" linkTo={`/products/${product.category.toLowerCase()}`} linkText="See more" />
          <ProductGrid products={related} compact />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
