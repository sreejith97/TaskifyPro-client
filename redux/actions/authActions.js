// authActions.js

import axios from "axios";
import { loginSuccess, logout } from "../slices/authSlice";
import { fetchSettings } from "../slices/settingsSlice";

export const loadFromLocalStorage = () => (dispatch) => {
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  if (storedToken && storedRole) {
    dispatch(
      loginSuccess({
        role: storedRole,
        token: storedToken,
      })
    );
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/login`,
      credentials
    );
    const data = res.data;
    const tokenPayload = JSON.parse(atob(data.access_token.split(".")[1]));

    // Store the token and role in localStorage
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", tokenPayload.role);

    dispatch(
      loginSuccess({
        role: tokenPayload.role,
        token: data.access_token,
      })
    );
    dispatch(fetchSettings());
  } catch (error) {
    console.log("Login error:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
