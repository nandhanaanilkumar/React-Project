import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedPostsTab = () => {

  const [reportedPosts, setReportedPosts] = useState([]);

  // FETCH FROM BACKEND
  const fetchReportedPosts = async () => {
    const res = await axios.get(
      "http://localhost:5000/admin/reports/posts"
    );
const sortedPosts = res.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

    setReportedPosts(sortedPosts);
  };

  useEffect(() => {
    fetchReportedPosts();
  }, []);
console.log(reportedPosts);
 const deletePost = async (id) => {

  await axios.delete(
    `http://localhost:5000/admin/reports/posts/delete/${id}`
  );

  fetchReportedPosts(); // refresh list
};
    const hidePost = async (id) => {

    await axios.put(
`http://localhost:5000/admin/reports/posts/hide/${id}`    );

    fetchReportedPosts();
  };
  const toggleHidePost = async (id) => {

  await axios.put(
    `http://localhost:5000/admin/reports/posts/toggle-hide/${id}`
  );

  fetchReportedPosts();
};
return (
  <div style={container}>
    <h3 style={title}>🚩 Reported Posts</h3>

    {reportedPosts.map((post) => (
      <div key={post._id} style={card}>

        {/* HEADER */}
        <div style={header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={post.userId?.profileImage || "https://via.placeholder.com/40"}
              alt=""
              style={avatar}
            />

            <div>
              <strong>
                {post.userId?.firstName} {post.userId?.lastName}
              </strong>

              <div style={time}>
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <span style={statusBadge}>
            {post.status || "Under Review"}
          </span>
        </div>

        {/* CONTENT */}
        <p style={text}>{post.text}</p>

        {/* MEDIA */}
        {post.mediaUrl && (
          <div style={mediaWrapper}>
            {post.mediaUrl.startsWith("data:video") ? (
              <video controls style={media}>
                <source src={post.mediaUrl} />
              </video>
            ) : (
              <img src={post.mediaUrl} alt="" style={media} />
            )}
          </div>
        )}

        {/* STATS */}
        <div style={stats}>
          👍 {post.likesCount || 0} Likes
          <span>•</span>
          💬 {post.comments?.length || 0} Comments
          <span>•</span>
          🔖 {post.saves || 0} Saves
          <span>•</span>
          🚨 {post.reports || 0} Reports
        </div>

        {/* ACTION BUTTONS */}
        <div style={actions}>
          <button
            style={deleteBtn}
            onClick={() => deletePost(post._id)}
          >
            Delete
          </button>

          <button
            style={hideBtn}
            onClick={() => toggleHidePost(post._id)}
          >
            {post.isHidden ? "Unhide Post" : "Hide Post"}
          </button>
        </div>

      </div>
    ))}
  </div>
);

};

export default ReportedPostsTab;
const container = {
  maxWidth: "1300px",
  margin: "auto",
  padding: "20px",
  maxHeight:"1000px"
};

const title = {
  marginBottom: "20px",
  fontWeight: "600"
};

const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "18px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",

};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
};

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover"
};

const time = {
  fontSize: "12px",
  color: "#666"
};

const statusBadge = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "4px 10px",
  borderRadius: "8px",
  fontSize: "12px"
};

const text = {
  marginBottom: "10px",
  fontSize: "15px"
};

const mediaWrapper = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const media = {
  width: "100%",
  maxHeight: "320px",
  borderRadius: "10px",
  objectFit: "cover"
};

const stats = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "8px",
  borderRadius: "6px",
  fontSize: "14px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  marginBottom: "12px"
};

const actions = {
  display: "flex",
  gap: "10px"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const hideBtn = {
  background: "#f59e0b",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};