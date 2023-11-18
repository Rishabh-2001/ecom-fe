import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useUserDetails from "../customHook/useUserDetails";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const userData=localStorage.getItem('currentUser');
let userId=''
let userType=''
if(userData){
   userId=JSON.parse(userData)?.userId;
   userType=JSON.parse(userData)?.userType
}
const initialState = {
  state: {
    isFetching: false,
  },
  productsData: {
    isLoading: false,
    error: "",
    data: [],
  },
};


export const getAllProduct = createAsyncThunk(
  "customer/getAllProduct",
  async (_, thunkAPI) => {
    try {
      const { pageNo, limit, searchKey, type, action } = _;
      let url = `${BASE_URL}/customer/allProduct?page=1&limit=100`;
      if (searchKey) {
        url += `&search=${searchKey}`;
      }
      if (type) {
        url += `&type=${type}`;
      }
      if (action) {
        url += `&action=${action}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          userType: userType,
          adminToken: userId,
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

const customerProductSlice = createSlice({
  name: "customerProduct",
  initialState,
  reducers: {},
  extraReducers: {


    [getAllProduct.pending]: (state) => {
      state.productsData.isLoading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.productsData.isLoading = false;
      state.productsData.data = action?.payload;
      // return action?.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.productsData.isLoading = false;
      console.log("Failed act", action);
    },
  },
});

export default customerProductSlice.reducer;
