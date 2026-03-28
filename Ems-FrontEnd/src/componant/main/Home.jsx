import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {

  const navigate = useNavigate();

  return (

    <div>
      {/* Hero Section */}

      <div
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "90vh",
          background: "linear-gradient(135deg, #667eea, #764ba2)"
        }}>

        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            Employee Management System
          </h1>
          <p className="lead mb-4">
            Manage employees, attendance, salary and reports efficiently.
          </p>

          <button
            className="btn btn-light btn-lg me-3 fw-semibold rounded-3"
            onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="btn btn-outline-light btn-lg fw-semibold rounded-3"
            onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">
          System Features
        </h2>

        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-4 rounded-4 h-100">
              <h5 className="fw-bold">Employee Management</h5>
              <p className="text-muted">
                Add, update and manage employee records easily.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-4 rounded-4 h-100">
              <h5 className="fw-bold">Attendance Tracking</h5>
              <p className="text-muted">
                Track daily attendance and monitor performance.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-4 rounded-4 h-100">
              <h5 className="fw-bold">Salary & Reports</h5>
              <p className="text-muted">
                Generate salary reports and manage payroll efficiently.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;