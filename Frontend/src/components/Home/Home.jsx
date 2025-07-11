import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import products from "../../../Data/product";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          View Categories
        </button>
      </div>

      {/* Content */}
      {activeTab === "all" ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <Categories />
      )}
    </div>
  );
};

export default Home;
