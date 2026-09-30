import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'
import { CURRENCY } from "../config/store";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const CART_KEY = "cartItems";
const TEXT_KEY = "largeText";

// Local copy of the cart so it survives a refresh and a slow login check
const loadLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
};

// Combine the saved (server) cart with items added on this device, keeping the larger quantity
const mergeCarts = (serverCart = {}, localCart = {}) => {
  const merged = { ...serverCart };
  for (const id in localCart) {
    merged[id] = Math.max(merged[id] || 0, localCart[id]);
  }
  return merged;
};


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cartItems, setCartItems] = useState(loadLocalCart);
  const [largeText, setLargeText] = useState(() => {
    try {
      return localStorage.getItem(TEXT_KEY) === "1";
    } catch {
      return false;
    }
  });

  const fetchSeller = async ()=>{
try {
  const {data} = await axios.get('/api/seller/is-auth');
  if(data.success){
    setIsSeller(true)
  }else{
    setIsSeller(false)
  }
} catch {
  setIsSeller(false)
}
  }


  const fetchUser = async  ()=>{
    try {
      const {data}  = await axios.get('api/user/is-auth')
      if(data.success){
        loginUser(data.user)
      }
    } catch {
      setUser(null)
    }
  }

  // Merge instead of overwrite: items added before this resolves must not vanish
  const loginUser = (userData) => {
    setUser(userData);
    setCartItems((prev) => mergeCarts(userData.cartItems, prev));
  };

  const logoutUser = () => {
    setUser(null);
    setCartItems({});
  };

  const fetchProducts = async () => {
   try {
     const {data} = await axios.get('/api/product/list')
     if(data.success){
      setProducts(data.products)
     }else{
      toast.error(data.message)
     }
   } catch (error) {
    toast.error(error.message)
   } finally {
    setProductsLoading(false)
   }
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    const product = products.find((p) => p._id === itemId);
    toast.success(product ? `${product.name} added to your basket` : "Added to your basket", { id: "cart" });
  };

  const updateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }
    setCartItems(cartData);
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    if (!cartData[itemId]) toast.success("Removed from your basket", { id: "cart" });
  };

  const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount
  }

  const getCartTotalAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      let product = products.find((p)=> p._id === item);
      if(product && cartItems[item]> 0){
        totalAmount += product.offerPrice * cartItems[item];
      }
    }
    return Math.round(totalAmount * 100)/ 100
  }

  // Basket rows for products we know about, in the order they were added
  const cartLines = useMemo(
    () =>
      Object.entries(cartItems)
        .map(([id, quantity]) => ({ product: products.find((p) => p._id === id), quantity }))
        .filter((line) => line.product && line.quantity > 0),
    [cartItems, products]
  );

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser()
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", largeText);
    try {
      localStorage.setItem(TEXT_KEY, largeText ? "1" : "0");
    } catch {
      // preference just won't persist
    }
  }, [largeText]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // storage can be unavailable (private mode); the in-memory cart still works
    }
  }, [cartItems]);

  // Drop cart entries for products that no longer exist (e.g. after a catalog reset)
  useEffect(() => {
    if (products.length === 0) return;
    const stale = Object.keys(cartItems).filter((id) => !products.some((p) => p._id === id));
    if (stale.length > 0) {
      setCartItems((prev) => {
        const next = { ...prev };
        stale.forEach((id) => delete next[id]);
        return next;
      });
    }
  }, [products, cartItems]);

  useEffect(() => {
    const updateCart = async () => {
       
      
      try {
        const {data}= await axios.post('/api/cart/update', {cartItems})
        if(!data.success){
          toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)
      }
    }
    if(user){
      updateCart()
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    fetchProducts,
    setUser,
    loginUser,
    logoutUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    productsLoading,
    cartItems,
    cartLines,
    largeText,
    toggleLargeText: () => setLargeText((v) => !v),
    currency,
    addToCart,
    updateCartItems,
    removeFromCart,
    getCartCount,
    getCartTotalAmount,
    axios,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
