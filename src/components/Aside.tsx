import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/asideSlice";
import { fetchProductsByCategory } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";

interface AsideProps {
  onCategoryChange: (idCategory: number) => void;
}

const Aside: React.FC<AsideProps> = ({ onCategoryChange }) => {
  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.aside.categories);
  const status = useSelector((state: RootState) => state.aside.status);
  const error = useSelector((state: RootState) => state.aside.error);

  useEffect(() => {
    if (status === "initial") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (idCategory: number) => {
    dispatch(fetchProductsByCategory(idCategory));
    onCategoryChange(idCategory);
  };

  return (
    <aside className="p-4 bg-gray-200 rounded-lg shadow-lg ml-4 flex flex-col w-80">
      <h2 className="text-xl font-bold mb-4">Categorías</h2>
      {status === "loading" ? (
        <p>Cargando categorías...</p>
      ) : error ? (
        <p>Error al cargar categorías: {error}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId} className="mb-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Aside;
