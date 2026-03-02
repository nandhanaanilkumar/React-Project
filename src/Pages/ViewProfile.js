import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "./PostCard"; 
const ViewProfile = () => {

  const [relation, setRelation] = useState("none");

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

 useEffect(() => {

  const fetchUser = async () => {

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    try {

      const res = await fetch(
        `http://localhost:5000/profile/${id}`
      );

      const data = await res.json();
      setUser(data);
       if (loggedUser && loggedUser._id !== id) {
        await fetch("http://localhost:5000/add-profile-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileId: id,
            viewerId: loggedUser._id || loggedUser.id,
          }),
        });
      }

      if (loggedUser) {

        const relRes = await fetch(
          `http://localhost:5000/relationship/${loggedUser.id}/${id}`
        );

        const relData = await relRes.json();

        setRelation(relData.type || "none");
      }

    } catch (err) {
      console.log(err);
    }
  };

  fetchUser();

}, [id]);

  /* ================= CONNECT ================= */
  const connectUser = async () => {

    if (!loggedUser) return;

    await fetch("http://localhost:5000/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: loggedUser.id,
        receiverId: id,
      }),
    });

    setRelation("pending_sent");
  };

  /* ================= ACCEPT REQUEST ================= */
  const acceptRequest = async () => {

    await fetch("http://localhost:5000/acceptConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: id,
        receiverId: loggedUser.id,
      }),
    });

    setRelation("connected");
  };

  /* ================= IGNORE REQUEST ================= */
  const ignoreRequest = async () => {

    await fetch("http://localhost:5000/ignoreConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: id,
        receiverId: loggedUser.id,
      }),
    });

    setRelation("none");
  };

  if (!user) return <div>Loading...</div>;

 return (
  <div style={pageContainer}>

    {/* ===== PROFILE HEADER ===== */}
    <div style={profileWrapper}>

      {/* Cover */}
      <div style={cover}></div>

      <div style={profileInfo}>
        <img
          src={user.profileImage || "https://via.placeholder.com/120"}
          alt=""
          style={profileImg}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 4 ,color: "#f0e9e9"}}>
            {user.firstName} {user.lastName}
          </h2>

          <p style={{ color: "#555", marginBottom: 6 ,fontSize: "18px"}}>
            {user.headline}
          </p>

          <p style={{ color: "#666", fontSize: 16 }}>
            {user.bio}
          </p>

          <p style={{ marginTop: 10, fontWeight: 500 }}>
            <b>{user.followers || 0}</b> Followers •{" "}
            <b>{user.following || 0}</b> Following
          </p>

          {/* RELATION BUTTONS */}
          <div style={buttonRow}>
            {relation === "none" && (
              <button style={btnPrimary} onClick={connectUser}>
                Connect
              </button>
            )}

            {relation === "pending_sent" && (
              <button style={btnOutline}>Pending</button>
            )}

            {relation === "pending_received" && (
              <>
                <button style={btnPrimary} onClick={acceptRequest}>
                  Accept
                </button>
                <button style={btnOutline} onClick={ignoreRequest}>
                  Ignore
                </button>
              </>
            )}

            {relation === "connected" && (
              <>
                <button
                  style={btnPrimary}
                  onClick={() => navigate("/messages")}
                >
                  Message
                </button>
                <button style={btnOutline}>Connected</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* ===== SKILLS ===== */}
    {user.skills?.length > 0 && (
      <div style={card}>
        <h4>Skills</h4>
        <div style={{ marginTop: 10 }}>
          {user.skills.map((s, i) => (
            <span key={i} style={skill}>{s}</span>
          ))}
        </div>
      </div>
    )}

    {/* ===== EXPERIENCE ===== */}
    {user.experience?.length > 0 && (
      <div style={card}>
        <h4>Experience</h4>
        {user.experience.map((e, i) => (
          <p key={i} style={{ padding: "6px 0" }}>• {e}</p>
        ))}
      </div>
    )}

    {/* ===== POSTS ===== */}
    <div style={card}>
      <h4 style={{ marginBottom: 15 }}>Posts</h4>

      {user.posts?.length > 0 ? (
        user.posts.map((post) => (
          <div style={postWrapper} key={post._id}>
            <PostCard post={post} user={user} />
          </div>
        ))
      ) : (
        <p style={{ color: "#666" }}>No posts available</p>
      )}
    </div>
  </div>
);
};

export default ViewProfile;


/* ================= STYLES ================= */

const pageContainer = {
  maxWidth: "1500px",
  margin: "auto",
  padding: 20,
  background: "#f3f2ef",
};

const profileWrapper = {
  background: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const cover = {
  height: 180,
  background:
    "linear-gradient(90deg, #1564b3 0%, #004182 100%)",
};

const profileInfo = {
  display: "flex",
  gap: 20,
  padding: 20,
  marginTop: -60,
};

const profileImg = {
  width: 130,
  height: 130,
  borderRadius: "50%",
  border: "4px solid white",
  objectFit: "cover",
};

const card = {
  background: "#fff",
  marginTop: 20,
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
};

const skill = {
  background: "#0a66c2",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: 20,
  marginRight: 10,
  display: "inline-block",
  marginBottom: 8,
  fontSize: 14,
};

const buttonRow = {
  display: "flex",
  gap: 10,
  marginTop: 12,
};

const btnPrimary = {
  background: "#0a66c2",
  color: "#fff",
  border: "none",
  padding: "8px 18px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: 600,
};

const btnOutline = {
  border: "1px solid #0a66c2",
  color: "#0a66c2",
  background: "white",
  padding: "8px 18px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: 600,
};

const postWrapper = {
  marginBottom: 15,
};
