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
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    // Fetch skills from localStorage or API
    const storedSkills = JSON.parse(localStorage.getItem("profileSkills")) ;
    if (storedSkills) setSkills(storedSkills);
    else {
      setSkills(["React", "Node.js", "Bootstrap"]);
    }
  }, []);

  const addSkill = () => {
  const newSkill = prompt("Enter a skill");
  if (!newSkill) return;

  const updatedSkills = [...skills, newSkill];
  setSkills(updatedSkills);
  localStorage.setItem(
    "profileSkills",
    JSON.stringify(updatedSkills)
  );
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
      src={profile}
      alt="Profile"
      style={styles.profileImg}
    />
<div>
            <h4 style={styles.name}>John Doe</h4>
            <p className="text-muted mb-1">Full Stack Developer</p>
            <p className="text-secondary small">📍 Harvard University</p>

            {/* Stats */}
            <div className="row text-center mt-3">
              <div className="col">
                <h6>120</h6>
                <small className="text-muted">Followers</small>
              </div>
              <div className="col">
                <h6>85</h6>
                <small className="text-muted">Following</small>
              </div>
              <div className="col">
                <h6>42</h6>
                <small className="text-muted">Posts</small>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button className="btn btn-primary btn-sm" onClick={()=> navigate("/profileedit")}>Edit Profile</button>
              <button className="btn btn-outline-secondary btn-sm">Share</button>
            </div>
          </div>
        </div>

            {/* About */}
            <div className="card mt-4">
              <div className="card-body">
                <h5>About</h5>
                <p className="text-muted small" style={{ fontSize: "20px" }}>
                  Passionate developer building modern web applications.
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
