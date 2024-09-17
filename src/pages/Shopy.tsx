import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Aside from "../components/Aside";
import { fetchProducts, fetchProductsByCategory } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import OrderPayment from "../components/OrderPayment";
import ProductDetails from "../components/ProductDetails";
import { RootState, AppDispatch } from "../redux/store";

const Shopy = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const paginationObj = useSelector(
    (state: RootState) => state.product.paginationObj
  );
  const cart = useSelector((state: RootState) => state.cart.cart || []);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        fetchProductsByCategory({
          categoryId: selectedCategory,
          page: currentPage,
        })
      );
    } else {
      dispatch(fetchProducts(currentPage));
    }
  }, [dispatch, currentPage, selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <Navbar onSearch={handleSearch} cartCount={cartCount} />
      <div className="container mx-auto p-4 flex">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  currentPage={currentPage}
                  totalPages={paginationObj.totalPages}
                  onPageChange={handlePageChange}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        {location.pathname === "/cart" ||
        matchPath("/product/:id", location.pathname) ? (
          <OrderPayment />
        ) : (
          <Aside onCategoryChange={handleCategoryChange} />
        )}
      </div>
    </div>
  );
};

export default Shopy;
