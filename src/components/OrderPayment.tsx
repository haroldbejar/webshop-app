import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/cartSlice";

const OrderPayment: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart || []);

  const totalQuantity = cart.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  // Información ficticia del cliente
  const customer = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg ml-4 w-80 h-96 overflow-y-auto flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4">Información del Cliente</h2>
      <p>
        <strong>Nombre:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Dirección:</strong> {customer.address}
      </p>
      <h2 className="text-xl font-bold mt-4 mb-2">Resumen de Compra</h2>
      <p>
        <strong>Total de productos:</strong> {totalQuantity}
      </p>
      <p>
        <strong>Total de la compra:</strong> ${totalPrice.toFixed(2)}
      </p>
      <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded self-end">
        Hacer Compra
      </button>
    </div>
  );
};

export default OrderPayment;
