import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <div className="logo"></div>
      <ul className="nav-links">
        <li>
          <a href="#hero" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="#project" className="nav-link">
            About
          </a>
        </li>
        <li>
          <a href="#solution" className="nav-link">
            Project
          </a>
        </li>
        <li>
          <a href="#sponsors" className="nav-link">
            Sponsors
          </a>
        </li>
      </ul>
      <button className="nav-cta">Get Started</button>
    </nav>
  );
};

export default NavBar;
