import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200 flex flex-col gap-2 justify-between relative">
      <div>
        <h4 className="text-xl font-semibold mb-1">{product.name}</h4>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Purchased:</span> {product.purchaseDate}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Expires:</span> {product.expiryDate}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
