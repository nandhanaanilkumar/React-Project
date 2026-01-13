import React, { useState } from "react";

const CommentBox = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      <button
        className="btn btn-sm btn-primary mt-2"
        onClick={handleAdd}
      >
        Post
      </button>
    </div>
  );
};

export default CommentBox;
