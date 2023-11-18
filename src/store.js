import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './features/auth/user'
import userReducer from './redux/auth.slice'
import adminVendorSlice from "./redux/admin.vendor.slice";
import adminProductSlice from "./redux/admin.product.slice";
import cartSlice from "./redux/cart.slice";
import customerProductSlice from "./redux/customer.product.slice";
import customerOrderSlice from "./redux/customer.order.slice";
import adminOrderSlice from "./redux/admin.order.slice";


export default configureStore({
    reducer:{
        user:userReducer,
        adminVendor: adminVendorSlice,
        adminProduct: adminProductSlice,
        customerCard: cartSlice,
        customerProduct: customerProductSlice,
        customerOrder: customerOrderSlice,
        adminOrder: adminOrderSlice,
        


    }
})

