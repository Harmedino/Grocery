import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:pl-18 lg:pl-24">
        <div className="max-w-2xl bg-white/60 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center md:text-left leading-tight">
            Freshness you can trust, savings you will love!
          </h1>
          <p className="mt-3 text-gray-700">Daily essentials delivered fast — farm to your doorstep.</p>
          <div className="flex items-center mt-6 font-medium">
            <Link
              to="/products"
              className="group flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Shop now
              <img className="transition group-hover:translate-x-1" src={assets.white_arrow_icon} alt="arrow" />
            </Link>
            <Link
              to="/products"
              className="group flex items-center gap-2 px-6 md:px-8 py-3 border border-gray-200 rounded text-gray-700 ml-4 hover:shadow-md transition"
            >
              Explore deals
              <img className="transition group-hover:translate-x-1" src={assets.black_arrow_icon} alt="arrow" />
            </Link>
          </div>
        </div>

        {/* floating accent boxes */}
        <div className="hidden md:block absolute right-8 top-12 space-y-6">
          <div className="w-36 h-24 bg-white/90 rounded-lg shadow-lg p-3 transform transition hover:scale-105 motion-safe:animate-bounce">
            <p className="font-semibold">Weekly Deals</p>
            <p className="text-sm text-gray-500">Up to 30% off</p>
          </div>
          <div className="w-36 h-24 bg-white/90 rounded-lg shadow-lg p-3 transform transition hover:scale-105 motion-safe:animate-bounce">
            <p className="font-semibold">Organic Picks</p>
            <p className="text-sm text-gray-500">Farm fresh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
