// import './App.css';
import HomePage from "./Layout/HomePage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./Layout/GlobalLayout";
import Home from "./components/Home";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";
import Vendors from "./components/Vendors";
import ProductPage from "./components/Customer/ProductPage";
import OrderPage from "./components/Customer/OrderPage";
import CartPage from "./components/Customer/CartPage";
import AddVendor from "./components/AddVendor";
import VendorDetails from "./components/VendorDetails";
import VendorProduct from "./components/VendorProduct";
import VendorDetailPage from "./components/VendorDetailPage";
import VendorOrders from "./components/VendorOrders";
import AddProducts from "./components/AddProducts";
import ProfilePage from "./components/Customer/ProfilePage";
import ProductDetails from "./components/Customer/ProductDetails";



function App() {
  return (
    <div className="App w-[100%] box-content">
    <ToastContainer />
    <Routes>
      <Route element={<GlobalLayout />}>
        {/* BEFORE AUTH LAYOUT  */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* AFTER AUTH LAYOUT  */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <HomePage  />
             </ProtectedRoute>
          }
        >
          <Route  index  element={<Dashboard />} />
            <Route exact path="vendors" element={<Vendors />} />
            <Route exact path="vendors/add" element={<AddVendor />} />
            <Route exact path="vendors/:id" element={<VendorDetails />} >
                <Route exact path="products" element={<VendorDetailPage />} />
                <Route exact path="products" element={<VendorProduct />} />
                <Route exact path="orders" element={<VendorOrders />} />
            </Route>
          <Route exact path="products" element={<Products />} />
          <Route exact path="products/add" element={<AddProducts />} />
          <Route exact path="reports" element={<Reports />} />
           <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="vendor"
          element={
            <ProtectedRoute>
               <HomePage />
             </ProtectedRoute>
          }
        >
          <Route index element={<ProductPage />} />
          <Route exact path="product/:id" element={<ProductDetails />} />
          <Route exact path="checkout" element={<CartPage />} />
          <Route exact path="orders" element={<OrderPage />} />
          {/* <Route exact path="cart" element={<CartPage />} /> */}
          <Route exact path="customerProfile" element={<ProfilePage />} />
           <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  </div>
  );
}

export default App;
