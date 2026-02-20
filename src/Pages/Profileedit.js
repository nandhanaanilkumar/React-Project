import { useNavigate } from "react-router-dom";
import React, { useState ,useEffect} from "react";
const Profileedit= () => {
   const navigate = useNavigate();
  const MAX_BIO = 200;

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
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
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setPhoto(reader.result); 
  };

  reader.readAsDataURL(file);
};

const handleSave = async () => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedUser || !loggedUser.id) {
    alert("User not found");
    return;
  }

  const response = await fetch(
    `http://localhost:5000/updateProfile/${loggedUser.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        headline,
        education,
        bio,
        profileImage: photo
      })
    }
  );

  const updatedUser = await response.json();

  // 🔥 Keep id stable
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role
    })
  );

  navigate("/bio");
};



useEffect(() => {

  const fetchProfile = async () => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser || !loggedUser.id) {
      console.log("User ID missing");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/profile/${loggedUser.id}`
    );

    const data = await res.json();

    setFirstName(data.firstName || "");
    setLastName(data.lastName || "");
    setHeadline(data.headline || "");
    setEducation(data.education || "");
    setBio(data.bio || "");
    setPhoto(data.profileImage || null);
  };

  fetchProfile();

}, []);





  return (
    <div
    style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
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
  <label>First Name</label>
  <input
    type="text"
    className="form-control"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />
</div>

<div style={{ marginBottom: "15px" }}>
  <label>Last Name</label>
  <input
    type="text"
    className="form-control"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
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
      <button className="btn btn-primary w-100" onClick={handleSave}>
        Save Changes
      </button>
    </div>
    </div>
  );
};

export default Profileedit;
