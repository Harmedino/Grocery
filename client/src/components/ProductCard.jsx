import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../contex/AppContex";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="relative border border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <img className="w-full max-h-40 object-contain transition-transform group-hover:scale-105" src={product.images?.[0] || product.image?.[0]} alt={product.name} />

          {/* quick actions overlay */}
          <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 hover:opacity-100 transition-opacity">
            <button className="bg-white text-sm px-3 py-1 rounded shadow" onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}>Add to cart</button>
          </div>
        </div>

        <div className="mt-3 text-gray-700">
          <p className="text-xs text-gray-500">{product.category}</p>
          <p className="font-medium text-sm truncate">{product.name}</p>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {Array(5).fill("").map((_, i) => (
                <img key={i} className="w-3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(4)</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-semibold text-primary">{product.offerPrice ? `${product.offerPrice}` : `${product.price}`}</p>
              {product.price && (
                <p className="text-xs text-gray-400 line-through">{product.price}</p>
              )}
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems[product._id] ? (
                <button onClick={() => addToCart(product._id)} className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded">
                  <img src={assets.cart_icon} alt="cart" className="w-4" /> Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/10 rounded px-2 py-1">
                  <button onClick={() => removeFromCart(product._id)} className="px-2">-</button>
                  <span>{cartItems[product._id]}</span>
                  <button onClick={() => addToCart(product._id)} className="px-2">+</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
