import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useUserDetails from "../customHook/useUserDetails";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const userData = localStorage.getItem("currentUser");
const { userId, userType } = JSON.parse(userData);

const initialState = {
  isLoading: false,
  orders: [],
};

export const addOrder = createAsyncThunk(
  "customer/order",
  async (postData, thunkAPI) => {
    // const userDetails = useUserDetails();
    try {
      console.log("REC in red", postData);
      const { data } = await axios.post(
        `${BASE_URL}/customer/addOrder`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            userType: userType,
            userToken: userId,
          },
        }
      );
      return { data };
    } catch (err) {
      console.log("ERR:", err);
      return thunkAPI.rejectWithValue(err?.response?.data?.error);
    }
  }
);

export const getOrderItems = createAsyncThunk(
  "admin/getOrders",
  async (_, thunkAPI) => {
    try {
      let url = `${BASE_URL}/customer/getOrders`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          userType: userType,
          userToken: userId,
        },
      });
      //   console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
      //   console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);

const customerOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addOrder.rejected]: (state) => {
      state.isLoading = false;
    },

    [getOrderItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action?.payload;
      // return action?.payload;
    },
    [getOrderItems.rejected]: (state, action) => {
      state.isLoading = false;
      // console.log("Failed act", action);
    },
  },
});

export const {} = customerOrderSlice.actions;
export default customerOrderSlice.reducer;
