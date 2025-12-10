import React from "react";
import { motion } from "framer-motion";
import "./FooterSection.css";

const FooterSection = () => {
  return (
    <footer className="footer-container" id="sponsors">
      <div className="footer-content">
        <div className="sponsors-section">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sponsors-title"
          >
            nos partenaires
          </motion.h3>
          <div className="sponsors-grid">
            {["CDiscount", "Amazon", "LeroyMerlin", "Darty"].map(
              (sponsor, index) => (
                <motion.div
                  key={sponsor}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="sponsor-logo"
                >
                  {sponsor}
                </motion.div>
              )
            )}
          </div>
        </div>

        <div className="contact-section">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-title"
          >
            Get in Touch
          </motion.h3>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form"
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <textarea rows="4" placeholder="Your Message"></textarea>
            </div>
            <button
              type="button"
              className="submit-btn"
              onClick={(e) => e.preventDefault()}
            >
              Send Message
            </button>
          </motion.form>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 GiftFlow. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">GDPR</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
