import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import Newsletter from "../components/Newsletter";
import { features } from "../assets/assets";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />

      {/* Features / Trust bar */}
      <section className="mt-12 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img src={f.icon} alt={f.title} className="w-12 h-12" />
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Categories />
      <BestSeller />
      <BottomBanner />
      <Newsletter />
    </div>
  );
};

export default Home;