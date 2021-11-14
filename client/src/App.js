import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourListing from "./components/Tours/TourListing";
import TourDetail from "./components/Tours/TourDetail";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShow={showCartHandler} />
      <Routes>
        <Route path="/" exact element={<TourListing />} />
        <Route path="/tour/:tourID" exact element={<TourDetail />} />
        <Route> 404 Not Found </Route>
      </Routes>
    </Router>
  );
}

export default App;
