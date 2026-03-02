import React from "react";
import { useNavigate } from "react-router-dom";

const NetworkGrid = ({ people }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.grid}>
      {people.map((user) => (
        <div
          key={user._id}
          style={styles.card}
          onClick={() => navigate(`/profile/${user._id}`)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          {/* Top cover */}
          <div style={styles.cover}></div>

          {/* Profile Image */}
          <img
            src={user.profileImage || "https://via.placeholder.com/100"}
            alt=""
            style={styles.avatar}
          />

          {/* Name */}
          <h4 style={styles.name}>
            {user.firstName} {user.lastName}
          </h4>

          {/* Headline */}
          <p style={styles.headline}>
            {user.headline || "Professional"}
          </p>

          {/* Optional future button */}
          <button style={styles.connectBtn}>
            Connect
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.25s ease",
    position: "relative",
    paddingBottom: "15px",
  },

  cover: {
    height: "60px",
    background: "linear-gradient(135deg,#0a66c2,#004182)",
  },

  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
    marginTop: "-40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },

  name: {
    marginTop: "10px",
    fontSize: "17px",
    color: "#222",
    fontWeight: "600",
  },

  headline: {
    color: "#666",
    fontSize: "14px",
    padding: "0 12px",
    minHeight: "40px",
  },

  connectBtn: {
    marginTop: "10px",
    padding: "7px 18px",
    borderRadius: "20px",
    border: "1px solid #0a66c2",
    background: "#fff",
    color: "#0a66c2",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default NetworkGrid;