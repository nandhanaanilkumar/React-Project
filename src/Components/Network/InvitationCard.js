import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const InvitationCard = () => {

  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    fetch(`http://localhost:5000/invitations/${loggedUser.id}`)
      .then(res => res.json())
      .then(data => setInvitations(data));
  }, []);

  // ACCEPT
  const handleAccept = async (id) => {
    await fetch(`http://localhost:5000/accept/${id}`, {
      method: "PUT"
    });

    setInvitations(prev =>
      prev.filter(inv => inv._id !== id)
    );
  };

  // IGNORE
  const handleIgnore = async (id) => {
    await fetch(`http://localhost:5000/ignore/${id}`, {
      method: "DELETE"
    });

    setInvitations(prev =>
      prev.filter(inv => inv._id !== id)
    );
  };

  return (
    <div style={styles.container}>

      <h4 style={styles.title}>Invitations</h4>

      {invitations.length === 0 ? (
        <p style={styles.empty}>No invitations right now</p>
      ) : (
        invitations.map((inv) => (
          <div key={inv._id} style={styles.card}>

            {/* Avatar */}
            {inv.sender.profileImage ? (
  <img
    src={inv.sender.profileImage}
    alt="profile"
    style={styles.avatarImage}
  />
) : (
  <div style={styles.avatar}>
    {inv.sender.firstName?.charAt(0)}
  </div>
)}

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <strong style={styles.name}>
                {inv.sender.firstName} {inv.sender.lastName}
              </strong>
              <p style={styles.headline}>
                {inv.sender.headline}
              </p>

              {/* Buttons */}
              <div style={styles.buttonRow}>
                <button
                  style={styles.ignoreBtn}
                  onClick={() => handleIgnore(inv._id)}
                >
                  Ignore
                </button>

                <button
                  style={styles.acceptBtn}
                  onClick={() => handleAccept(inv._id)}
                >
                  Accept
                </button>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #ddd",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  title: {
    marginBottom: "15px",
    color: "#0a66c2",
    fontWeight: "600"
  },

  empty: {
    color: "#777",
    fontSize: "14px"
  },

  card: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    border: "1px solid #eee",
    borderRadius: "10px",
    marginBottom: "12px",
    alignItems: "flex-start",
    transition: "0.2s",
    background: "#fafafa"
  },

  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#0a66c2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px"
  },

  name: {
    fontSize: "15px",
    color: "#222"
  },

  headline: {
    fontSize: "13px",
    color: "#666",
    margin: "4px 0 10px"
  },

  buttonRow: {
    display: "flex",
    gap: "8px"
  },

  ignoreBtn: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #999",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  },

  acceptBtn: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#0a66c2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  },
 avatarImage: {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #fff",
  boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
},
};

export default InvitationCard;