import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./componant/main/Home";
import Login from "./componant/Login";
import Register from "./componant/Register";
import Layout from "./componant/main/Layout";
import AdminDashboard from "./componant/Admin/AdminDashBoard";
import AdminManage from "./componant/Admin/AdminManage";
import AdminLeaveDashboard from "./componant/Admin/AdminLeaveDashBoard";
import EmployeeDashboard from "./componant/Employee/EmployeeDashBoard";
import EmployeeLeaveDashboard from "./componant/Employee/EmployeeLeaveRequst";

function LayoutWrapper() {
  const location = useLocation();

  return (
    <Routes>
      {/* Auth Pages and standalone pages (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin Routes without Layout */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/employees" element={<AdminManage />} />
      <Route path="/admin/leave" element={<AdminLeaveDashboard />} />

      {/* Employee Routes without Layout */}
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/leaveRequest" element={<EmployeeLeaveDashboard />} />

      {/* Pages with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Optional: 404 Page */}
      <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
      </div>} />
    </Routes>
  );
}

export default function App() {
  return <LayoutWrapper />;
}