import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AdminDashboard = () => {

  let [employees , setEmployees]= useState([]);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    axios.get("http://localhost:8080/api/admin/all" ,{
        headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then((res)=>setEmployees(res.data))
    .catch((err) => console.log(err)); 
  }, [])

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">

        <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

        {/* Top Cards */}
        <div className="row mb-4 g-3">

          <div className="col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center h-100">
              <h6>Total Employees</h6>
              <h3 className="fw-bold text-primary">{employees.length}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center h-100">
              <h6>Present Today</h6>
              <h3 className="fw-bold text-success">{employees.filter(emp => emp.status === 'Active').length}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center h-100">
              <h6>On Leave</h6>
              <h3 className="fw-bold text-warning">{employees.filter(emp => emp.status === 'Leave').length}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center h-100">
              <h6>Pending Salary</h6>
              <h3 className="fw-bold text-danger">{employees.filter(emp => emp.status === 'Pending').length}</h3>
            </div>
          </div>

        </div>

        {/* Employee Table */}
        <div className="card shadow-sm rounded-4">
          <div className="card-body">
            <h5 className="mb-3 fw-bold">Leave People List</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>JoinDate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
               {
                employees
                .filter(emp => emp.status === 'Leave')
                .map((emp , index)=>(
                <tr key={emp.id}>
                  <td>{index+1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.joinDate}</td>
                  <td>
                <span className={
                  emp.status === "Active"
                  ? "badge bg-success"  
                  : "badge bg-warning text-dark"}>
                  {emp.status}
                </span>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;