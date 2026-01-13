import React from "react";

const ReportedPostsTab = () => {
  const reportedPosts = [
    {
      id: 1,
      author: "John Doe",
      time: "2h ago",
      content:
        "This post contains misleading information about investments.",
      reports: 5,
      reason: "Fake / Misleading",
      status: "Under Review",
    },
    {
      id: 2,
      author: "Jane Smith",
      time: "1d ago",
      content:
        "This comment includes offensive language towards a group.",
      reports: 3,
      reason: "Hate Speech",
      status: "Under Review",
    },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>🚩 Reported Posts</h3>

      {reportedPosts.map((post) => (
        <div
          key={post.id}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div>
              <strong>{post.author}</strong>
              <span style={{ color: "#777", marginLeft: "8px" }}>
                • {post.time}
              </span>
            </div>

            <span
              style={{
                background: "#fef3c7",
                color: "#92400e",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {post.status}
            </span>
          </div>

          {/* Content */}
          <p style={{ marginBottom: "10px" }}>{post.content}</p>

          {/* Report Info */}
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            🚨 {post.reports} reports • Reason: {post.reason}
          </div>

          {/* Admin Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-sm btn-outline-danger">
              Delete
            </button>
            <button className="btn btn-sm btn-outline-warning">
              Hide
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportedPostsTab;
