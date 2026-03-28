import React, { useState } from "react";
import axios from "axios";

const EmployeeUpdateProfile = ({ employee, setEmployee, setEditing }) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    phone: employee.phone,
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.put(
        "http://localhost:8080/api/employee/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployee(res.data); // Update parent state
      setMessage("Profile updated successfully ✅");
      setEditing(false); // Close form
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile ❌");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      {message && <p>{message}</p>}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your Name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
          pattern="[0-9]{10}"
          maxLength="10"
          placeholder="Enter 10-digit number"
          required
        />
      </div>
      <button type="submit" className="btn btn-success me-2">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EmployeeUpdateProfile;