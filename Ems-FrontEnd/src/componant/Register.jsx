import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

const Register = () => {

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE"  
  });

  function inputhandler(event) {
    const { name, value } = event.target;
    setEmployee((old) => ({ ...old, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault();

    axios.post("http://localhost:8080/auth/register", employee)
      .then((res) => {
        alert("Registration Successful");

        // ✅ Reset form
        setEmployee({
          username: "",
          email: "",
          password: "",
          role: "EMPLOYEE"
        });

        navigate("/login");
      })
      .catch((err) => {
      const message =
        err.response?.data?.message ||
        "Registration Failed. Try again.";

      alert(message);
      });
    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>

      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">
          Create Account
        </h3>

        <form onSubmit={submitForm}>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control rounded-3"
              name="username"
              placeholder="Enter your Username"
              value={employee.username}
              onChange={inputhandler}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              name="email"
              placeholder="Enter your Email"
              value={employee.email}
              onChange={inputhandler}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              name="password"
              placeholder="Enter your Password"
              value={employee.password}
              onChange={inputhandler}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Register As</label>
            <select
              className="form-select rounded-3"
              name="role"
              value={employee.role}
              onChange={inputhandler}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* Register Button */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary rounded-3 fw-bold">
              Register
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center">
            <p className="mb-0 text-muted">
              Already have an account?
              <span
                role="button"
                className="ms-2 fw-bold"
                style={{ color: "#2563eb", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;