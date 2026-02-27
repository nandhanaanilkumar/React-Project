import React from "react";
import { useNavigate } from "react-router-dom";

const NetworkGrid = ({ people }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {people.map((user) => (
        <div
          key={user._id}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            textAlign: "center",
          }}
      onClick={() => navigate(`/profile/${user._id}`)}        >
          <img
            src={
              user.profileImage ||
              "https://via.placeholder.com/80"
            }
            alt=""
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <h5 style={{ marginTop: "10px" }}>
            {user.firstName} {user.lastName}
          </h5>

          <p style={{ color: "#666", fontSize: "14px" }}>
            {user.headline}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NetworkGrid;