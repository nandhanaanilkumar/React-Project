import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: "900px", margin: "auto", padding: 20 }}>

      {/* PROFILE CARD */}
      <div style={{
        background:"#fff",
        padding:20,
        borderRadius:10,
        boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
      }}>

        <img
          src={user.profileImage || "https://via.placeholder.com/120"}
          alt=""
          style={{
            width:120,
            height:120,
            borderRadius:"50%",
            objectFit:"cover"
          }}
        />

        <h2>{user.firstName} {user.lastName}</h2>

        <p>{user.headline}</p>
        <p>{user.bio}</p>

        <p>
          <b>{user.followers || 0}</b> Followers •
          <b> {user.following || 0}</b> Following
        </p>

        {/* RELATION BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>

          {relation === "none" && (
            <button style={btnPrimary} onClick={connectUser}>
              Connect
            </button>
          )}

          {relation === "pending_sent" && (
            <button style={btnOutline}>
              Pending
            </button>
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

              <button style={btnOutline}>
                Connected
              </button>
            </>
          )}

        </div>

      </div>

      {/* SKILLS */}
      {user.skills?.length > 0 && (
        <div style={card}>
          <h4>Skills</h4>
          {user.skills.map((s,i) => (
            <span key={i} style={skill}>{s}</span>
          ))}
        </div>
      )}

      {/* EXPERIENCE */}
      {user.experience?.length > 0 && (
        <div style={card}>
          <h4>Experience</h4>
          {user.experience.map((e,i) => (
            <p key={i}>• {e}</p>
          ))}
        </div>
      )}

      {/* POSTS */}
      <div style={card}>
        <h4>Posts</h4>

        {user.posts?.map(post => (
          <div key={post._id}
            style={{
              border:"1px solid #eee",
              padding:12,
              borderRadius:8,
              marginBottom:10
            }}
          >
            {post.text}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ViewProfile;


/* ================= STYLES ================= */

const card = {
  background:"#fff",
  marginTop:20,
  padding:20,
  borderRadius:10,
};

const skill = {
  background:"#0a66c2",
  color:"#fff",
  padding:"6px 12px",
  borderRadius:20,
  marginRight:10,
};

const btnPrimary = {
  background:"#0a66c2",
  color:"#fff",
  border:"none",
  padding:"8px 16px",
  borderRadius:"6px",
  marginRight:"10px"
};

const btnOutline = {
  border:"1px solid #0a66c2",
  color:"#0a66c2",
  background:"white",
  padding:"8px 16px",
  borderRadius:"6px"
};