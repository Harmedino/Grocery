import { Link, NavLink, Outlet } from "react-router-dom";
import { ClipboardList, LogOut, Package, PackagePlus, Store } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../../contex/AppContex";
import Logo from "../../components/Logo";

const sidebarLinks = [
  { name: "Orders", path: "/seller", Icon: ClipboardList },
  { name: "Products", path: "/seller/product-list", Icon: Package },
  { name: "Add product", path: "/seller/add-product", Icon: PackagePlus },
];

const SellerLayout = () => {
  const { axios, navigate, setIsSeller } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success("Signed out");
        setIsSeller(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-4 py-3 md:px-8">
        <Link to="/"><Logo /></Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="hidden h-11 items-center gap-2 rounded-xl px-4 font-bold ring-1 ring-line hover:bg-primary-soft sm:flex">
            <Store className="size-5" aria-hidden="true" /> View shop
          </Link>
          <button type="button" onClick={logout} className="flex h-11 items-center gap-2 rounded-xl px-4 font-bold ring-1 ring-line hover:bg-primary-soft">
            <LogOut className="size-5" aria-hidden="true" /> Sign out
          </button>
        </div>
      </header>

      <div className="md:flex">
        <nav aria-label="Dashboard" className="flex border-b border-line bg-white md:min-h-[calc(100vh-4.5rem)] md:w-60 md:flex-col md:border-b-0 md:border-r md:p-3">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/seller"}
              className={({ isActive }) =>
                `flex flex-1 items-center justify-center gap-2 px-3 py-3 font-bold md:flex-none md:justify-start md:rounded-xl ${
                  isActive ? "bg-primary-soft text-primary" : "text-ink hover:bg-canvas"
                }`
              }
            >
              <link.Icon className="size-5" aria-hidden="true" /> {link.name}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
