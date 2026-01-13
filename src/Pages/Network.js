import NetworkSidebar from "../Components/Network/NetworkSidebar";
import NetworkTab from "../Components/Network/NetworkTab";
import InvitationCard from "../Components/Network/InvitationCard";
import NetworkGrid from "../Components/Network/NetworkGrid";
const Network = () => {
  return (
    <div>
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
     <div style={{ marginLeft:"80px"}}>
      {/* LEFT SIDEBAR */}
      <NetworkSidebar />
</div>
      {/* CENTER CONTENT */}
      <div style={{ maxWidth: "100%", marginLeft:"100px"}}>
        <NetworkTab />
        <InvitationCard />
        <NetworkGrid />
      </div>
    </div>
    </div>
  );
};

export default Network;
