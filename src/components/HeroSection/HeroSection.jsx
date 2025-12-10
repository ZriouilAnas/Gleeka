import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-container" id="hero">
      <div className="hero-background">
        <div className="hero-image"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="floating-box"
          style={{
            top: "20%",
            left: "10%",
            width: "150px",
            height: "150px",
            backgroundColor: "transparent",
            backgroundImage: 'url("/images/gift-box.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></motion.div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="floating-box"
          style={{
            top: "60%",
            left: "80%",
            backgroundColor: "transparent",
            backgroundImage: 'url("/images/gift-box2.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="floating-box"
          style={{
            top: "80%",
            left: "20%",
            backgroundColor: "transparent",
            backgroundImage: 'url("/images/gift-box3.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></motion.div>
      </div>

      <div className="hero-content">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Send a{" "}
          <span
            className="gift-decoration"
            style={{
              backgroundColor: "transparent",
              backgroundImage: 'url("/images/gift-box4.png")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></span>{" "}
          Gift of
          <br />
          <span className="highlight">Appreciation</span> <br />
          to Everyone
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Transformer le stress des cadeaux en moments de joie. Simple et
          bienveillante, notre app vous aide à trouver en quelques clics des
          idées personnalisées pour vos proches.
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-actions"
        >
          <button className="primary-btn">Commencer</button>
          <button className="secondary-btn">En savoir plus</button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
