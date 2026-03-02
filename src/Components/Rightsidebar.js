import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  sidebar: {
    width: "500px",
    minHeight: "520px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #004182",
    padding: "16px",
    position: "sticky",
    top: "80px",
    marginRight: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "Inter, Segoe UI, Arial",
  },

  header: {
    marginBottom: "16px",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "25px",
    border: "1px solid #004182",
    background: "#f9f9f9",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },

  actionBtn: {
    padding: "8px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    background: "#f5f5f5",
  },

  divider: {
    height: "1px",
    background: "#f7f7fb",
    margin: "14px 0",
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: "10px",
    color: "#04093e",
    fontSize: "20px",
  },

  listItem: {
    padding: "8px 0",
    cursor: "pointer",
    color: "#444",
    fontSize: "18px",
    fontWeight: "400",
  },

  highlight: {
    color: "#0a66c2",
    fontWeight: "600",
  },
};

const RightSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside style={styles.sidebar}>
      {/* Start Post */}
      <div style={styles.header}>
        <input
          type="text"
          placeholder="Start a post"
          style={styles.input}
          readOnly
          onClick={() => navigate("/createpost")}
        />
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <div style={styles.actionBtn} onClick={() => navigate("/createpost")}>
          📷 Photo
        </div>
        <div style={styles.actionBtn} onClick={() => navigate("/createpost")}>
          🎥 Video
        </div>
        <div style={styles.actionBtn} onClick={() => navigate("/createpost")}>
          📝 Article
        </div>
      </div>

      <div style={styles.divider}></div>

      {/* News */}
      <div>
        <div style={styles.sectionTitle}>Postly News</div>

        <div style={styles.listItem} onClick={() => navigate("/news")}>
          📰 React 19 improves rendering performance
        </div>
        <div style={styles.listItem} onClick={() => navigate("/news")}>
          📰 AI skills dominate tech hiring in 2026
        </div>
        <div style={styles.listItem} onClick={() => navigate("/news")}>
          📰 Remote work trends continue to rise
        </div>
      </div>

      <div style={styles.divider}></div>

      {/* Trending */}
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
        <div style={styles.listItem} onClick={() => navigate("/drafts")}>
          📄 Saved drafts
        </div>
        <div style={styles.listItem} onClick={() => navigate("/bookmarks")}>
          🔖 Bookmarked posts
        </div>
        <div style={styles.listItem}>📊 Post analytics</div>
      </div>
    </aside>
  );
};

export default RightSidebar;