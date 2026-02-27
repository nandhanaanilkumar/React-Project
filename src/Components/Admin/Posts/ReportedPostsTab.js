import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedPostsTab = () => {

  const [reportedPosts, setReportedPosts] = useState([]);

  // FETCH FROM BACKEND
  const fetchReportedPosts = async () => {
    const res = await axios.get(
      "http://localhost:5000/admin/reports/posts"
    );

    setReportedPosts(res.data);
  };

  useEffect(() => {
    fetchReportedPosts();
  }, []);
console.log(reportedPosts);
  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>🚩 Reported Posts</h3>

      {reportedPosts.map((post) => (
        <div
          key={post._id}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >

          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div>
              <strong>
                {post.userId?.firstName} {post.userId?.lastName}
              </strong>

              <span style={{ color: "#777", marginLeft: "8px" }}>
                • {new Date(post.createdAt).toLocaleString()}
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
              {post.status || "Under Review"}
            </span>
          </div>

          {/* CONTENT */}
          <p style={{ marginBottom: "10px" }}>
            {post.text}
          </p>

          {/* IMAGE */}
          {post.mediaUrl && (
            <img
              src={post.mediaUrl}
              alt=""
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          )}

          {/* EXTRA INFO (LIKE FEED) */}
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
            👍 {post.likesCount || 0} Likes •
            💬 {post.comments?.length || 0} Comments •
            🔖 {post.saves || 0} Saves •
            🚨 {post.reports || 0} Reports
          </div>

          {/* ADMIN ACTIONS */}
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