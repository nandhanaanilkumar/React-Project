import React from "react";
import { useNavigate } from "react-router-dom";
const styles = {
  sidebar: {
    width: "500px",
   minHeight: "520px",   
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #004182",
    padding: "12px",
    position: "sticky",
    top: "80px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    marginRight: "10px",
  },

  input: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #004182",
    fontSize: "20px",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },

  photo: { color: "#378fe9" },
  video: { color: "#5f9b41" },
  article: { color: "#e06847" },
  poll: { color: "#8b5cf6" },
  event: { color: "#f59e0b" },

  divider: {
    borderTop: "1px solid #eee",
    margin: "12px 0",
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  listItem: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "6px",
    cursor: "pointer",
  },

  highlight: {
    color: "#0a66c2",
    fontWeight: "700",
  },
};

const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside style={styles.sidebar}>
      {/* Start Post */}
      <div style={styles.header}>
        <img
          src="https://via.placeholder.com/100"
          alt="user"
          style={styles.avatar}
        />
        <input
          type="text"
          placeholder="Start a post"
          style={styles.input}
          readOnly
          onClick={() => navigate("/createpost")}
        />
      </div>

      {/* Primary Actions */}
      <div style={styles.actions}>
        <div style={{ ...styles.actionBtn, ...styles.photo }}>📷 Photo</div>
        <div style={{ ...styles.actionBtn, ...styles.video }}>🎥 Video</div>
        <div style={{ ...styles.actionBtn, ...styles.article }}>📝 Article</div>
      </div>

      {/* Secondary Actions */}
      <div style={{ ...styles.actions, marginTop: "8px" }}>
        <div style={{ ...styles.actionBtn, ...styles.poll }}>📊 Poll</div>
        <div style={{ ...styles.actionBtn, ...styles.event }}>📅 Event</div>
      </div>

      <div style={styles.divider}></div>

      {/* Suggested Actions */}
      <div>
        <div style={styles.sectionTitle}>Quick actions</div>
        <div style={styles.listItem}>✍️ Write a blog</div>
        <div style={styles.listItem}>🎙️ Go live</div>
        <div style={styles.listItem}>📌 Create a series</div>
      </div>

      <div style={styles.divider}></div>

      {/* Trending Topics */}
      <div>
        <div style={styles.sectionTitle}>Trending topics</div>
        <div style={styles.listItem}>
          <span style={styles.highlight}>#ReactJS</span> · 12k posts
        </div>
        <div style={styles.listItem}>
          <span style={styles.highlight}>#WebDevelopment</span> · 9k posts
        </div>
        <div style={styles.listItem}>
          <span style={styles.highlight}>#AI</span> · 15k posts
        </div>
      </div>

      <div style={styles.divider}></div>

      {/* Activity */}
      <div>
        <div style={styles.sectionTitle}>Your activity</div>
        <div style={styles.listItem} onClick={() => navigate("/drafts")}>📄 Saved drafts</div>
        <div style={styles.listItem}>🔖 Bookmarked posts</div>
        <div style={styles.listItem}>📊 Post analytics</div>
      </div>
    </aside>
  );
};

export default RightSidebar;
