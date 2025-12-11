import React from "react";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import NavBar from "../components/NavBar/NavBar.jsx";
import ProjectDescription from "../components/ProjectDescription/ProjectDescription.jsx";
import FooterSection from "../components/FooterSection/FooterSection.jsx";

function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <ProjectDescription />
      <FooterSection />
    </div>
  );
}

export default Home;
