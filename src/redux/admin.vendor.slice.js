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
    vendersData:{
      isLoading:false,
      error: "",
      data:{}
    },
    vendorsList:{
      isLoading:false,
      error: "",
      data:[]
    }
}





export const addVendor=createAsyncThunk('admin/vendor', async (postData,thunkAPI)=>{
  // const userDetails = useUserDetails();
    try{
        
      
       const {data}=await axios.post(`${BASE_URL}/admin/addVendor`, postData,{
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
export const getAllVenders = createAsyncThunk(
  'admin/getAllVender',
  async (_, thunkAPI) => {
    try {
      const {pageNo,limit,searchKey,type,action}=_;
      let url=`${BASE_URL}/admin/allVendor?page=${pageNo}&limit=${limit}`;
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
export const getVendersList = createAsyncThunk(
  'admin/getVenderList',
  async (_, thunkAPI) => {
    try {
     
      let url=`${BASE_URL}/admin/vendorList`;
    

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




const adminVendorSlice = createSlice({
    name: "adminVendor",
    initialState,
    reducers: {
   

    },
    extraReducers:{
      [addVendor.pending]:(state)=>{
        state.isLoading=true
      },
      [addVendor.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
        // return action?.payload;
      },
      [addVendor.rejected]:(state)=>{
        state.isLoading=false;
      }, 

      [getAllVenders.pending]:(state)=>{
        state.vendersData.isLoading=true
      },
      [getAllVenders.fulfilled]:(state,action)=>{
     
        state.vendersData.isLoading=false;
        state.vendersData.data=action?.payload;
        // return action?.payload;
      },
      [getAllVenders.rejected]:(state,action)=>{
        state.vendersData.isLoading=false;
        console.log("Failed act", action);
      },
      [getVendersList.pending]:(state)=>{
        state.vendorsList.isLoading=true
      },
      [getVendersList.fulfilled]:(state,action)=>{
     
        state.vendorsList.isLoading=false;
        state.vendorsList.data=action?.payload;
        // return action?.payload;
      },
      [getVendersList.rejected]:(state,action)=>{
        state.vendorsList.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminVendorSlice.reducer;
  