import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeUpdateProfile from "./EmployeeUpdateProfile";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch employee profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employee/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  // Fetch attendance once employee data is loaded
  useEffect(() => {
    if (employee) fetchAttendance();
  }, [employee]);

  const fetchAttendance = async () => {
    try {
      const countRes = await axios.get(
        "http://localhost:8080/api/employee/attendance/count",
        {
          params: { email: employee.email },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendanceCount(countRes.data);

      const listRes = await axios.get(
        "http://localhost:8080/api/employee/attendance/list",
        {
          params: { email: employee.email },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendanceList(listRes.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/employee/attendance/mark",
        null,
        {
          params: { email: employee.email },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Attendance marked successfully!");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data || "Employee Already Mark.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

 if (!employee) {
  return (
    <div className="loader-page">
      <div className="logo">EMS</div>
      <div className="loader"></div>
      <p>Loading your profile...</p>
    </div>
  );
}

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* LEFT SIDE - PROFILE SUMMARY */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-4 text-center p-4">
            {/* Avatar */}
            <div
              className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold mb-3 shadow"
              style={{ width: "110px", height: "110px", fontSize: "38px" }}
            >
              {employee.name.charAt(0)}
            </div>
            <h4 className="fw-bold mb-1">{employee.name}</h4>

            {/* Status Badge */}
            <div className="d-flex justify-content-center mt-2">
              <div
                className={`d-flex align-items-center px-3 py-2 rounded-pill ${
                  employee.status === "Active"
                    ? "bg-success bg-opacity-10 text-success"
                    : "bg-warning bg-opacity-10 text-warning"
                }`}
                style={{ fontSize: "13px" }}
              >
                <span
                  className={`me-2 rounded-circle ${
                    employee.status === "Active" ? "bg-success" : "bg-warning"
                  }`}
                  style={{ width: "8px", height: "8px" }}
                ></span>
                {employee.status}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3 d-flex flex-column gap-2">
              <button
                className="btn btn-sm btn-primary shadow-sm"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>

              <button
                className="btn btn-sm btn-success shadow-sm"
                onClick={handleMarkAttendance}
              >
                Mark Today's Attendance
              </button>

              <button
                className="btn btn-sm btn-warning shadow-sm"
                onClick={() => navigate("/leaveRequest")}>
                Leave Request
              </button>
            </div>

            {/* Total Attendance */}
            <div className="mt-4">
              <small className="text-muted">Total Days Present (Last 30 Days)</small>
              <h5 className="fw-bold">{attendanceCount}</h5>
            </div>

            <hr />

            {/* Logout */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-danger btn-lg shadow-sm w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS SECTION */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h5 className="fw-bold mb-4">Employee Details</h5>

            {editing ? (
              <EmployeeUpdateProfile
                employee={employee}
                setEmployee={setEmployee}
                setEditing={setEditing}
              />
            ) : (
              <>
                <div className="row g-4">
                  {[
                    { label: "Employee Email", value: employee.email },
                    { label: "Department", value: employee.department },
                    { label: "Joining Date", value: employee.joinDate },
                    { label: "Salary", value: `₹ ${employee.salary}`, highlight: true },
                    { label: "Mobile Number", value: employee.phone },
                    { label: "Current Status", value: employee.status },
                  ].map((item, idx) => (
                    <div className="col-md-6" key={idx}>
                      <div className="border rounded-3 p-3">
                        <small className="text-muted">{item.label}</small>
                        <h5 className={`fw-bold mb-0 ${item.highlight ? "text-success" : ""}`}>
                          {item.value}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attendance List */}
                <div className="mt-4">
                  <h5>Attendance Records (All Days)</h5>
                  <ul className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {attendanceList.map((att) => (
                      <li
                        key={att.id}
                        className={`list-group-item d-flex justify-content-between ${
                          att.present ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"
                        }`}
                      >
                        <span>{att.date}</span>
                        <span>{att.present ? "Present" : "Absent"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;