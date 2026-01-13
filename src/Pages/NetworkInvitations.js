import NetworkSidebar from "../Components/Network/NetworkSidebar";

const NetworkInvitations = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "24px",
        padding: "24px 60px",
        background: "#f3f2ef",
        minHeight: "100vh",
      }}
    >
      {/* LEFT SIDEBAR */}
      <NetworkSidebar />

      {/* RIGHT CONTENT */}
      <div>
        <h4 style={{ marginBottom: "20px" }}>Invitations</h4>

        {/* RECEIVED */}
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <h5>Received</h5>

          <p>👤 Julia Elizabeth Joy</p>
          <p>👤 Vineeth Vijayan</p>
          <p>👤 Udhaya Sangar</p>
        </div>

        {/* SENT */}
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "16px",
          }}
        >
          <h5>Sent</h5>

          <p>👤 Rahul Menon</p>
          <p>👤 Anu Thomas</p>
            <p>👤 Suresh Babu</p>
            
        </div>
      </div>
    </div>
  );
};

export default NetworkInvitations;
