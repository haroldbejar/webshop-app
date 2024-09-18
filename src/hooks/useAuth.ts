import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setError } from "../redux/errorSlice";

interface AuthData {
  isAuthenticated: boolean;
  userId: number | null;
  token: string | null;
}

export const useAuth = (): AuthData => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [authData, setAuthData] = useState<AuthData>({
    isAuthenticated: false,
    userId: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        setAuthData({
          isAuthenticated: true,
          userId,
          token: token,
        });
      } catch (error: any) {
        dispatch(setError(error.message));
        setAuthData({
          isAuthenticated: false,
          userId: null,
          token: null,
        });
      }
    }
  }, [dispatch]);

  return authData;
};
