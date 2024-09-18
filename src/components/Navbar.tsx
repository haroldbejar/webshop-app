import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

interface NavbarProps {
  onSearch: (value: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, cartCount }) => {
  const dispatch: AppDispatch = useDispatch();
  const customerState = useSelector((state: RootState) => state.customer);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link to={"/"}>
          <span>Shopy</span>
        </Link>
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
        <div className="relative">
          {!customerState.customer?.name ? (
            <Link to={"/login"}>
              <FaUser className="text-2xl cursor-pointer" />
            </Link>
          ) : (
            <div className="flex items-center">
              <span className="mr-4">{customerState.customer?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
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
