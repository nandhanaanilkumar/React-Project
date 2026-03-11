import React from "react";
const styles = {
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
  },

  header: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 10
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover"
  },

  headline: {
    margin: 0,
    fontSize: 13,
    color: "#666"
  },

  time: {
    margin: 0,
    fontSize: 12,
    color: "gray"
  },

  content: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15
  },

  postImage: {
  width: "100%",
  borderRadius: 8,
  marginTop: 10,
  maxHeight: "450px",
  objectFit: "cover"
},

  actions: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #eee",
    paddingTop: 10
  },

  actionBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#555",
    fontWeight: "500"
  }
};
const PostCard = ({ post, user }) => {
  return (
    <div style={styles.card}>
      
      {/* HEADER (Profile section) */}
      <div style={styles.header}>
        <img
          src={user.profileImage || "https://via.placeholder.com/50"}
          alt=""
          style={styles.avatar}
        />

        <div>
          <h4 style={{ margin: 0 }}>
            {user.firstName} {user.lastName}
          </h4>
          <p style={styles.headline}>{user.headline}</p>
        <p style={styles.time}>
  {new Date(post.createdAt).toLocaleString()}
</p>
        </div>
      </div>

      {/* POST CONTENT */}
     <div style={styles.content}>
  <p>{post.text}</p>

  {post.mediaUrl && (
    <div style={{ marginTop: 10 }}>
      {post.mediaUrl.startsWith("data:video") ? (
        <video
          controls
          style={styles.postImage}
        >
          <source src={post.mediaUrl} />
        </video>
      ) : (
        <img
          src={post.mediaUrl}
          alt="post"
          style={styles.postImage}
        />
      )}
    </div>
  )}
</div>

      {/* ACTIONS (LinkedIn style) */}
      <div style={styles.actions}>
        <button style={styles.actionBtn}>👍 Like</button>
        <button style={styles.actionBtn}>💬 Comment</button>
        <button style={styles.actionBtn}>↗ Share</button>
      </div>

    </div>
  );
};

export default PostCard;