import { useNavigate } from "react-router-dom";
import { useState } from "react";
const InvitationItem = ({ 
   id,
  name,
  title,
  mutual,
  status,
  onAccept,
  onIgnore, }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #eee",
        
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#e5e7eb",
            border: "1px solid #004182",
          }}
        ></div>

        <div>
          <strong>{name}</strong>
          <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>
            {title}
          </p>
          <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
            {mutual}
          </p>
        </div>
      </div>

      
      <div>
        {status === "accepted" ? (
          <span className="badge bg-success">Accepted</span>
        ) : (
          <>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => onIgnore(id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onAccept(id)}
            >
              Accept
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const InvitationCard = () => {
    const navigate = useNavigate();
      const [invitations, setInvitations] = useState([
    {
      id: 1,
      name: "Julia Elizabeth Joy",
      title: "Finance & Taxation Undergrad | CMA (US)",
      mutual: "N K Nikhil and 19 other mutual connections",
      status: "pending",
    },
    {
      id: 2,
      name: "Vineeth Vijayan",
      title: "Talent Curation Executive",
      mutual: "Dilna Biju is a mutual connection",
      status: "pending",
    },
    {
      id: 3,
      name: "Udhaya Sangar",
      title: "System Engineer at Infosys",
      mutual: "Priya Sojan and 1 other mutual connection",
      status: "pending",
    },
  ]);

  const handleAccept = (id) => {
    setInvitations((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "accepted" } : inv
      )
    );
  };

  const handleIgnore = (id) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #004182",
        padding: "16px",

      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h5>Invitations (31)</h5>
        <span style={{ color: "#0a66c2", cursor: "pointer" }} onClick={() => navigate("/network/invitations")}>
          Show all
        </span>
      </div>

       {invitations.map((inv) => (
        <InvitationItem
          key={inv.id}
          {...inv}
          onAccept={handleAccept}
          onIgnore={handleIgnore}
        />
      ))}
    </div>
  );
};

export default InvitationCard;
