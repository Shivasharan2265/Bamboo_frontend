import React, { useEffect } from "react";
import "./App.css";
import Header from "./layout/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Products from "./pages/Products";
import ProductOverview from "./pages/ProductOverview";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ErrorPage from "./pages/ErrorPage";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return (
    <div
      style={{
        width: "100%",
        fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        margin: 0,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/notifications" element={<Notifications />} />



        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/categories" element={<Categories />} />


        <Route path="/signup" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />



        <Route path="/products/:id" element={<Products />} />

        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shipping-policy" element={<DeliveryPolicy />} />
        <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />






     <Route path="*" element={<ErrorPage />} />

        <Route path="/product/:id" element={<ProductOverview />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;