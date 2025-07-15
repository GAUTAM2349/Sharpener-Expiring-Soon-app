import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import api from "../../../config/axiosConfig";
import fetchProducts from "../../../utils/fetchProducts";

const CategoryProducts = () => {
  const { category } = useParams();
  const decoded = decodeURIComponent(category);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "expiry");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

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

    if (key !== "page") {
      params.set("page", "1");
      setPage(1);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    fetchProducts(setLoading,setProducts,setTotalPages, page, sortBy,decoded)
  }, [decoded, sortBy, page]);

  useEffect(() => {
    const paramSortBy = searchParams.get("sortBy") || "expiry";
    const paramPage = parseInt(searchParams.get("page")) || 1;

    setSortBy(paramSortBy);
    setPage(paramPage);
  }, [searchParams]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{decoded}</h2>
        <select
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="expiry">Sort by Expiry</option>
          <option value="last-modified">Sort by Last Modified</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={() => handleDelete(product._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No products in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

