import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js"; // For encryption

const initialState = {
  isAuthenticated: null, // Start with null to indicate loading state
  role: null,
  token: null,
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, "your-secret-key");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({
          role: action.payload.role,
          token: action.payload.token,
        }),
        "your-secret-key"
      ).toString();
      localStorage.setItem("authData", encryptedData);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      localStorage.removeItem("authData");
    },
    loadFromLocalStorage(state) {
      const storedData = localStorage.getItem("authData");
      if (storedData) {
        try {
          const decryptedData = decryptData(storedData);
          state.isAuthenticated = true;
          state.role = decryptedData.role;
          state.token = decryptedData.token;
        } catch (error) {
          console.error("Failed to decrypt auth data:", error);
          state.isAuthenticated = false; // Fallback to unauthenticated
        }
      } else {
        state.isAuthenticated = false; // No data in localStorage
      }
    },
  },
});

export const { loginSuccess, logout, loadFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
