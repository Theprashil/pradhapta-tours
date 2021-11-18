import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Tour from "./pages/Tour.jsx";
import AllTours from "./pages/AllTours.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/carts" exact element={<Cart />} />
        <Route path="/tours" exact element={<AllTours />} />
        <Route path="/tour/:tourID" exact element={<Tour />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="*"> 404 Not Found </Route>
      </Routes>
    </Router>
  );
}

export default App;
