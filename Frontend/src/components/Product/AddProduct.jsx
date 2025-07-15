import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig"; 
import { AuthContext } from "../../../utils/contexts/AuthProvider";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);

  const handleAdd = async () => {
    if (!name || !expiryDate || !purchaseDate || !category) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      name,
      expiry: expiryDate,
      purchaseDate,
      category,
      userId: user?._id
    };

    try {
      setLoading(true);
      await api.post("/product", data);
      alert("Product added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
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
      <h2 className="text-2xl font-semibold text-center">Add Product</h2>

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
        onClick={handleAdd}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
