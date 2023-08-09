import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage } from "./Routes.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/best-selling" element={<BestSellingPage />} />
                <Route path="/events" element={<EventsPage/>} />
                <Route path="/faq" element={<FAQPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
