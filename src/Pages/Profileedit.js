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
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", margin: 0 }}>
            Edit Profile
          </h2>
          <button 
            className="btn btn-light" 
            onClick={() => navigate("/bio")}
            style={{ fontWeight: "600", color: "#6b7280" }}
          >
            Cancel
          </button>
        </div>

        {/* Profile Photo Section */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  color: "#9ca3af",
                }}
              >
                👤
              </div>
            )}
            <label
              htmlFor="photoUpload"
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                backgroundColor: "#0a66c2",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "3px solid #fff",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004182")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0a66c2")}
            >
              📷
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          <p className="mt-2 text-muted" style={{ fontSize: "15px" }}>Click the camera icon to update photo</p>
        </div>

        {/* Form Grid */}
        <div className="row g-4">
          <div className="col-md-6">
            <label style={{ fontWeight: "600", fontSize: "17px", color: "#374151", marginBottom: "8px", display: "block" }}>
              First Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ fontSize: "17px", borderRadius: "8px", padding: "12px" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label style={{ fontWeight: "600", fontSize: "17px", color: "#374151", marginBottom: "8px", display: "block" }}>
              Last Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ fontSize: "17px", borderRadius: "8px", padding: "12px" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label style={{ fontWeight: "600", fontSize: "17px", color: "#374151", marginBottom: "8px", display: "block" }}>
              Professional Headline
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ fontSize: "17px", borderRadius: "8px", padding: "12px" }}
              placeholder="e.g. Senior Software Engineer at Google"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label style={{ fontWeight: "600", fontSize: "17px", color: "#374151", marginBottom: "8px", display: "block" }}>
              Education / Location
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ fontSize: "17px", borderRadius: "8px", padding: "12px" }}
              placeholder="e.g. Stanford University | New York"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>

          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label style={{ fontWeight: "600", fontSize: "17px", color: "#374151", margin: 0 }}>
                Bio
              </label>
              <span 
                style={{ 
                  fontSize: "14px", 
                  color: bio.length >= MAX_BIO ? "#dc3545" : "#6b7280",
                  fontWeight: "500"
                }}
              >
                {bio.length} / {MAX_BIO}
              </span>
            </div>
            <textarea
              className="form-control form-control-lg"
              style={{ fontSize: "17px", borderRadius: "10px", padding: "15px", minHeight: "140px", resize: "none" }}
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell the community about your professional journey..."
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <button
            className="btn btn-primary btn-lg w-100 shadow-sm"
            onClick={handleSave}
            style={{
              padding: "15px",
              fontSize: "19px",
              fontWeight: "700",
              borderRadius: "12px",
              backgroundColor: "#0a66c2",
              border: "none",
              transition: "transform 0.2s, background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profileedit;