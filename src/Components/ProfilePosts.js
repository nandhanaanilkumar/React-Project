import React, { useEffect, useState, useRef } from "react";
import profile from "../assets/Profile.jpg";

const ProfilePosts = () => {

  const [posts, setPosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState("");

  const menuRef = useRef(null);

  // FETCH POSTS
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

  // START EDIT
  const startEdit = (post) => {
    setEditingPost(post._id);
    setEditText(post.text);
    setEditImage(post.mediaUrl || "");
    setOpenMenu(null);
  };

  // SAVE EDIT
  const saveEdit = async () => {

    await fetch(
      `http://localhost:5000/editPost/${editingPost}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editText,
          mediaUrl: editImage,
        }),
      }
    );

    setPosts(prev =>
      prev.map(p =>
        p._id === editingPost
          ? { ...p, text: editText, mediaUrl: editImage }
          : p
      )
    );

    setEditingPost(null);
  };

  // DELETE POST
 const handleDelete = async (postId) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch(
    `http://localhost:5000/post/${postId}/${loggedUser.id}`,
    {
      method: "DELETE",
    }
  );

  setPosts(prev =>
    prev.filter(p => p._id !== postId)
  );
};
const handleLike = async (postId) => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const res = await fetch(
    "http://localhost:5000/like",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedUser.id,
        postId,
      }),
    }
  );

  const data = await res.json();

  setPosts(prev =>
    prev.map(p =>
      p._id === postId
        ? { ...p, likesCount: data.likesCount }
        : p
    )
  );
};
 return (
    <div className="bg-light py-2">
      <div className="container" style={{ maxWidth: "1120px" }}>
        <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4" style={{ fontSize: "22px" }}>My Activity</h4>

            {posts.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted" style={{ fontSize: "18px" }}>You haven't posted anything yet.</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post._id} className="card border mb-4 shadow-sm" style={{ borderRadius: "10px", transition: "0.3s" }}>
                  <div className="card-body p-4">
                    {/* Header */}
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={post.userId?.profileImage || profile}
                        alt="profile"
                        style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", marginRight: 15 }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold" style={{ fontSize: "19px" }}>
                          {post.userId?.firstName} {post.userId?.lastName}
                        </h6>
                        <small className="text-muted" style={{ fontSize: "14px" }}>{post.userId?.headline}</small>
                      </div>
                      
                      {/* Menu */}
                      <div className="position-relative">
                        <button className="btn btn-light rounded-circle" onClick={() => setOpenMenu(openMenu === post._id ? null : post._id)}>⋮</button>
                        {openMenu === post._id && (
                          <div className="position-absolute end-0 shadow border bg-white p-2 rounded" style={{ zIndex: 10, minWidth: "120px" }}>
                            <button className="btn btn-sm btn-link w-100 text-start text-dark text-decoration-none" onClick={() => startEdit(post)}>Edit Post</button>
                            <button className="btn btn-sm btn-link w-100 text-start text-danger text-decoration-none" onClick={() => handleDelete(post._id)}>Delete Post</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    {editingPost === post._id ? (
                      <div className="bg-light p-3 rounded">
                        <textarea className="form-control mb-2" value={editText} style={{ fontSize: "17px" }} onChange={(e) => setEditText(e.target.value)} />
                        <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}>Save Changes</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingPost(null)}>Cancel</button>
                      </div>
                    ) : (
                      <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}>{post.text}</p>
                    )}

                    {post.mediaUrl && (
                      <div className="rounded overflow-hidden mb-3 border">
                        <img src={post.mediaUrl} alt="post" className="img-fluid w-100" style={{ maxHeight: "500px", objectFit: "cover" }} />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="d-flex border-top pt-2">
                      <button className="btn btn-light flex-grow-1 fw-bold text-muted py-2" onClick={() => handleLike(post._id)} style={{ fontSize: "16px" }}>
                        👍 Like ({post.likesCount || 0})
                      </button>
                      <button className="btn btn-light flex-grow-1 fw-bold text-muted py-2" style={{ fontSize: "16px" }}>
                        💬 Comment
                      </button>
                      <button className="btn btn-light flex-grow-1 fw-bold text-muted py-2" style={{ fontSize: "16px" }}>
                        🔖 Save
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;