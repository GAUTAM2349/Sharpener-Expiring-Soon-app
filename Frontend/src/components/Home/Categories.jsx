import { useNavigate } from "react-router-dom";

const categories = [
  "Food & Beverages",
  "Healthcare & Medicines",
  "Cosmetics & Personal Care",
  "Household & Cleaning Supplies",
  "Baby & Pet Products",
  "Others",
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">View Categories</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/categories/${encodeURIComponent(cat)}`)}
            className="bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center p-6 rounded-xl shadow-sm transition-all duration-200 text-lg font-medium"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
