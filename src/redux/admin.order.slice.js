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
    orderData:{
      isLoading:false,
      error: "",
      data:{}
    }
}





// export const addProduct=createAsyncThunk('admin/product', async (postData,thunkAPI)=>{
//   // const userDetails = useUserDetails();
//     try{
//        const {data}=await axios.post(`${BASE_URL}/admin/addProduct`, postData,{
//           headers: {
//               'Content-Type': 'application/json',
//               'ngrok-skip-browser-warning': 'true',
//                'userType': userType,
//                'adminToken': userId,
//             }
//        })
//        return {data};
//     }
//     catch(err){
//         console.log("ERR:",err);
//         return thunkAPI.rejectWithValue(err?.response?.data?.error)
//     }
// })
export const getAllOrders = createAsyncThunk(
  'admin/getAllOrders',
  async (_, thunkAPI) => {
    try {
     
      let url=`${BASE_URL}/admin/allOrder`;
     

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




const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {
   

    },
    extraReducers:{
    //   [addProduct.pending]:(state)=>{
    //     state.isLoading=true
    //   },
    //   [addProduct.fulfilled]:(state,action)=>{
     
    //     state.isLoading=false;
    //     state.isRegistered=true;
    //     // return action?.payload;
    //   },
    //   [addProduct.rejected]:(state)=>{
    //     state.isLoading=false;
    //   }, 

      [getAllOrders.pending]:(state)=>{
        state.orderData.isLoading=true
      },
      [getAllOrders.fulfilled]:(state,action)=>{
     
        state.orderData.isLoading=false;
        state.orderData.data=action?.payload;
        // return action?.payload;
      },
      [getAllOrders.rejected]:(state,action)=>{
        state.orderData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminOrderSlice.reducer;
  