import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Products from './components/products/Products';
import ProductDetails from './components/productDetails/ProductDetails';
import CreateOrder from './components/createOrder/CreateOrder';
import AdminManageProducts from './components/admin/AdminManageProducts';
import AddProduct from './components/admin/AddProduct';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/admin" element={<AdminManageProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
