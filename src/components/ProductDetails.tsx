import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

interface Product {
  productId: number;
  productCode: string;
  productName: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  title?: string;
}

interface LocationState {
  product: Product;
}

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const location = useLocation();
  const dispatch = useDispatch();

  const { product } = location.state as LocationState;

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="container mx-auto mt-8 mb-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.productCode}
              className="w-full h-auto md:h-full object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
          <div className="md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-4">
              {product.productCode} - {product.productName}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Code:</span> {product.productCode}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Price:</span> ${product.price}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Description:</span>{" "}
              {product.description}
            </p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 p-2 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 p-2 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
