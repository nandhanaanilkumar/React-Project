import React, { useState } from "react";
import Nav from '../Components/Navbar';
const Profileedit= () => {
   
  const MAX_BIO = 200;

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
    const [education, setEducation] = useState("");

  const handleBioChange = (e) => {
    if (e.target.value.length <= MAX_BIO) {
      setBio(e.target.value);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };
  return (
    <div
    style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Nav/>
      <div

      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    > 
   
      <h4 style={{ marginBottom: "20px" }}>Edit Profile</h4>

      {/* Profile Photo */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
        ) : (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#e5e7eb",
              margin: "0 auto 10px",
            }}
          />
        )}

        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      {/* Name */}
      <div style={{ marginBottom: "15px" }}>
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Headline */}
      <div style={{ marginBottom: "15px" }}>
        <label>Professional Headline</label>
        <input
          type="text"
          className="form-control"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>
{/* Education */}
<div style={{ marginBottom: "15px" }}>
        <label>Education</label>
        <input
          type="text"
          className="form-control"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
      </div>

      {/* Bio */}
      <div style={{ marginBottom: "15px" }}>
        <label>Bio</label>
        <textarea
          className="form-control"
          rows="4"
          value={bio}
          onChange={handleBioChange}
          placeholder="Tell something about yourself..."
        />
        <small
          style={{
            display: "block",
            textAlign: "right",
            color: bio.length === MAX_BIO ? "red" : "#555",
          }}
        >
          {bio.length} / {MAX_BIO} characters
        </small>
      </div>

      {/* Save Button */}
      <button className="btn btn-primary w-100">
        Save Changes
      </button>
    </div>
    </div>
  );
};

export default Profileedit;
