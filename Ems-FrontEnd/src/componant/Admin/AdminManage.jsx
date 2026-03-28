import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminManage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    salary: "",
    joinDate: "",
    status: "Active"
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/api/admin/all", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/admin/add", form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        fetchEmployees();
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      phone: emp.phone,
      salary: emp.salary,
      joinDate: emp.joinDate,
      status: emp.status
    });
    setEditingId(emp.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/admin/edit/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        fetchEmployees();
        resetForm();
        setEditingId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      axios
        .delete(`http://localhost:8080/api/admin/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(fetchEmployees)
        .catch((err) => console.log(err));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      department: "",
      phone: "",
      salary: "",
      joinDate: "",
      status: "Active"
    });
  };

  // ✅ Count employees on leave
  const leaveCount = employees.filter(emp => emp.status === "Leave").length;
  const activeCount = employees.filter(emp => emp.status === "Active").length;

  return (
    <div className="container-fluid p-4 bg-light" style={{ minHeight: "100vh" }}>

      {/* Home button*/}
      <button 
        className="btn btn-light fw-semibold rounded-3 shadow-sm position-absolute"
        style={{ top: "20px", left: "20px", zIndex: 1000 }}
        onClick={() => navigate("/admin")}>
        ← Home
      </button>

      <h2 className="mb-4 fw-bold text-center">Manage Employees</h2>

      {/* Status Summary */}
      <div className="mb-4 d-flex gap-2 justify-content-center">
        <span className="badge bg-success">Active: {activeCount}</span>
        <span className="badge bg-warning text-dark">Leave: {leaveCount}</span>
        <span className="badge bg-secondary">Total: {employees.length}</span>
      </div>

      {/* Employee Form */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h5 className="mb-3 fw-bold">{editingId ? "Update Employee" : "Add New Employee"}</h5>
          <form onSubmit={editingId ? handleUpdate : handleSubmit}>
            <div className="row g-3">

              <div className="col-md-3">
                <input type="text" className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" name="department" placeholder="Department" value={form.department} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="number" className="form-control" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" name="phone" placeholder="Phone"  maxLength={10}
  pattern="[0-9]{10}"  value={form.phone} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="date" className="form-control" name="joinDate" placeholder="Joining Date" value={form.joinDate} onChange={handleChange} required/>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" name="status" placeholder="Status" value={form.status} onChange={handleChange} required/>
              </div>

              <div className="col-md-2 d-grid">
                <button className="btn btn-primary">{editingId ? "Update Employee" : "Add Employee"}</button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="mb-3 fw-bold">Employee List</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>₹{emp.salary}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.joinDate}</td>
                    <td>
                      <span className={emp.status === "Active" ? "badge bg-success" : "badge bg-warning text-dark"}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(emp.id)}>Delete</button>
                      <button className="btn btn-sm btn-primary" onClick={() => handleEdit(emp)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminManage;