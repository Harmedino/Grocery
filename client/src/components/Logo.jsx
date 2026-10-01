import { Leaf } from "lucide-react";
import { STORE } from "../config/store";

// Wordmark built from the store name, so renaming the shop is a one-line change
const Logo = ({ inverted = false }) => {
  const [first, ...rest] = STORE.name.split(" ");
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid size-12 shrink-0 -rotate-6 place-items-center rounded-full border-2 bg-sun ${
          inverted ? "border-sun-soft" : "border-ink shadow-[0_3px_0_0_var(--color-ink)]"
        }`}
      >
        <Leaf className="size-6 text-accent" strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className={`font-display block text-2xl font-extrabold tracking-tight ${inverted ? "text-white" : "text-ink"}`}>{first}</span>
        {rest.length > 0 && (
          <span className={`block text-sm font-black uppercase tracking-[0.25em] ${inverted ? "text-sun" : "text-primary"}`}>
            {rest.join(" ")}
          </span>
        )}
      </span>
    </span>
  );
};

export default Logo;
