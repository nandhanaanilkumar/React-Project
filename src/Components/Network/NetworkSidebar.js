const NetworkSidebar = () => {
  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    color: "#555",
    cursor: "pointer",
    fontSize: "20px",
    
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "16px",
        border: "1px solid #004182",
        fontSize: "16px",
        height:"410px",
        width:"300px",
        

      }}
    >
      <h5 style={{ marginBottom: "16px" }}>Manage my network</h5>

      <div style={itemStyle}>
        <span>👥 Connections</span>
        <span>182</span>
      </div>
      
      <div style={itemStyle}>👤 Following & followers</div>
      <div style={itemStyle}>👥 Groups</div>
      <div style={itemStyle}>📅 Events</div>
      <div style={itemStyle}>
        <span>📄 Pages</span>
        <span>18</span>
      </div>
      <div style={itemStyle}>
        <span>📰 Newsletters</span>
        <span>4</span>
      </div>
    </div>
  );
};

export default NetworkSidebar;
