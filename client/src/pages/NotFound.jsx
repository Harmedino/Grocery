import { Link } from "react-router-dom";

const NotFound = ({ message = "We couldn't find that page." }) => (
  <div className="mx-auto mt-10 max-w-xl rounded-[2rem] bg-white px-6 py-14 text-center ring-1 ring-line">
    <img src="/images/scenes/magnifier.webp" alt="" className="mx-auto size-24" />
    <h1 className="mt-6 text-3xl font-extrabold">Sorry!</h1>
    <p className="mt-2 text-lg text-muted">{message}</p>
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <Link to="/" className="inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-extrabold text-white">Go to home page</Link>
      <Link to="/products" className="inline-flex h-14 items-center justify-center rounded-2xl px-8 text-lg font-extrabold text-primary ring-2 ring-primary/30">See all products</Link>
    </div>
  </div>
);

export default NotFound;
