import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./contex/AppContex";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./pages/Home";
import AllProduct from "./pages/AllProduct";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";
import Help from "./pages/Help";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import ProductList from "./pages/seller/ProductList";
import Order from "./pages/seller/Order";
import AddProduct from "./pages/seller/AddProduct";
import Loading from "./components/loading";

const App = () => {
  const isSellerPath = useLocation().pathname.startsWith("/seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="min-h-screen font-sans text-ink">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: { fontSize: "1rem", fontWeight: 700, padding: "12px 16px", borderRadius: "14px", maxWidth: "92vw" },
        }}
      />
      <main className={isSellerPath ? "" : "mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:pb-12 lg:px-8"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loader" element={<Loading />} />
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <Order /> : null} />
            <Route path="orders" element={<Order />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isSellerPath && <Footer />}
      {!isSellerPath && <BottomNav />}
    </div>
  );
};

export default App;
