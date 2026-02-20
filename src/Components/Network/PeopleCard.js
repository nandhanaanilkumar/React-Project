import { useState } from "react";
import { useEffect } from "react";

const PeopleCard = ({ id,name, role ,profileImage}) => {
  const [invitations, setInvitations] = useState([]);

  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch("http://localhost:5000/connect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      senderId: loggedUser.id,
      receiverId: id
    })
  });

  setConnected(true);
};
useEffect(() => {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  fetch(`http://localhost:5000/invitations/${loggedUser.id}`)
    .then(res => res.json())
    .then(data => setInvitations(data));

}, []);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      border: "1px solid #004182",
      padding: "16px",
      textAlign: "center"
    }}>
     <img
  src={
    profileImage
      ? profileImage
      : "https://via.placeholder.com/80"
  }
  alt="profile"
  style={{
     width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "#e5e7eb",
        margin: "0 auto 10px",
        border: "1px solid #004182",
        
  }}
/>


      <h6>{name}</h6>
      <p style={{ fontSize: "14px", color: "#033504" }}>{role}</p>

   
      {connected ? (
        <button className="btn btn-success btn-sm" >
          Connected
        </button>
      ) : (
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handleConnect}
        >
          + Connect
        </button>
      )}
    </div>
  );
};

export default PeopleCard;
