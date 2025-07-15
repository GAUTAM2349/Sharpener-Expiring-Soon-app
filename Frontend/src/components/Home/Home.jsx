import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import api from "../../../config/axiosConfig";
import fetchProducts from "../../../utils/fetchProducts";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const [activeTab, setActiveTab] = useState(localStorage.getItem('lastActiveTab') || "all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const sortBy = searchParams.get("sortBy") || "expiry";

  const handleDelete = async (id) => {
    try {
      await api.delete(`/product/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  
  useEffect(() => {
    fetchProducts(setLoading, setProducts, setTotalPages, page, sortBy, "all");
  }, [page, sortBy]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, page, totalPages]);

  
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setTotalPages(1);
  }, [sortBy]);

  return (
    <div className="p-4 relative">
      {/* Tabs */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              localStorage.setItem("lastActiveTab", "all");
              setActiveTab("all");
            }}
            className={`px-4 py-2 rounded ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All <span className="hidden md:inline">Products</span>
          </button>
          <button
            onClick={() => {
              localStorage.setItem("lastActiveTab", "categories");
              setActiveTab("categories");
            }}
            className={`px-4 py-2 rounded ${
              activeTab === "categories"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <span className="hidden md:inline">View</span> Categories
          </button>
        </div>

        <button
          onClick={() => navigate("/add-product")}
          className="px-4 py-2 mr-10px bg-green-500 text-white rounded"
        >
          Add Product
        </button>
      </div>

      {/* Sort Selector */}
      {activeTab === "all" && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => updateParam("sortBy", e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="expiry">Expiry</option>
            <option value="last-modified">Last Modified</option>
          </select>
        </div>
      )}

      {/* Content */}
      {activeTab === "all" ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={() => handleDelete(product._id)}
              />
            ))}
          </div>
          {loading && <p className="mt-4 text-gray-500">Loading more...</p>}
          <div ref={loaderRef} className="h-1" />
        </>
      ) : (
        <Categories />
      )}
    </div>
  );
};

export default Home;


