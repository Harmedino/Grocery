import { Minus, Plus } from "lucide-react";
import { useAppContext } from "../contex/AppContex";

// Big, clearly labelled - and + buttons (easy to tap for everyone)
const QuantityStepper = ({ product, size = "md" }) => {
  const { cartItems, addToCart, removeFromCart } = useAppContext();
  const quantity = cartItems[product._id] || 0;
  const box = size === "lg" ? "h-14" : "h-12";
  const btn = size === "lg" ? "w-14" : "w-12";

  return (
    <div className={`flex ${box} w-full items-center justify-between rounded-xl bg-primary-soft ring-1 ring-primary/20`}>
      <button
        type="button"
        onClick={() => removeFromCart(product._id)}
        aria-label={`Remove one ${product.name}`}
        className={`grid h-full ${btn} place-items-center rounded-l-xl text-primary-dull hover:bg-primary/10 active:bg-primary/20`}
      >
        <Minus className="size-5" strokeWidth={3} />
      </button>
      <span className="text-lg font-extrabold tabular-nums" aria-live="polite">
        {quantity}
        <span className="sr-only"> in basket</span>
      </span>
      <button
        type="button"
        onClick={() => addToCart(product._id)}
        aria-label={`Add one more ${product.name}`}
        className={`grid h-full ${btn} place-items-center rounded-r-xl text-primary-dull hover:bg-primary/10 active:bg-primary/20`}
      >
        <Plus className="size-5" strokeWidth={3} />
      </button>
    </div>
  );
};

export default QuantityStepper;
