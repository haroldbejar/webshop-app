import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { CartItem } from "../redux/cartSlice";
import { fetchCustomer, createCustomer } from "../redux/customerSlice";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const OrderPayment: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, userId } = useAuth();
  const cart = useSelector((state: RootState) => state.cart.cart || []);
  const customerState = useSelector((state: RootState) => state.customer);

  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchCustomer(userId));
    }
  }, [isAuthenticated, dispatch, userId]);

  const totalQuantity = cart.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  const handleCreateCustomer = () => {
    if (
      newCustomerData.name &&
      newCustomerData.email &&
      newCustomerData.address
    ) {
      dispatch(createCustomer(newCustomerData));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomerData({ ...newCustomerData, [name]: value });
  };

  if (!isAuthenticated) {
    return <div>Please log in to continue order.</div>;
  }

  if (!customerState.customer) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg ml-4 w-80 h-96 overflow-y-auto flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Create Customer Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newCustomerData.name}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomerData.email}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={newCustomerData.address}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white w-full py-2 mt-4 rounded self-end"
          onClick={handleCreateCustomer}
        >
          Create Client
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg ml-4 w-80 h-96 overflow-y-auto flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4">Customer Information</h2>
      <p>
        <strong>Name:</strong> {customerState.customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customerState.customer.email}
      </p>
      <p>
        <strong>Address:</strong> {customerState.customer.address}
      </p>
      <h2 className="text-xl font-bold mt-4 mb-2">Order summary</h2>
      <p>
        <strong>Total products:</strong> {totalQuantity}
      </p>
      <p>
        <strong>Total order amount:</strong> ${totalPrice.toFixed(2)}
      </p>
      <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded self-end">
        Place Order
      </button>
    </div>
  );
};

export default OrderPayment;
