import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { AuthContext } from "../../../utils/contexts/AuthProvider";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [category, setCategory] = useState("Food & Beverages");
  const [loading, setLoading] = useState(false);

  const formatDate = (input) => {
    const date = new Date(input);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (location.state) {
      const { _id, name, expiry, purchaseDate, category } = location.state;
      setName(name || "");
      setExpiryDate(expiry ? formatDate(expiry) : "");
      setPurchaseDate(purchaseDate ? formatDate(purchaseDate) : "");
      setCategory(category || "Food & Beverages");
    }
  }, [location.state]);

  const handleUpdate = async () => {
    if (!name || !expiryDate || !purchaseDate || !category) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      name,
      expiry: expiryDate,
      purchaseDate,
      category,
      userId: user._id,
    };

    try {
      setLoading(true);
      const { _id } = location.state;
      await api.put(`/product/${_id}`, data);
      alert("Product updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

   const categories = [
    "Food",
    "Grocery",
    "Medicine",
    "Cosmetics",
    "Babycare",
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
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
}
