import React from "react";

const CommentItem = ({ text, onDelete }) => {
  return (
    <div
      style={{
        marginTop: "6px",
        padding: "8px 10px",
        background: "#f3f4f6",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      <span>💬 {text}</span>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default CommentItem;
