import {useNavigate} from "react-router-dom";
import profile from "../assets/Profile.jpg";
import React, { useEffect, useState } from "react";

const styles = {
  cover: {
    height: "120px",
    background: "linear-gradient(90deg, #0a66c2, #004182)",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  profileSection: {
    textAlign: "center",
    padding: "0 20px 20px",
    marginTop: "-60px",
  },

  profileImg: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #ffffff",
    backgroundColor: "#ffffff",
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  name: {
    marginTop: "30px",
    marginBottom: "4px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
  },
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
    <div className="bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-10 col-lg-10 mt-7 mb-7">

      <div style={styles.cover}></div>
        {/* Profile Card */}
      <div style={styles.profileSection}>
    <img
     src={user?.profileImage || profile} 
     alt="Profile"
      style={styles.profileImg}
    />
<div>
            <h4 style={styles.name}>
  {user?.firstName || "User"}
</h4>
<p className="text-muted mb-1">
  {user?.headline || "Add your professional headline"}
</p>
<p className="text-secondary small">
  📍 {user?.education || "Add your education"}
</p>
            {/* Stats */}
            <div className="row text-center mt-3">
              <div className="col">
         <h6
  style={{ cursor: "pointer", color: "#0a66c2" }}
  onClick={() => navigate("/followers")}
>
  {followersCount}
</h6>
<small>Followers</small>


              </div>
              <div className="col">
                
<h6
  style={{ cursor: "pointer", color: "#0a66c2" }}
  onClick={() => navigate("/following")}
>
  {followingCount}
</h6>
<small>Following</small>
              </div>
              <div className="col">
<h6>{postCount}</h6>
                <small className="text-muted">Posts</small>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button className="btn btn-primary btn-sm" onClick={()=> navigate("/profileedit")}>Edit Profile</button>
     </div>
          </div>
        </div>

            {/* About */}
            <div className="card mt-4">
              <div className="card-body">
                <h5>About</h5>
                <p className="text-muted small" style={{ fontSize: "18px" }}>
  {user?.bio || "Add something about yourself"}
</p>

              </div>
            </div>

          {/* Skills */}
<div className="card mt-4" style={{ padding: "10px" }}>
  <div className="card-body" style={{ padding: "20px" }}>
    
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 style={{ fontWeight: "600", fontSize: "20px" }}>
        Skills
      </h5>

      <button
        className="btn btn-sm btn-outline-primary"
        style={{ fontSize: "14px", padding: "6px 14px" }}
        onClick={addSkill}
      >
        + Add
      </button>
    </div>

    <div className="mt-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="badge bg-primary me-3 mb-3"
          style={{
            fontSize: "15px",
            padding: "8px 14px",
            borderRadius: "20px",
          }}
        >
          {skill}
        </span>
      ))}
    </div>

  </div>
</div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default Profile;
