import React from "react";
import { useNavigate } from "react-router-dom";

const Admintopbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/");
  };

  return (
    <div
      style={{
        padding: "15px 20px",
        background: "#ffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Page Title */}
      <h2 style={{ margin: 0 }}>Dashboard</h2>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontWeight: "500" }}>Admin</span>

        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admintopbar;
