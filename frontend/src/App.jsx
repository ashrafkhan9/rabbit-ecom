import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/Collectionpage";
import ProductsDetails from "./components/Products/ProductsDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomepage from "./pages/AdminHomepage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/common/ProtectedRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" closeButton />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductsDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
          </Route>

          {/* Admin Layout */}
          <Route
            path="admin"
            element={
              <ProtectedRoutes role="admin">
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminHomepage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
