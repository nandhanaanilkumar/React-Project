import React, { useEffect, useState } from "react";
import CommentItem from "../Components/Comment/CommentItem";
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
  actions: {
  display: "flex",
  justifyContent: "space-around",
  borderTop: "1px solid #eee",
  paddingTop: "10px",
  marginTop: "10px",
  fontSize: "14px",
  color: "#555",
},

commentList: {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
},
commentItem: {
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
},

commentAvatar: {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  objectFit: "cover",
},

commentBubble: {
  background: "#f3f2ef",
  padding: "6px 10px",
  borderRadius: "10px",
},

commentName: {
  fontWeight: "600",
  fontSize: "13px",
},
};

const BookmarkedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

useEffect(() => {
  const load = () => {
    const stored =
      JSON.parse(localStorage.getItem("bookmarkedPosts")) || [];
    setSavedPosts(stored);
  };

  load();
  window.addEventListener("storage", load);

  return () => window.removeEventListener("storage", load);
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
src={post.avatar || "https://via.placeholder.com/100"}                  alt="user"
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
             {/* Actions — SAME AS FEED */}
<div style={styles.actions}>
  👍 Like ({post.likesCount || 0})
  <span>💬 Comment ({post.comments?.length || 0})</span>
  <span>🔖 Saved</span>
</div>

{/* Comments — SAME AS FEED */}
<div style={styles.commentList}>
  {(post.comments || []).map((comment) => (
    <CommentItem
      key={comment._id || comment.id}
      text={comment.text}
      name={`${comment.userId?.firstName || ""} ${
        comment.userId?.lastName || ""
      }`}
      avatar={
        comment.userId?.profileImage ||
        "https://via.placeholder.com/40"
      }
    />
  ))}
</div>
            </div>
            
          ))
        )}
      </div>
    </>
  );
};

export default BookmarkedPosts;
