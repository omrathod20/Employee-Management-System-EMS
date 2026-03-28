import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLeaveDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/leave/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/leave/update/${id}?status=${status}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Error updating leave status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return { backgroundColor: "#28a745", color: "white" };
      case "REJECTED":
        return { backgroundColor: "#ffc107", color: "#333" };
      case "PENDING":
        return { backgroundColor: "#17a2b8", color: "white" };
      default:
        return { backgroundColor: "#6c757d", color: "white" };
    }
  };

  return (
    <div className="container py-5">
           {/* Back Button */}
      <button
        style={{
          backgroundColor: "white",
          color: "black",
          fontWeight: "500",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          marginBottom: "20px",
          cursor: "pointer",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)")}
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.2)")}
        onClick={() => window.history.back()}
      >
        &larr; Back
      </button>

      <h3 style={{ marginBottom: "20px", color: "#343a40" }}>
        All Leave Requests
      </h3>

      {/* Card Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Employee</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Reason</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Start</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>End</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}>
                  No leave requests found.
                </td>
              </tr>
            )}
            {leaves.map((l) => (
              <tr key={l.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={{ padding: "12px 16px" }}>{l.employeeName}</td>
                <td style={{ padding: "12px 16px" }}>{l.reason}</td>
                <td style={{ padding: "12px 16px" }}>{l.startDate}</td>
                <td style={{ padding: "12px 16px" }}>{l.endDate}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      ...getStatusStyle(l.status),
                      borderRadius: "20px",
                      padding: "4px 12px",
                      fontWeight: "bold",
                    }}
                  >
                    {l.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {l.status === "PENDING" && (
                    <>
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "6px 12px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateStatus(l.id, "APPROVED")}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateStatus(l.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;