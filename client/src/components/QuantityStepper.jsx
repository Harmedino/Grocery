import { Minus, Plus } from "lucide-react";
import { useAppContext } from "../contex/AppContex";

// Big, clearly labelled - and + buttons (easy to tap for everyone)
const QuantityStepper = ({ product, size = "md" }) => {
  const { cartItems, addToCart, removeFromCart } = useAppContext();
  const quantity = cartItems[product._id] || 0;
  const box = size === "lg" ? "h-14" : "h-12";
  const btn = size === "lg" ? "size-11" : "size-9";

  const round = `grid ${btn} shrink-0 place-items-center rounded-full border-2 border-ink transition active:translate-y-0.5`;

  return (
    <div className={`flex ${box} w-full items-center justify-between rounded-2xl border-2 border-ink bg-sun-soft px-1`}>
      <button
        type="button"
        onClick={() => removeFromCart(product._id)}
        aria-label={`Remove one ${product.name}`}
        className={`${round} bg-white hover:bg-primary-soft`}
      >
        <Minus className="size-5" strokeWidth={3} />
      </button>
      <span className="font-display text-xl font-extrabold tabular-nums" aria-live="polite">
        {quantity}
        <span className="sr-only"> in basket</span>
      </span>
      <button
        type="button"
        onClick={() => addToCart(product._id)}
        aria-label={`Add one more ${product.name}`}
        className={`${round} bg-sun hover:bg-[#ffd05a]`}
      >
        <Plus className="size-5" strokeWidth={3} />
      </button>
    </div>
  );
};

export default QuantityStepper;
