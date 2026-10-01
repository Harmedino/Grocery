import { Link } from "react-router-dom";

const NotFound = ({ message = "We couldn't find that page." }) => (
  <div className="card-pop mx-auto mt-10 max-w-xl px-6 py-14 text-center">
    <img src="/images/scenes/magnifier.webp" alt="" className="mx-auto size-24" />
    <h1 className="mt-6 text-3xl font-extrabold">Sorry!</h1>
    <p className="mt-2 text-lg text-muted">{message}</p>
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <Link to="/" className="btn btn-sun h-14 px-8 text-lg">Go to home page</Link>
      <Link to="/products" className="btn btn-white h-14 px-8 text-lg">See all products</Link>
    </div>
  </div>
);

export default NotFound;
