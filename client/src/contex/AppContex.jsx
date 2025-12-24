import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  const fetchSeller = async ()=>{
try {
  const {data} = await axios.get('/api/seller/is-auth');
  if(data.success){
    setIsSeller(true)
  }else{
    setIsSeller(false)
  }
} catch (error) {
  setIsSeller(false)
}
  }


  const fetchUser = async  ()=>{
    try {
      const {data}  = await axios.get('api/user/is-auth')
      if(data.success){
        setUser(data.user)
        
        setCartItems(data.user.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

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
    toast.success("Item added to cart");
  };

  const updateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
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
    toast.success("Item removed from cart");
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
      if(cartItems[item]> 0){
        totalAmount += product.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100)/ 100
  }

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser()
  }, []);
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
  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser()
  }, []);

  const value = {
    navigate,
    user,
    fetchProducts,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    currency,
    addToCart,
    updateCartItems,
    removeFromCart,
    setSearchQuery,
    searchQuery,
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
