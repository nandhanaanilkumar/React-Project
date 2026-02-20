import React, { useEffect, useState } from "react";
import profile from "../assets/Profile.jpg";

const ProfilePosts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedUser?.id) return;

    fetch(`http://localhost:5000/userPosts/${loggedUser.id}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err));

  }, []);

 const handleLike = async (postId) => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch("http://localhost:5000/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: loggedUser.id,
      postId
    })
  });

  console.log("Liked!");
};


const handleComment = (postId) => {
  console.log("Comment clicked:", postId);
};

const handleShare = (postId) => {
  console.log("Shared post:", postId);
};

const handleSave = (postId) => {
  console.log("Saved post:", postId);
};

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">

          <h5 className="mb-3">My Posts</h5>

          {posts.length === 0 && (
            <p className="text-muted">No posts yet.</p>
          )}

          {posts.map((post) => (
            <div key={post._id} className="mb-4 border-bottom pb-3">

              {/* Header */}
              <div className="d-flex align-items-center mb-2">
                <img
                  src={post.userId?.profileImage || profile}
                  alt="profile"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px"
                  }}
                />

                <div>
                  <h6 className="mb-0">
                    {post.userId?.firstName} {post.userId?.lastName}
                  </h6>

                  <small className="text-muted">
                    {post.userId?.headline}
                  </small>
                </div>
              </div>

              {/* Content */}
              <p>{post.text}</p>

              {/* Image */}
              {/* Image */}
{post.mediaUrl && (
  <img
    src={post.mediaUrl}
    alt="post"
    className="img-fluid rounded mb-2"
    style={{ maxHeight: "400px", objectFit: "cover" }}
  />
)}

{/* Actions */}
<div className="d-flex justify-content-between mt-2 border-top pt-2">

  <button
    className="btn btn-light btn-sm"
    onClick={() => handleLike(post._id)}
  >
    👍 Like
  </button>

  <button
    className="btn btn-light btn-sm"
    onClick={() => handleComment(post._id)}
  >
    💬 Comment
  </button>

  <button
    className="btn btn-light btn-sm"
    onClick={() => handleShare(post._id)}
  >
    🔁 Share
  </button>

  <button
    className="btn btn-light btn-sm"
    onClick={() => handleSave(post._id)}
  >
    🔖 Save
  </button>

</div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
