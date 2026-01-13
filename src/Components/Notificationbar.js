import React from "react";

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

const notifications = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/100",
    message: "👍 liked your post",
    time: "2 minutes ago",
    type: "like",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/100",
    message: "💬 commented: “Great insights, thanks for sharing!”",
    time: "20 minutes ago",
    type: "comment",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "https://via.placeholder.com/100",
    message: "📢 shared your post",
    time: "1 hour ago",
    type: "share",
  },
  {
    id: 4,
    name: "Emily Clark",
    avatar: "https://via.placeholder.com/100",
    message: "📝 published a new blog post",
    time: "3 hours ago",
    type: "post",
  },
  {
    id: 5,
    name: "Michael Lee",
    avatar: "https://via.placeholder.com/100",
    message: "❤️ loved your blog on React optimization",
    time: "1 day ago",
    type: "like",
  },
];

const Notifications = () => {
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
