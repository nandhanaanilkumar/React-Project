import React,{ useState}from "react";
import CommentBox from "./Comment/CommentBox";  
import CommentItem from "./Comment/CommentItem";
const styles = { 
  feed: {
    width: "100%",
    maxWidth: "1000px",          
    margin: "0 auto",           
    height: "calc(100vh - 100px)",
    overflowY: "auto",
    padding: "10px",
  },

  postCard: {
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    padding: "16px",
    marginBottom: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  },

  postHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    marginRight: "12px",
    objectFit: "cover",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
  },

  name: {
    fontWeight: "600",
    fontSize: "18px",
  },

  time: {
    fontSize: "15px",
    color: "#777",
  },

  postText: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "12px",
    lineHeight: "1.6",
  },

  postImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "12px",
    maxHeight: "450px",
    objectFit: "cover",
  },

  actions: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  },

  actionBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
  },
};
const Feed = () => {
const [posts, setPosts] = useState([
  {
    id: 1,
    name: "John Doe",
    time: "2h • 🌍",
    avatar: "https://via.placeholder.com/100",
    text: "🚀 Just published a new blog on React performance optimization. Sharing some real-world tips!",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    liked: false,
comments: [],
showCommentBox: false

  },
  {
    id: 2,
    name: "Jane Smith",
    time: "5h • 🌍",
    avatar: "https://via.placeholder.com/100",
    text: "Writing clean code is not about being clever — it’s about being readable.",
    image: null, 
    liked: false,
comments: [],
showCommentBox: false

  },
  {
    id: 3,
    name: "Alex Johnson",
    time: "1d • 🌍",
    avatar: "https://via.placeholder.com/100",
    text: "📸 Captured this while working late on my blogging platform project!",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
liked: false,
    comments: [],
showCommentBox: false
    
  },
]);


  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

const toggleCommentBox = (id) => {
  setPosts(prev =>
    prev.map(post =>
      post.id === id
        ? { ...post, showCommentBox: !post.showCommentBox }
        : post
    )
  );
};

const addComment = (postId, text) => {
  setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { id: Date.now(), text },
            ],
            showCommentBox: false,
          }
        : post
    )
  );
};

const deleteComment = (postId, commentId) => {
  setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(
              c => c.id !== commentId
            ),
          }
        : post
    )
  );
};



  return (
    <div style={styles.feed}>
      {posts.map((post) => (
        <div key={post.id} style={styles.postCard}>

          {/* Header */}
          <div style={styles.postHeader}>
            <img src={post.avatar} alt="user" style={styles.avatar} />
            <div style={styles.userInfo}>
              <span style={styles.name}>{post.name}</span>
              <span style={styles.time}>{post.time}</span>
            </div>
          </div>

          {/* Blog Text */}
          <p style={styles.postText}>{post.text}</p>

          {/* Optional Image */}
          {post.image && (
            <img src={post.image} alt="post" style={styles.postImage} />
          )}

          {/* Actions */}
          <div style={styles.actions}>
 <div
            className={`btn btn-sm ${
              post.liked ? "btn-primary" : "btn-outline-secondary"
            }`}
            style={styles.actionBtn}
            onClick={() => toggleLike(post.id)}
          >
            <i
              className={
                post.liked
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
              style={{ marginRight: "6px" }}
            />
            Like
          </div>
{/* Comment button */}
<div
  className="btn btn-outline-secondary btn-sm"
  style={styles.actionBtn}
  onClick={() => toggleCommentBox(post.id)}
>
  💬 Comment ({post.comments.length})
</div>

{/* Comment input section */}
{post.showCommentBox && (
  <CommentBox
    onAdd={(text) => addComment(post.id, text)}
  />
)}

{/* Comments list */}
{post.comments.map((comment) => (
  <CommentItem
    key={comment.id}
    text={comment.text}
    onDelete={() =>
      deleteComment(post.id, comment.id)
    }
  />
))}
            <div className="btn btn-outline-secondary btn-sm" style={styles.actionBtn}>Share</div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Feed;
