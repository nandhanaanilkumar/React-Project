import React, { useState } from "react";
const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "10px",
    padding: "8px",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  input: {
    flex: 1,
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  postBtn: {
    backgroundColor: "#0a66c2",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

const CommentBox = ({ onAdd }) => {
  const [text, setText] = useState("");
const loggedUser =
  JSON.parse(localStorage.getItem("loggedInUser"));

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Avatar */}
     <img
  src={
    loggedUser?.profileImage ||
    "https://via.placeholder.com/40"
  }
  alt="user"
  style={styles.avatar}
/>
      {/* Input */}
      <input
        type="text"
        placeholder="Add a comment…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.input}
      />

      {/* Post Button */}
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        style={{
          ...styles.postBtn,
          opacity: text.trim() ? 1 : 0.5,
        }}
      >
        Post
      </button>
    </div>
  );
};

export default CommentBox;
