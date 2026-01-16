import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Adminsidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItem = (label, path) => (
    <div
      onClick={() => navigate(path)}
      style={{
        padding: "10px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        background:
          location.pathname === path ? "#334155" : "transparent",
        marginBottom: "6px",
        transition: "0.2s",
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        fontSize: "22px",
      }}
    >
      {/* Title */}
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Admin Panel
      </h3>

      {/* Menu */}
      {menuItem("📊 Dashboard","/admindashboard")}
      {menuItem("👥 Users", "/usermanagementpage")}
      {menuItem("📝 Posts", "/admin/posts")}
      {menuItem("💬 Comments", "/commentmoderationpage")}
      {menuItem("📈 Analytics", "/analytics")}
      {menuItem("⚙️ Settings")}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div
        style={{
          fontSize: "12px",
          color: "#94a3b8",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        © 2026 Admin
      </div>
    </div>
  );
};

export default Adminsidebar;
