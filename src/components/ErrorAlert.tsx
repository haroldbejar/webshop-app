import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearError } from "../redux/errorSlice";

const ErrorAlert: React.FC = () => {
  const errorMessage = useSelector((state: RootState) => state.error.message);
  const dispatch: AppDispatch = useDispatch();

  if (!errorMessage) return null;

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{errorMessage}</span>
      <button
        onClick={() => dispatch(clearError())}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span className="text-red-500">X</span>
      </button>
    </div>
  );
};

export default ErrorAlert;
