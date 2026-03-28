import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow fixed-top"
      style={{
        background: "linear-gradient(90deg, #667eea, #764ba2)"
      }}>
    
      <div className="container">
        {/* Project Title */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          EMS - Employee Management System
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">

          {/* <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
          </li> */}

          <li className="nav-item ms-lg-3">
              <Link
                className="btn btn-light btn-sm fw-semibold px-3 rounded-3 me-2" to="/login">
                Login
              </Link>
          </li>

          <li className="nav-item">
              <Link
                className="btn btn-outline-light btn-sm fw-semibold px-3 rounded-3"
                to="/register">
                Register
              </Link>
          </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;