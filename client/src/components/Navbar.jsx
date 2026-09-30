import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { ALargeSmall, ChevronDown, ClipboardList, LogOut, Phone, Search, ShoppingBasket, Truck, User } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { FREE_DELIVERY_FROM, STORE } from "../config/store";
import { formatPrice, phoneLink } from "../utils/format";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "All products" },
  { to: "/deals", label: "Today's deals" },
  { to: "/categories", label: "Categories" },
  { to: "/help", label: "How to order" },
  { to: "/contact", label: "Contact" },
];

export const SearchForm = ({ className = "", autoFocus = false }) => {
  const { navigate } = useAppContext();
  const [params] = useSearchParams();
  const [term, setTerm] = useState(params.get("q") || "");
  const inputId = useId(); // the form renders twice (desktop + phone), so ids must differ

  useEffect(() => setTerm(params.get("q") || ""), [params]);

  const submit = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <form onSubmit={submit} role="search" className={`flex h-12 items-center rounded-2xl bg-white ring-2 ring-line focus-within:ring-primary ${className}`}>
      <Search className="ml-4 size-5 shrink-0 text-muted" aria-hidden="true" />
      <label htmlFor={inputId} className="sr-only">Search for a product</label>
      <input
        id={inputId}
        type="search"
        value={term}
        autoFocus={autoFocus}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="What do you need?"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted/80"
      />
      <button type="submit" className="mr-1 h-10 rounded-xl bg-primary px-4 font-bold text-white hover:bg-primary-dull">
        Search
      </button>
    </form>
  );
};

const AccountMenu = () => {
  const { user, axios, logoutUser, setShowUserLogin, navigate } = useAppContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success("You have signed out");
        logoutUser();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setOpen(false);
  };

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => setShowUserLogin(true)}
        className="flex h-12 items-center gap-2 rounded-2xl px-4 font-bold text-ink ring-1 ring-line hover:bg-primary-soft"
      >
        <User className="size-5" aria-hidden="true" />
        Sign in
      </button>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-12 items-center gap-2 rounded-2xl px-4 font-bold text-ink ring-1 ring-line hover:bg-primary-soft"
      >
        <span className="grid size-8 place-items-center rounded-full bg-primary text-sm text-white">
          {user.name?.[0]?.toUpperCase() || "U"}
        </span>
        <span className="max-w-28 truncate">Hi, {user.name?.split(" ")[0]}</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-xl ring-1 ring-line">
          <Link to="/my-orders" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 font-semibold hover:bg-primary-soft">
            <ClipboardList className="size-5 text-primary" aria-hidden="true" /> My orders
          </Link>
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-left font-semibold hover:bg-primary-soft">
            <LogOut className="size-5 text-primary" aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { getCartCount, getCartTotalAmount, largeText, toggleLargeText } = useAppContext();
  const { pathname } = useLocation();
  const count = getCartCount();

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-[0_1px_0_#e2e6dd] backdrop-blur">
      {/* Service strip */}
      <div className="bg-primary-deep text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-semibold">
            <Truck className="size-4 shrink-0" aria-hidden="true" />
            <span>Free delivery on orders over {formatPrice(FREE_DELIVERY_FROM)}</span>
          </p>
          <div className="flex items-center gap-4">
            <a href={phoneLink()} className="hidden items-center gap-2 font-semibold hover:underline md:flex">
              <Phone className="size-4" aria-hidden="true" /> Call to order: {STORE.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={toggleLargeText}
              aria-pressed={largeText}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 font-bold hover:bg-white/20"
            >
              <ALargeSmall className="size-4" aria-hidden="true" />
              {largeText ? "Normal text" : "Larger text"}
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label={`${STORE.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <SearchForm className="mx-2 hidden flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <AccountMenu />
          </div>
          <Link
            to="/cart"
            className="relative flex h-12 items-center gap-2 rounded-2xl bg-primary px-4 font-bold text-white hover:bg-primary-dull"
          >
            <ShoppingBasket className="size-6" aria-hidden="true" />
            <span className="hidden sm:inline">Basket</span>
            {count > 0 && <span className="hidden lg:inline">· {formatPrice(getCartTotalAmount())}</span>}
            <span className="grid min-w-7 place-items-center rounded-full bg-white px-1.5 text-sm font-extrabold text-primary" aria-label={`${count} items`}>
              {count}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      {pathname !== "/cart" && (
        <div className="px-4 pb-3 md:hidden">
          <SearchForm />
        </div>
      )}

      {/* Desktop links */}
      <nav aria-label="Main" className="hidden border-t border-line md:block">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap border-b-4 px-3 py-3 font-bold transition ${
                    isActive ? "border-primary text-primary" : "border-transparent text-ink hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
