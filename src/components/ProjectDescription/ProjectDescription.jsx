import React from "react";
import { color, motion } from "framer-motion";
import "./ProjectDescription.css";

const ProjectDescription = () => {
  return (
    <section className="project-container" id="project">
      <div className="section-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Pourquoi{" "}
          <img
            src="/images/Logo_Gleeka V2.png"
            alt="Logo"
            className="logo_Text"
          />
        </motion.h2>
      </div>

      <div className="grid-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card problem-card"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card"
        >
          <h3 className="card-title">Le problème</h3>
          <p className="card-text">
            Dans un monde déconnecté, trouver des moyens significatifs de
            montrer l’appréciation peut être difficile. Les gens se sentent
            souvent isolés, et des milliers de cadeaux potentiels sont gaspillés
            simplement parce qu’il n’y a pas moyen facile de connecter les
            donneurs avec les receveurs.
          </p>
        </motion.div>
        {/* Solution image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="solution-card card"
          id="solution"
        ></motion.div>
        {/* Solution text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card "
          id="solution"
        >
          <h3 className="card-title">La solution</h3>
          <p className="card-text">
            <span style={{ color: "blue" }}> Gleeka </span> crée un écosystème
            homogène où la générosité circule librement. Notre plateforme
            connecte les utilisateurs qui veulent donner avec ceux qui
            voudraient valoriser ces cadeaux, en favorisant un cycle durable de
            gratitude et renforcement de la communauté.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDescription;
