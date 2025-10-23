import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./contex/AppContex";
import Login from "./components/Login";
import AllProduct from "./pages/AllProduct";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin}  = useAppContext();
  return (
    <div>
      {isSellerPath ? null : <Navbar></Navbar>}
      {showUserLogin ? <Login/> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<AllProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/add-address" element={<AddAddress />}></Route>
          <Route path="/products/:category/:id" element={<ProductDetails />}></Route>
          <Route path="/products/:category" element={<ProductCategory />}></Route>
          <Route path="/my-orders" element={<MyOrders />}></Route>
        </Routes>
      </div>
{    !isSellerPath &&  <Footer/>}
    </div>
  );
};

export default App;
