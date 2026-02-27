import React from "react";
import { useState, useEffect } from "react";
const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    height: "calc(100vh - 100px)",
    overflowY: "auto",
    padding: "10px",
  },

  notificationCard: {
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    padding: "14px",
    marginBottom: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    width: "100%",
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  content: {
    flex: 1,
  },

  name: {
    fontWeight: "600",
    fontSize: "16px",
  },

  message: {
    fontSize: "15px",
    color: "#333",
    margin: "4px 0",
    lineHeight: "1.4",
  },

  time: {
    fontSize: "13px",
    color: "#777",
  },

  badge: {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "12px",
    background: "#f0f2f5",
    marginLeft: "6px",
  },
};


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

useEffect(() => {

  const fetchNotifications = async () => {

    const loggedUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    const res = await fetch(
      `http://localhost:5000/notifications/${loggedUser.id}`
    );

    const data = await res.json();

    const formatted = data.map(n => ({
      id: n._id,
      name:
        `${n.senderId?.firstName || ""} ${
          n.senderId?.lastName || ""
        }`,
      avatar:
        n.senderId?.profileImage ||
        "https://via.placeholder.com/100",
      message: n.message,
      type: n.type,
      time: new Date(n.createdAt).toLocaleString(),
    }));

    setNotifications(formatted);
  };

  fetchNotifications();

}, []);
  return (
    <div style={styles.container}>
      {notifications.map((note) => (
        <div key={note.id} style={styles.notificationCard}>
          
          {/* Avatar */}
          <img src={note.avatar} alt="user" style={styles.avatar} />

          {/* Content */}
          <div style={styles.content}>
            <div>
              <span style={styles.name}>{note.name}</span>
              <span style={styles.badge}>{note.type}</span>
            </div>
            <p style={styles.message}>{note.message}</p>
            <span style={styles.time}>{note.time}</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Notifications;
