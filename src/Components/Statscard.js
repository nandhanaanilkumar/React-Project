const StatsCards = () => {
  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "200px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <div style={cardStyle}>👥 Users<br /><b>1,240</b></div>
      <div style={cardStyle}>📝 Posts<br /><b>540</b></div>
      <div style={cardStyle}>💬 Comments<br /><b>3,210</b></div>
      <div style={cardStyle}>🚨 Reports<br /><b>12</b></div>
    </div>
  );
};

export default StatsCards;
