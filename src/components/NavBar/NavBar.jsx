import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
            Accueil
          </a>
        </li>
        <li>
          <a href="#project" className="nav-link">
            à propos
          </a>
        </li>
        <li>
          <a href="#solution" className="nav-link">
            Projet
          </a>
        </li>
        <li>
          <a href="#sponsors" className="nav-link">
            Sponsors
          </a>
        </li>
      </ul>
      <button
        className="nav-cta"
        onClick={() => (window.location.href = "https://gleeka-v1.vercel.app/")}
      >
        Gleek ici
      </button>
    </nav>
  );
};

export default NavBar;
