import React, { useState } from "react";
const styles = {

  header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},
  commentContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginTop: "8px",
    width: "100%",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0, // ⭐ prevents image shrinking
  },

  content: {
    flex: 1, // ⭐ allows bubble to take space
  },

  bubble: {
    background: "#f3f2ef",
    borderRadius: "12px",
    padding: "8px 12px",
    display: "inline-block",
    maxWidth: "100%",
  },

  name: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "2px",
    whiteSpace: "nowrap", // ⭐ prevents breaking like "amal k r"
  },

  text: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.4",
    wordBreak: "break-word",
  },

  delete: {
    fontSize: "12px",
    color: "#777",
    cursor: "pointer",
    marginTop: "4px",
  },
};
const CommentItem = ({
  text,
  name,
  avatar,
  onDelete,
  commentId,
  reportComment,
}) =>{
  const [showMenu, setShowMenu] = useState(false);

    return (
    <div style={styles.commentContainer}>
      
      {/* Profile Image */}
      <img
        src={avatar || "https://via.placeholder.com/40"}
        alt="user"
        style={styles.avatar}
      />

      <div style={styles.content}>
        <div style={styles.bubble}>
          <div style={styles.name}>{name}</div>
           <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                ⋯
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    padding: "5px",
                  }}
                  onClick={() => {
                    reportComment(commentId);
                    setShowMenu(false);
                  }}
                >
                  🚩 Report Comment
                </div>
              )}
            </div>
          <div style={styles.text}>{text}</div>
        </div>

        <div style={styles.delete} onClick={onDelete}>
          Delete
        </div>
      </div>

    </div>
  );
};

export default CommentItem;