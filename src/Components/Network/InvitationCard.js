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
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #004182",
      padding: "16px"
    }}>

      <h5>Invitations</h5>

      {invitations.map((inv) => (

        <div key={inv._id}>

          <strong>
            {inv.sender.firstName} {inv.sender.lastName}
          </strong>

          <p>{inv.sender.headline}</p>

          <button
            onClick={() => handleIgnore(inv._id)}
          >
            Ignore
          </button>

          <button
            onClick={() => handleAccept(inv._id)}
          >
            Accept
          </button>

        </div>
      ))}

    </div>
  );
};

export default InvitationCard;
