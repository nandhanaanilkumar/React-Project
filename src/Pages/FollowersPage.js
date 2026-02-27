import React, { useEffect, useState } from "react";
const styles = {

  container: {
    maxWidth: "850px",
    margin: "30px auto",
    padding: "10px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "25px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "14px 18px",
    marginBottom: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    transition: "0.2s ease",
  },

  avatarWrapper: {
    position: "relative",
    marginRight: "14px",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  onlineDot: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: "12px",
    height: "12px",
    background: "#22c55e",
    borderRadius: "50%",
    border: "2px solid white",
  },

  info: {
    flex: 1,
  },

  name: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "600",
  },

  headline: {
    margin: "4px 0",
    color: "#555",
    fontSize: "14px",
  },

  mutual: {
    margin: 0,
    fontSize: "13px",
    color: "#888",
  },

  messageBtn: {
    background: "#0a66c2",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "9px 18px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
const FollowersPage = () => {

  const [followers, setFollowers] = useState([]);
const startMessage = async (receiverId) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const res = await fetch(
    "http://localhost:5000/conversation",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: loggedUser.id,
        receiverId,
      }),
    }
  );

  const conversation = await res.json();

  // store conversation to open automatically
  localStorage.setItem(
    "openConversation",
    JSON.stringify(conversation)
  );

  window.location.href = "/messages";
};
  useEffect(() => {
    const fetchFollowers = async () => {

      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      const res = await fetch(
        `http://localhost:5000/followers/${loggedUser.id}`
      );

      const data = await res.json();

      setFollowers(data);
    };

    fetchFollowers();
  }, []);

return (
  <div style={styles.container}>
    <h2 style={styles.title}>Followers</h2>

    {followers.map((f, i) => (

      <div
        key={i}
        style={styles.card}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.01)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >

        {/* Avatar section */}
        <div style={styles.avatarWrapper}>
          <img
            src={
              f.sender.profileImage ||
              "https://via.placeholder.com/70"
            }
            alt=""
            style={styles.avatar}
          />

          {/* Online dot */}
          <span style={styles.onlineDot}></span>
        </div>

        {/* User info */}
        <div style={styles.info}>
          <h4 style={styles.name}>
            {f.sender.firstName} {f.sender.lastName}
          </h4>

          <p style={styles.headline}>
            {f.sender.headline || "Professional"}
          </p>

        </div>

        {/* Message button */}
        <button
          style={styles.messageBtn}
          onClick={() =>
            startMessage(f.receiver._id)
          }
        >
          Message
        </button>

      </div>
    ))}
  </div>
);
};

export default FollowersPage;