import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

   const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const inputhandler = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const empLogin =(e) =>{
    e.preventDefault();
    axios.post("http://localhost:8080/auth/login",login)
    .then((res)=>{
      if(res.data.token){
        localStorage.setItem("token" , res.data.token);
        localStorage.setItem("role" , res.data.role);

      alert("login Successfully");
      if(res.data.role === "ADMIN"){
          navigate("/admin");
      }else{
        navigate("/employee")
      }
    }else{
        alert("Invaild Credentials");
    }
    });
  } 

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)"
      }} >

      {/* 🏠 Home Button */}
      <button
        className="btn btn-light position-absolute top-0 start-0 m-4 fw-semibold rounded-3 shadow-sm"
        onClick={() => navigate("/")}
      >
        ← Home
      </button>

      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4 fw-bold text-primary">
          Welcome Back
        </h3>

        <form onSubmit={empLogin}>
          
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={login.email}
              onChange={inputhandler}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control rounded-3"
              placeholder="Enter your password"
              value={login.password}
              onChange={inputhandler}
              required
            />
          </div>

          {/* Login Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-primary rounded-3 fw-bold"
            >
              Login
            </button>
          </div>

          {/* Register Redirect */}
          <div className="text-center">
            <span className="text-muted">
              Don't have an account?
            </span>
            <span
              role="button"
              className="ms-2 fw-bold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}>
              Register
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;