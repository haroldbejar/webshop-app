import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSearch: (value: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, cartCount }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <a>Shopy</a>
      </div>
      <div className="flex-grow mx-4 max-w-lg w-full">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 rounded"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4 text-white">
        <FaUser className="text-2xl cursor-pointer" />
        <div className="relative">
          <Link to={"/cart"}>
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
