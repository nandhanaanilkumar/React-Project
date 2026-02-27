import React,{ useState,useEffect}from "react";
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
    fontSize: "20px",
  },

  time: {
    fontSize: "15px",
    color: "#777",
  },

  postText: {
    fontSize: "20px",
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
    fontSize: "20px",
    color: "#555",
    cursor: "pointer",
  },

  actionBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
  },
  commentSection: {
  marginTop: "10px",
  paddingTop: "8px",
  borderTop: "1px solid #eee",
},

commentList: {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
},

};
const Feed = ({ searchQuery, searchResults }) => {
const [posts, setPosts] = useState([]);
const [openMenu, setOpenMenu] = useState(null);
 useEffect(() => {
    const fetchFeed = async () => {
      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      if (!loggedUser) return;

      const res = await fetch(
        `http://localhost:5000/feed/${loggedUser.id}`
      );

      const data = await res.json();

console.log("FEED DATA:", data);
    const formattedPosts =
  (Array.isArray(data) ? data : []).map(post => ({
      id: post._id,
      name:
        `${post.userId?.firstName || ""} ${
          post.userId?.lastName || ""
        }`,
      avatar:
        post.userId?.profileImage ||
        "https://via.placeholder.com/100",

      text: post.text,
      image: post.mediaUrl || null,

      time: new Date(post.createdAt).toLocaleString(),

      liked: post.isLiked || false,
      likesCount: post.likesCount || 0,

      comments: post.comments || [],

      showCommentBox: false,
    }));

    setPosts(formattedPosts);
  };

  fetchFeed();

}, []);

 const toggleLike = async (id) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const res = await fetch("http://localhost:5000/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: loggedUser.id,
      postId: id,
    }),
  });

  const data = await res.json();

  setPosts(prev =>
    prev.map(post =>
      post.id === id
        ? {
            ...post,
            liked: !post.liked,
            likesCount: data.likesCount
          }
        : post
    )
  );
};
const toggleCommentBox = (id) => {
  setPosts(prev =>
    prev.map(post =>
      post.id === id
        ? {
            ...post,
            showCommentBox: !post.showCommentBox,
          }
        : post
    )
  );
};


const addComment = async (postId, text) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const res = await fetch("http://localhost:5000/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: loggedUser.id,
      postId,
      text,
    }),
  });

  const newComment = await res.json();

  setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, newComment],
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
            comments: (post.comments || []).filter(
              c => (c._id || c.id) !== commentId
            ),
          }
        : post
    )
  );
};
const reportPost = async (postId) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch("http://localhost:5000/report/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      postId,
    }),
  });

  setOpenMenu(null); // ⭐ CLOSE MENU
  alert("Post reported");
};

const reportComment = async (commentId) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch("http://localhost:5000/report/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      commentId,
    }),
  });

  alert("Comment reported");
};
const toggleBookmark = (post) => {

  const savedPosts =
    JSON.parse(localStorage.getItem("bookmarkedPosts")) || [];

  const bookmarkPost = {
    id: post.id,
    name: post.name,
    avatar: post.avatar,
    time: post.time,
    text: post.text,
    image: post.image,
    likesCount: post.likesCount || 0,
    comments: post.comments || [],
  };

  const exists = savedPosts.find(p => p.id === post.id);

  let updated;

  if (exists) {
    updated = savedPosts.filter(p => p.id !== post.id);
  } else {
    updated = [...savedPosts, bookmarkPost];
  }

  localStorage.setItem(
    "bookmarkedPosts",
    JSON.stringify(updated)
  );
};
const searchText = searchQuery?.text || "";

  const filteredPosts = searchText
    ? posts.filter(
        p =>
          p.text?.toLowerCase().includes(searchText.toLowerCase()) ||
          p.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    : posts;
    if (searchResults?.users || searchResults?.posts) {
    return (
    <div style={styles.feed}>

      {/* PEOPLE */}
     {searchResults.users?.length > 0 && <h4>People</h4>}
      {searchResults.users.map(user => (
        <div key={user._id} style={styles.postCard}>
          <img
            src={user.profileImage || "https://via.placeholder.com/50"}
            style={styles.avatar}
            alt=""
          />
          <b>{user.firstName} {user.lastName}</b>
          <p>{user.headline}</p>
        </div>
      ))}

      {/* POSTS */}
      <h4>Posts</h4>
      {searchResults.posts.map(post => (
        <div key={post._id} style={styles.postCard}>
          <b>
            {post.userId?.firstName} {post.userId?.lastName}
          </b>
          <p>{post.text}</p>
        </div>
      ))}

    </div>
  );
}
  return (
    <div style={styles.feed}>
      {filteredPosts.map((post) => (
        <div key={post.id} style={styles.postCard}>

          {/* Header */}
          <div style={styles.postHeader}>
            <img src={post.avatar} alt="user" style={styles.avatar} />
            <div style={styles.userInfo}>
              <span style={styles.name}>{post.name}</span>
              <span style={styles.time}>{post.time}</span>
            </div>
            <div style={{ marginLeft: "auto", position: "relative" }}>
    <button
      onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "20px",
      }}
    >
      ⋯
    </button>
      {openMenu === post.id && (
    <div style={{ background: "#fff", border: "1px solid #ddd" }}>
      <div onClick={() => reportPost(post.id)}>
        🚩 Report Post
      </div>
    </div>
  )}
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
    👍 Like({post.likesCount || 0})
  </div>

  <div
    className="btn btn-outline-secondary btn-sm"
    style={styles.actionBtn}
    onClick={() => toggleCommentBox(post.id)}
  >
    💬 Comment ({post.comments?.length || 0})
  </div>

  <div
  className="btn btn-outline-secondary btn-sm"
  style={styles.actionBtn}
  onClick={() => toggleBookmark(post)}
>
  🔖 Save
</div>


</div>
{/* Comment input BELOW post */}
{post.showCommentBox && (
  <div style={styles.commentSection}>
    <CommentBox onAdd={(text) => addComment(post.id, text)} />
  </div>
)}
<div style={styles.commentList}>
  {(post.comments || []).map((comment) => (
    <CommentItem
      key={comment._id || comment.id}
      commentId={comment._id || comment.id}   // ⭐ IMPORTANT FIX
      reportComment={reportComment}
      text={comment.text}
      name={`${comment.userId?.firstName || ""} ${
        comment.userId?.lastName || ""
      }`}
      avatar={
        comment.userId?.profileImage ||
        "https://via.placeholder.com/40"
      }
      onDelete={() =>
        deleteComment(post.id, comment._id || comment.id)
      }
    />
  ))}
</div>

        </div>
      ))}
    </div>
  );
};

export default Feed;
