import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";
import { discountPercent, whatsappLink } from "../utils/format";
import ProductGrid from "../components/ProductGrid";
import SectionHeader from "../components/SectionHeader";
import CategoryTiles from "../components/CategoryTiles";
import HelpBanner from "../components/HelpBanner";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { HeroScene, PayOnDeliveryScene, StepChoose, StepDeliver, StepPack, StepPay } from "../components/Scenes";

const promises = [
  { image: "scooter", title: "Same-day delivery", text: "Order before 2pm, get it today." },
  { image: "thumbs-up", title: "Pay when it arrives", text: "Cash or transfer at your door." },
  { image: "basket", title: "Picked fresh for you", text: "We choose every item with care." },
  { image: "telephone", title: "Real people to help", text: "Call or WhatsApp us any time." },
];

const steps = [
  { Scene: StepChoose, title: "Choose what you need", text: "Tap “Add to basket” on the items you want. Use the search box if you know what you are looking for." },
  { Scene: StepPack, title: "We pick and pack it", text: "Our team chooses fresh items for you, just like you would at the market." },
  { Scene: StepDeliver, title: "We bring it to your door", text: "A rider brings your order to your home, usually the same day." },
  { Scene: StepPay, title: "Pay when it arrives", text: "Check your items, then pay the rider with cash or bank transfer." },
];

const Home = () => {
  const { products, productsLoading } = useAppContext();

  const deals = useMemo(
    () => products.filter((p) => p.inStock).sort((a, b) => discountPercent(b) - discountPercent(a)).slice(0, 10),
    [products]
  );
  const bestSellers = useMemo(() => products.filter((p) => p.inStock && p.tags?.includes("bestseller")).slice(0, 10), [products]);
  const fresh = useMemo(() => products.filter((p) => p.inStock && ["Fruits", "Vegetables"].includes(p.category)).slice(0, 10), [products]);

  return (
    <div className="space-y-14 pt-4 md:space-y-20 md:pt-8">
      {/* Hero */}
      <section className="card-pop shadow-pop grid items-center gap-6 overflow-hidden bg-sun p-6 sm:p-10 lg:grid-cols-2 lg:gap-10 lg:p-14">
        <div>
          <p className="sticker -rotate-2 px-4 py-1.5">
            <img src="/images/scenes/scooter.webp" alt="" aria-hidden="true" className="size-6" />
            Delivering across {STORE.city} today
          </p>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] text-ink sm:text-6xl xl:text-[4.1rem]">
            Fresh groceries, <span className="relative whitespace-nowrap text-primary">delivered</span> to your door.
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold text-ink/80 sm:text-xl">
            Rice, beans, fresh pepper, meat, drinks and more. Order in a few taps and pay when it arrives.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/products" className="btn btn-red h-15 px-8 text-lg">
              Start shopping <ArrowRight className="size-5" strokeWidth={2.8} aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(`Hello ${STORE.name}, I would like to place an order.`)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-white h-15 px-6 text-lg"
            >
              <WhatsAppIcon className="size-6 text-[#1ea952]" /> Order on WhatsApp
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2 text-base font-extrabold text-ink">
            {["Pay on delivery", "No hidden charges", "Carefully packed"].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full border-2 border-ink bg-white/60 py-1 pl-1 pr-3">
                <span className="grid size-6 place-items-center rounded-full bg-accent text-white">
                  <Check className="size-4" strokeWidth={3.5} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <HeroScene />
      </section>

      {/* Promises */}
      <section aria-label="Why shop with us" className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {promises.map((p) => (
          <div key={p.title} className="card-pop flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
            <span className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun-soft">
              <img src={`/images/scenes/${p.image}.webp`} alt="" aria-hidden="true" className="size-11" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold leading-tight">{p.title}</h3>
              <p className="mt-0.5 text-muted">{p.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader title="Shop by category" subtitle="Tap a picture to see everything in it." linkTo="/categories" linkText="All categories" />
        <CategoryTiles />
      </section>

      {/* Pay on delivery */}
      <section className="card-pop grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <PayOnDeliveryScene />
        <div>
          <p className="sticker rotate-2 bg-sun px-4 py-1">No card needed</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Pay when your order arrives</h2>
          <p className="mt-4 text-lg text-muted">
            You do not pay anything online. When the rider gets to your door, check your items first, then pay the way you like.
          </p>
          <ul className="mt-6 space-y-4 text-lg">
            {[
              ["Cash", "Pay the rider in cash. Please have the exact amount if you can."],
              ["Bank transfer", "Transfer to our shop account while the rider waits."],
              ["Check first", "Make sure everything is complete and fresh before you pay."],
            ].map(([title, text]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span><strong>{title}.</strong> {text}</span>
              </li>
            ))}
          </ul>
          <Link to="/products" className="btn btn-sun mt-8 h-14 px-8 text-lg">
            Start shopping <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section>
        <SectionHeader title="Today's deals" subtitle="Our biggest savings right now." linkTo="/deals" linkText="See all deals" />
        <ProductGrid products={deals} loading={productsLoading} compact />
      </section>

      {/* How it works */}
      <section>
        <SectionHeader title="Ordering is easy" subtitle="Four simple steps. No card needed." linkTo="/help" linkText="Full guide" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="card-pop relative p-3 pb-5">
              <span className="font-display absolute -left-2 -top-3 z-10 grid size-12 -rotate-6 place-items-center rounded-full border-2 border-ink bg-sun text-2xl font-extrabold shadow-[0_3px_0_0_var(--color-ink)]">
                {i + 1}
              </span>
              <step.Scene />
              <h3 className="mt-4 px-1 text-xl font-extrabold leading-tight">{step.title}</h3>
              <p className="mt-2 px-1 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeader title="Best sellers" subtitle="What our customers buy again and again." linkTo="/products" linkText="All products" />
        <ProductGrid products={bestSellers} loading={productsLoading} compact />
      </section>

      <section>
        <SectionHeader title="Fresh fruits & vegetables" subtitle="Picked fresh and sorted by hand." linkTo="/products/vegetables" linkText="See vegetables" />
        <ProductGrid products={fresh} loading={productsLoading} compact />
      </section>

      <HelpBanner />
    </div>
  );
};

export default Home;
