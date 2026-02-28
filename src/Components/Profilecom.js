import {useNavigate} from "react-router-dom";
import profile from "../assets/Profile.jpg";
import React, { useEffect, useState } from "react";

const styles = {
  container: {
    maxWidth: "1080px",
    margin: "0 auto",
  },
  cover: {
    height: "180px",
    background: "linear-gradient(90deg, #0a66c2 0%, #004182 100%)",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  profileSection: {
    position: "relative",
    padding: "0 24px 24px",
    marginTop: "-90px",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
  },
  profileImg: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    border: "4px solid #ffffff",
    backgroundColor: "#ffffff",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  name: {
    marginTop: "16px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#000",
  },
  headline: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.5",
  },
  statLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0a66c2",
    textDecoration: "none",
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
const [skills, setSkills] = useState([]);
const [followersCount, setFollowersCount] = useState(0);
const [followingCount, setFollowingCount] = useState(0);
const [postCount, setPostCount] = useState(0);

useEffect(() => {

  const fetchProfile = async () => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) return;

    const res = await fetch(
      `http://localhost:5000/profile/${loggedUser.id}`
    );

    const data = await res.json();

    setUser(data);
    setSkills(data.skills || []);

  };

  fetchProfile();
  fetchFollowers();
  fetchPostCount();
}, []);



const addSkill = async () => {

  const newSkill = prompt("Enter a skill");
  if (!newSkill) return;

  const updatedSkills = [...skills, newSkill];

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const response = await fetch(
    `http://localhost:5000/updateProfile/${loggedUser.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: updatedSkills
      })
    }
  );

  const updatedUser = await response.json();

  setSkills(updatedUser.skills);
};

const fetchFollowers = async () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const res1 = await fetch(
    `http://localhost:5000/followers/${loggedUser.id}`
  );

  const followers = await res1.json();

  setFollowersCount(followers.length);

  const res2 = await fetch(
    `http://localhost:5000/following/${loggedUser.id}`
  );

  const following = await res2.json();

  setFollowingCount(following.length);
};
const fetchPostCount = async () => {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  if (!loggedUser) return;

  const res = await fetch(
    `http://localhost:5000/userPosts/${loggedUser.id}`
  );

  const posts = await res.json();

  setPostCount(posts.length);
};
  return (
    <div className="bg-light pb-4">
      <div style={styles.container}>
        <div style={styles.cover}></div>
        <div style={styles.profileSection}>
          <div className="d-flex justify-content-between align-items-end">
            <img
              src={user?.profileImage || profile}
              alt="Profile"
              style={styles.profileImg}
              className="hover-zoom"
            />
            <button className="btn btn-outline-primary rounded-pill fw-bold px-4" onClick={() => navigate("/profileedit")}>
              Edit Profile
            </button>
          </div>

          <div className="mt-3">
            <h1 style={styles.name}>{user?.firstName || "User"}</h1>
            <p style={styles.headline}>{user?.headline || "Add your professional headline"}</p>
            <p className="text-muted small">
              <span className="me-2">📍 {user?.education || "Add education"}</span>
            </p>

            <div className="d-flex gap-4 mt-2">
              <div style={{ cursor: "pointer" }} onClick={() => navigate("/followers")}>
                <span style={styles.statLabel}>{followersCount}</span> <small className="text-muted">followers</small>
              </div>
              <div style={{ cursor: "pointer" }} onClick={() => navigate("/following")}>
                <span style={styles.statLabel}>{followingCount}</span> <small className="text-muted">following</small>
              </div>
              <div>
                <span className="fw-bold">{postCount}</span> <small className="text-muted">posts</small>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-3 shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <h5 className="fw-bold">About</h5>
            <p className="text-secondary" style={{ fontSize: "15px", lineHeight: "1.6" }}>
              {user?.bio || "No description provided."}
            </p>
          </div>
        </div>

        <div className="card mt-3 shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Skills</h5>
              <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={addSkill}>
                + Add skill
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="badge border text-dark fw-normal px-3 py-2" style={{ borderRadius: "16px", backgroundColor: "#f3f6f8", fontSize: "16px" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;