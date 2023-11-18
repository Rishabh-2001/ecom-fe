import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useUserDetails from "../customHook/useUserDetails";
import { useSelector } from "react-redux";


const BASE_URL=process.env.REACT_APP_BASE_URL;
const userData=localStorage.getItem('currentUser');
let userId=''
let userType=''
if(userData){
   userId=JSON.parse(userData)?.userId;
   userType=JSON.parse(userData)?.userType
}

const initialState={
    state: {
        isFetching: false,
    },
    productsData:{
      isLoading:false,
      error: "",
      data:{}
    }
}





export const addProduct=createAsyncThunk('admin/product', async (postData,thunkAPI)=>{
  // const userDetails = useUserDetails();
    try{
       const {data}=await axios.post(`${BASE_URL}/admin/addProduct`, postData,{
          headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
               'userType': userType,
               'adminToken': userId,
            }
       })
       return {data};
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})
export const getAllProduct = createAsyncThunk(
  'admin/getAllProduct',
  async (_, thunkAPI) => {
    try {
      const {pageNo,limit,searchKey,type,action}=_;
      let url=`${BASE_URL}/admin/allProduct?page=${pageNo}&limit=${limit}`;
      if(searchKey)
      {
        url+=`&search=${searchKey}`
      }
      if(type)
      {
        url+=`&type=${type}`
      }
      if(action)
      {
        url+=`&action=${action}`
      }

      const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'userType': userType,
            'adminToken': userId,
          }
    } );
      console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);




const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {
   

    },
    extraReducers:{
      [addProduct.pending]:(state)=>{
        state.isLoading=true
      },
      [addProduct.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
        // return action?.payload;
      },
      [addProduct.rejected]:(state)=>{
        state.isLoading=false;
      }, 

      [getAllProduct.pending]:(state)=>{
        state.productsData.isLoading=true
      },
      [getAllProduct.fulfilled]:(state,action)=>{
     
        state.productsData.isLoading=false;
        state.productsData.data=action?.payload;
        // return action?.payload;
      },
      [getAllProduct.rejected]:(state,action)=>{
        state.productsData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminProductSlice.reducer;
  