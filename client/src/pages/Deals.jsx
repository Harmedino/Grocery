import { useMemo } from "react";
import { useAppContext } from "../contex/AppContex";
import { discountPercent, formatPrice } from "../utils/format";
import ProductGrid from "../components/ProductGrid";

const Deals = () => {
  const { products, productsLoading } = useAppContext();
  const deals = useMemo(
    () => products.filter((p) => p.inStock && discountPercent(p) > 0).sort((a, b) => discountPercent(b) - discountPercent(a)),
    [products]
  );
  const biggest = deals[0];

  return (
    <div className="pt-6 md:pt-10">
      <section className="card-pop shadow-pop relative overflow-hidden bg-sun p-6 sm:p-10">
        <img src="/images/scenes/party.webp" alt="" aria-hidden="true" className="absolute -right-4 -top-4 w-32 rotate-12 sm:w-44" />
        <p className="sticker -rotate-2 bg-primary px-4 py-1 text-white">Today's deals</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-6xl">Save on everyday essentials</h1>
        <p className="mt-3 max-w-xl text-lg font-semibold text-ink/80">
          {biggest
            ? `Up to ${discountPercent(biggest)}% off. For example, ${biggest.name} is now ${formatPrice(biggest.offerPrice)}.`
            : "Fresh savings every day."}
        </p>
      </section>
      <div className="mt-6">
        <ProductGrid products={deals} loading={productsLoading} />
      </div>
    </div>
  );
};

export default Deals;
