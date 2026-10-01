import { NavLink } from "react-router-dom";
import { CircleQuestionMark, House, LayoutGrid, ShoppingBasket, User } from "lucide-react";
import { useAppContext } from "../contex/AppContex";

// Floating labelled dock on phones: no hidden menus to discover
const BottomNav = () => {
  const { getCartCount, user, setShowUserLogin } = useAppContext();
  const count = getCartCount();

  const item = ({ isActive }) =>
    `flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-1.5 text-xs font-extrabold transition ${
      isActive ? "bg-sun text-ink" : "text-muted"
    }`;

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 rounded-full border-2 border-ink bg-white p-1.5 shadow-[0_4px_0_0_var(--color-ink)] md:hidden"
    >
      <div className="flex h-14 gap-1">
        <NavLink to="/" end className={item}>
          <House className="size-6" aria-hidden="true" /> Home
        </NavLink>
        <NavLink to="/categories" className={item}>
          <LayoutGrid className="size-6" aria-hidden="true" /> Shop
        </NavLink>
        <NavLink to="/cart" className={item}>
          <span className="relative">
            <ShoppingBasket className="size-6" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-3 -top-2 grid min-w-5 place-items-center rounded-full border border-white bg-primary px-1 text-[0.7rem] text-white">
                {count}
              </span>
            )}
          </span>
          Basket
        </NavLink>
        <NavLink to="/help" className={item}>
          <CircleQuestionMark className="size-6" aria-hidden="true" /> Help
        </NavLink>
        {user ? (
          <NavLink to="/my-orders" className={item}>
            <User className="size-6" aria-hidden="true" /> Orders
          </NavLink>
        ) : (
          <button type="button" onClick={() => setShowUserLogin(true)} className={item({ isActive: false })}>
            <User className="size-6" aria-hidden="true" /> Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
