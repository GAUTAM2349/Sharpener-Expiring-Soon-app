import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import initialProducts from "../../../Data/product";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const decoded = decodeURIComponent(categoryName);

  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const filtered = products.filter((item) => item.category === decoded);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{decoded}</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No products in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
