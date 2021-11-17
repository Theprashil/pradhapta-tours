import React from "react";
import Announcements from "../components/Announcements.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import Tours from "../components/Tours.jsx";

function AllTours() {
  return (
    <div>
      <Announcements />
      <NavBar />
      <Tours />
      <Footer />
    </div>
  );
}

export default AllTours;
