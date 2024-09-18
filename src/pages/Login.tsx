import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import endPoints from "../endPoints/endPoint";
import { AppDispatch } from "../redux/store";
import { setError } from "../redux/errorSlice";
import { loginUser } from "../redux/authSlice";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      dispatch(loginUser(formData))
        .unwrap()
        .then(() => {
          navigate("/cart");
        });
    } catch (error: any) {
      dispatch(setError(`${error} - Incorrect credentials or server error`));
    }
  };

  return (
    <div className="mt-10 p-4 bg-white rounded-lg shadow-lg w-80 mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        name="userName"
        placeholder="User name"
        value={formData.userName}
        onChange={handleInputChange}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <button
        className="bg-blue-500 text-white w-full py-2 mt-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
