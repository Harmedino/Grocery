import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { ChevronDown, ClipboardList, LogOut, Phone, Search, ShoppingBasket, Truck, User, X } from "lucide-react";
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
    <form onSubmit={submit} role="search" className={`flex h-13 items-center rounded-full border-2 border-ink bg-white pl-1 focus-within:ring-4 focus-within:ring-sun ${className}`}>
      <Search className="ml-4 size-5 shrink-0 text-ink" strokeWidth={2.5} aria-hidden="true" />
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
      <button type="submit" className="mr-1 h-10 rounded-full bg-ink px-5 font-extrabold text-sun hover:bg-primary">
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
        className="btn btn-white h-12 px-4"
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
        className="btn btn-white h-12 px-3"
      >
        <span className="grid size-8 place-items-center rounded-full bg-sun text-sm ring-2 ring-ink">
          {user.name?.[0]?.toUpperCase() || "U"}
        </span>
        <span className="max-w-28 truncate">Hi, {user.name?.split(" ")[0]}</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </button>
      {open && (
        <div className="card-pop shadow-pop absolute right-0 top-16 z-50 w-56 overflow-hidden py-2">
          <Link to="/my-orders" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 font-bold hover:bg-sun-soft">
            <ClipboardList className="size-5 text-primary" aria-hidden="true" /> My orders
          </Link>
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-left font-bold hover:bg-sun-soft">
            <LogOut className="size-5 text-primary" aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const STRIP_KEY = "topStripClosed";

// Thin message bar above the header; the X hides it and it stays hidden on this device
const TopStrip = () => {
  const [closed, setClosed] = useState(() => {
    try {
      return localStorage.getItem(STRIP_KEY) === "1";
    } catch {
      return false;
    }
  });

  if (closed) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem(STRIP_KEY, "1");
    } catch {
      // stays closed until the page reloads
    }
  };

  return (
    <div className="bg-ink text-sm text-sun-soft">
      <div className="mx-auto flex max-w-7xl items-center gap-3 py-1.5 pl-4 pr-2 sm:pl-6 lg:pl-8">
        <p className="flex min-w-0 flex-1 items-center gap-2 font-bold">
          <Truck className="size-4 shrink-0 text-sun" aria-hidden="true" />
          <span className="truncate">Free delivery on orders over {formatPrice(FREE_DELIVERY_FROM)}</span>
        </p>
        <a href={phoneLink()} className="hidden items-center gap-2 font-bold hover:text-sun md:flex">
          <Phone className="size-4" aria-hidden="true" /> Call to order: {STORE.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={close}
          aria-label="Close this message"
          className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-white/15"
        >
          <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { getCartCount, getCartTotalAmount } = useAppContext();
  const { pathname } = useLocation();
  const count = getCartCount();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-canvas">
      <TopStrip />

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label={`${STORE.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <SearchForm className="mx-2 hidden flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden md:block">
            <AccountMenu />
          </div>
          <Link to="/cart" className="btn btn-sun relative h-12 px-4">
            <ShoppingBasket className="size-6" aria-hidden="true" />
            <span className="hidden sm:inline">Basket</span>
            {count > 0 && <span className="hidden lg:inline">· {formatPrice(getCartTotalAmount())}</span>}
            <span className="grid min-w-7 place-items-center rounded-full bg-ink px-1.5 text-sm font-extrabold text-sun" aria-label={`${count} items`}>
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
      <nav aria-label="Main" className="hidden md:block">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full border-2 px-4 py-1.5 font-extrabold transition ${
                    isActive ? "border-ink bg-ink text-sun" : "border-transparent text-ink hover:border-ink hover:bg-white"
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
