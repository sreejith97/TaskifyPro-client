
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_PROD_SERVER}/settings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateTheme = createAsyncThunk(
  "settings/updateTheme",
  async (theme, { getState }) => {
    const token = getState().auth.token; 
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_PROD_SERVER}/settings/update/theme`,
      { theme },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    darkTheme: true,
    notification: null,
    loading: false,
    error: null,
  },
  reducers: {
    changeTheme: (state) => {
      state.darkTheme = !state.darkTheme; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.darkTheme = action.payload.darkTheme;
        state.notification = action.payload.notification;
        
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.darkTheme = action.payload.darkTheme; 
      });
  },
});

export const { changeTheme } = settingsSlice.actions; 

export default settingsSlice.reducer;
