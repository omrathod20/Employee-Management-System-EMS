import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLeaveDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/leave/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const handleSubmit = async () => {
    if (!reason || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/leave/request",
        { reason, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave request submitted!");
      setReason("");
      setStartDate("");
      setEndDate("");
      fetchMyLeaves();
    } catch (err) {
      console.error(err);
      alert("Error submitting leave");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success text-white";
      case "Rejected":
        return "bg-danger text-white";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-secondary mb-4 rounded-pill"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="row g-4">
        {/* LEAVE REQUEST FORM */}
        <div className="col-lg-4">
          <div className="card shadow-lg rounded-4 p-4">
            <h5 className="fw-bold mb-3">Submit Leave Request</h5>
            <input
              type="text"
              placeholder="Reason"
              className="form-control mb-2 rounded-pill"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-2 rounded-pill"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-3 rounded-pill"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              className="btn btn-warning w-100 rounded-pill fw-bold"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </div>
        </div>

        {/* LEAVE REQUEST LIST */}
        <div className="col-lg-8">
          <div className="card shadow-lg rounded-4 p-4">
            <h5 className="fw-bold mb-4">My Leave Requests</h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Reason</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No leave requests yet
                      </td>
                    </tr>
                  ) : (
                    leaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.reason}</td>
                        <td>{leave.startDate}</td>
                        <td>{leave.endDate}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-pill ${statusColor(
                              leave.status
                            )}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveDashboard;