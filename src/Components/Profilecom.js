import React from "react";
import {useNavigate} from "react-router-dom";
const styles = {
cover: {
    height: "100px",
    background: "linear-gradient(90deg, #0a66c2, #004182)",
  },
    profileSection: {
    textAlign: "center",
    padding: "0 15px 15px",
    marginTop: "-55px",
   
  },
   profileImg: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "4px solid white",
    background: "#fff",
    objectFit: "cover"
  },
   name: {
    margin: "30px 0 2px",
    fontSize: "20px",
    fontWeight: "600",
  },
  
};
const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-10 col-lg-10 mt-7 mb-7">

      <div style={styles.cover}></div>
        {/* Profile Card */}
      <div style={styles.profileSection}>
    <img
      src="C:\\Users\\User\\OneDrive\\Documents\\react_project\\blogging\\src\\assets\\Gemini_Generated_Image_n3kxnhn3kxnhn3kx.png"
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
                <h6>About</h6>
                <p className="text-muted small">
                  Passionate developer building modern web applications.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="card mt-3">
              <div className="card-body">
                <h6>Skills</h6>
                <span className="badge bg-primary me-2">React</span>
                <span className="badge bg-success me-2">Node.js</span>
                <span className="badge bg-warning text-dark me-2">Bootstrap</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default Profile;
