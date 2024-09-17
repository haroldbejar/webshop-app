import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  productId: number;
  productCode: string;
  productName: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  title?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { quantity: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

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
    onAddToCart({ ...product, quantity });
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-between h-full">
      <Link to={`/product/${product.productId}`} state={{ product }}>
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      </Link>
      <h2 className="text-lg font-semibold mb-2">{`${product.productCode} - ${product.productName}`}</h2>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <button onClick={handleDecrease} className="bg-gray-200 p-2 rounded">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrease} className="bg-gray-200 p-2 rounded">
          +
        </button>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleAddToCart}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
