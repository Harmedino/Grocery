import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectionHeader = ({ title, subtitle, linkTo, linkText }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 font-bold text-primary ring-1 ring-primary/30 transition hover:bg-primary-soft"
      >
        {linkText}
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    )}
  </div>
);

export default SectionHeader;
