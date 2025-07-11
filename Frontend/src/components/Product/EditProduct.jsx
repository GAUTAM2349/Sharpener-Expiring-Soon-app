import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [category, setCategory] = useState("Food & Beverages");

  useEffect(() => {

    const product = {
      name: "Milk",
      expiryDate: "2025-12-31",
      purchaseDate: "2025-07-01",
      category: "Food & Beverages",
    };

    setName(product.name);
    setExpiryDate(product.expiryDate);
    setPurchaseDate(product.purchaseDate);
    setCategory(product.category);
  }, [id]);

  const handleUpdate = () => {
    alert(
      `Product Updated:\n${name} (${category})\nExpiry: ${expiryDate}\nPurchased: ${purchaseDate}`
    );
    navigate(-1); 
  };

  const categories = [
    "Food & Beverages",
    "Healthcare & Medicines",
    "Cosmetics & Personal Care",
    "Household & Cleaning Supplies",
    "Baby & Pet Products",
    "Others",
  ];

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Edit Product</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Purchase Date</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Update Product
      </button>
    </div>
  );
}
