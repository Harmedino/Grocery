import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Hand-drawn style underline under section titles
const Squiggle = () => (
  <svg viewBox="0 0 120 12" className="mt-1 h-3 w-28 text-primary" aria-hidden="true">
    <path d="M2 8c12-6 22 4 34-2s22-6 34 0 22 4 34-2 10-3 14-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SectionHeader = ({ title, subtitle, linkTo, linkText }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
      <Squiggle />
      {subtitle && <p className="mt-2 text-lg text-muted">{subtitle}</p>}
    </div>
    {linkTo && (
      <Link to={linkTo} className="btn btn-white h-12 px-5">
        {linkText}
        <ArrowRight className="size-5" strokeWidth={2.6} aria-hidden="true" />
      </Link>
    )}
  </div>
);

export default SectionHeader;
