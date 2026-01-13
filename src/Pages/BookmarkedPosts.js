import React, { useEffect, useState } from "react";
const styles = {
  navbar: {
    height: "60px",
    background: "#0a66c2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontWeight: "bold",
    fontSize: "20px",
    cursor: "pointer",
  },

  navTitle: {
    fontSize: "16px",
  },

  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "0 12px",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    border: "1px solid #e0e0e0",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    marginRight: "10px",
  },

  name: {
    fontWeight: "600",
  },

  time: {
    fontSize: "13px",
    color: "#777",
  },

  text: {
    fontSize: "16px",
    marginBottom: "10px",
  },

  image: {
    width: "100%",
    borderRadius: "8px",
    maxHeight: "400px",
    objectFit: "cover",
  },

  emptyState: {
    textAlign: "center",
    marginTop: "80px",
    color: "#666",
  },
};

const BookmarkedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("bookmarkedPosts")) || [];
    setSavedPosts(stored);
  }, []);

  return (
    <>

      {/* PAGE CONTENT */}
      <div style={styles.container}>
        {savedPosts.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>No saved posts yet</h3>
            <p>Save posts to read them later</p>
          </div>
        ) : (
          savedPosts.map((post) => (
            <div key={post.id} style={styles.card}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <img
                  src={post.avatar}
                  alt="user"
                  style={styles.avatar}
                />
                <div>
                  <div style={styles.name}>{post.name}</div>
                  <div style={styles.time}>{post.time}</div>
                </div>
              </div>

              {/* Content */}
              <p style={styles.text}>{post.text}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  style={styles.image}
                />
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BookmarkedPosts;
