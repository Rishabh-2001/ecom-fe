import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useUserDetails from "../customHook/useUserDetails";
import { useSelector } from "react-redux";


const BASE_URL=process.env.REACT_APP_BASE_URL;
const userData=localStorage.getItem('currentUser');
const{userId,userType}=JSON.parse(userData);



const initialState = {
    isLoading:false,
    cart: [],
  };




export const addProductToCart=createAsyncThunk('customer/cart', async (postData,thunkAPI)=>{
  // const userDetails = useUserDetails();
    try{
        
      console.log("REC in red", postData);
       const {data}=await axios.post(`${BASE_URL}/customer/addToCart`, postData,{
          headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
               'userType': userType,
               'userToken': userId,
            }
       })
       return {data};
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})

export const removeProductToCart=createAsyncThunk('customer/cart/remove', async (postData,thunkAPI)=>{
    // const userDetails = useUserDetails();
      try{
          
        console.log("REC in red", postData);
         const {data}=await axios.post(`${BASE_URL}/customer/removeFromCart`, postData,{
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                 'userType': userType,
                 'userToken': userId,
              }
         })
         return {data};
      }
      catch(err){
          console.log("ERR:",err);
          return thunkAPI.rejectWithValue(err?.response?.data?.error)
      }
  })

  export const removeAllCartPrducts=createAsyncThunk('customer/cart/removeAll', async (postData,thunkAPI)=>{
    // const userDetails = useUserDetails();
      try{
          
        console.log("REC in red", postData);
         const {data}=await axios.post(`${BASE_URL}/customer/removeAllCart`, postData,{
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                 'userType': userType,
                 'userToken': userId,
              }
         })
         return {data};
      }
      catch(err){
          console.log("ERR:",err);
          return thunkAPI.rejectWithValue(err?.response?.data?.error)
      }
  })




export const getCartItems = createAsyncThunk(
  'admin/getCart',
  async (_, thunkAPI) => {
    try {
     
      let url=`${BASE_URL}/customer/getCart`;
    

      const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'userType': userType,
            'userToken': userId,
          }
    } );
    //   console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
    //   console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);




const customerCartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productToAdd = action.payload;
            // Check if the product is already in the cart
            const existingProduct = state.cart.find((product) => product.id === productToAdd.id);
      
            if (existingProduct) {
              // If the product is already in the cart, update the quantity or any other property
              existingProduct.quantity += 1;
            } else {
              // If the product is not in the cart, add it
              state.cart.push({ ...productToAdd, quantity: 1 });
            }
          },
      

    },
    extraReducers:{
      [addProductToCart.pending]:(state)=>{
        state.isLoading=true
      },
      [addProductToCart.fulfilled]:(state,action)=>{
     
        state.isLoading=false;

      },
      [addProductToCart.rejected]:(state)=>{
        state.isLoading=false;
      }, 

      [removeProductToCart.pending]:(state)=>{
        state.isLoading=true
      },
      [removeProductToCart.fulfilled]:(state,action)=>{
     
        state.isLoading=false;

      },
      [removeProductToCart.rejected]:(state)=>{
        state.isLoading=false;
      }, 
      [removeAllCartPrducts.pending]:(state)=>{
        state.isLoading=true
      },
      [removeAllCartPrducts.fulfilled]:(state,action)=>{
     
        state.isLoading=false;

      },
      [removeAllCartPrducts.rejected]:(state)=>{
        state.isLoading=false;
      }, 


      [getCartItems.pending]:(state)=>{
        state.isLoading=true
      },
      [getCartItems.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.cart=action?.payload;
        // return action?.payload;
      },
      [getCartItems.rejected]:(state,action)=>{
        state.isLoading=false;
        // console.log("Failed act", action);
      }
    }

  });

  


  export const { addToCart, removeFromCart } = customerCartSlice.actions;
export default customerCartSlice.reducer;
