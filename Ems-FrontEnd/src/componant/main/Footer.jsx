import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 pb-3 mt-5"
      style={{
        background: "linear-gradient(90deg, #667eea, #764ba2)"
      }}
    >
      <div className="container">
        <div className="row">

          {/* Project Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">EMS</h5>
            <p className="small">
              Employee Management System helps organizations manage employees,
              attendance, salary and reports efficiently.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">Email: omrathod@outlook.com</p>
            <p className="small mb-1">Phone: +91 9325670565</p>
            <div className="mt-2">

            <i className="bi bi-facebook me-3"></i>
            
            <a href=" https://x.com/omprathod344" target="_blank" rel="noopener noreferrer"className="text-white me-3 fs-5"> <i className="bi bi-twitter"></i> </a>

             <a href="https://www.linkedin.com/in/om-pradip-rathod/" target="_blank"rel="noopener noreferrer" className="text-white fs-5"> <i className="bi bi-linkedin"></i></a>

            </div>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center small">
          © {new Date().getFullYear()} Employee Management System | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;