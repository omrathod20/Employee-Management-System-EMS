import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove stored login data
    localStorage.removeItem("user");
    // redirect to login page
    navigate("/login");
  };

  const goBack= ()=> {
    navigate("/")
  }
  return (
    <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
      <div>
        <h4 className="fw-bold mb-4">Admin Panel</h4>

        <ul className="nav flex-column">

          <li className="nav-item mb-2">
            <Link to="/admin" className="nav-link text-white">
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/employees" className="nav-link text-white">
              Manage Employees
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/leave" className="nav-link text-white">
              Leave
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/salary" className="nav-link text-white">
              Salary
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/reports" className="nav-link text-white">
              Reports
            </Link>
          </li>

        </ul>
      </div>

      {/* Logout Button at Bottom */}
      <div className="mt-auto">
        <button 
          onClick={handleLogout}
          className="btn btn-danger w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;