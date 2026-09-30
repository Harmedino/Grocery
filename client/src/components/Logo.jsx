import { Leaf } from "lucide-react";
import { STORE } from "../config/store";

// Wordmark built from the store name, so renaming the shop is a one-line change
const Logo = ({ inverted = false }) => {
  const [first, ...rest] = STORE.name.split(" ");
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${inverted ? "bg-white text-primary" : "bg-primary text-white"}`}>
        <Leaf className="size-6" strokeWidth={2.4} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className={`block text-xl font-extrabold tracking-tight ${inverted ? "text-white" : "text-ink"}`}>{first}</span>
        {rest.length > 0 && (
          <span className={`block text-sm font-bold uppercase tracking-[0.2em] ${inverted ? "text-green-200" : "text-primary"}`}>
            {rest.join(" ")}
          </span>
        )}
      </span>
    </span>
  );
};

export default Logo;
