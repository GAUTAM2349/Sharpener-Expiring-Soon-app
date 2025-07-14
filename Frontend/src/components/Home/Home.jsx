import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import api from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('lastActiveTab')||"all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1); // for now, static page
  const [sortBy, setSortBy] = useState("expiry"); // default sort
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/product/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/product/upcoming", {
          params: {
            page,
            sortBy,
          },
        });
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sortBy]);

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 mb-6">
        <button
          onClick={() => {localStorage.setItem('lastActiveTab',"all");setActiveTab("all")}}
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All <span className="hidden md:visible">products</span>
        </button>
        <button
          onClick={() => {localStorage.setItem('lastActiveTab',"categories");setActiveTab("categories")}}
          className={`px-4 py-2 rounded ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <span className="hidden md:visible">View</span> Categories
        </button>
        </div>

        <button onClick={()=>navigate('/add-product')} className="px-4 py-2 mr-10px bg-green-500 text-white rounded">Add product</button>
      </div>

      {/* Sort Selector */}
      {activeTab === "all" && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onDelete={()=>handleDelete(product._id)}/>
              ))}
            </div>
          )}
        </>
      ) : (
        <Categories />
      )}
    </div>
  );
};

export default Home;

