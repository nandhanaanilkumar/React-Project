import { useState } from "react";
const PeopleCard = ({ name, role }) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };
  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      border: "1px solid #004182",
      padding: "16px",
      textAlign: "center"
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "#e5e7eb",
        margin: "0 auto 10px",
        border: "1px solid #004182",
        
      }} />

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
