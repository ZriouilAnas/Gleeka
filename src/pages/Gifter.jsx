import React from "react";
import GiftFinder from "../components/GiftFinder/GiftFinder";
import NavBar from "../components/NavBar/NavBar";

function Gifter() {
  return (
    <div className="gifter-container">
      <NavBar></NavBar>
      <GiftFinder></GiftFinder>
    </div>
  );
}

export default Gifter;
