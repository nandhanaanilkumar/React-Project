import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/Profile.jpg";
const styles = {
  sidebar: {
      width: "500px",  
              
  minHeight: "520px",      
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #2e1878ff",
    position: "sticky",
    top: "80px",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
    marginLeft: "130px"
  },
  cover: {
    height: "100px",
    background: "linear-gradient(90deg, #0a66c2, #004182)",
  },
  profileSection: {
    textAlign: "center",
    padding: "0 15px 15px",
    marginTop: "-55px",
    cursor: "pointer"
  },
  profileImg: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "4px solid white",
    background: "#fff",
    objectFit: "cover"
  },
  name: {
    margin: "30px 0 2px",
    fontSize: "20px",
    fontWeight: "600",
  },
  headline: {
    fontSize: "18px",
    color: "#555",
    margin: "30px 0 2px"
  },
  location: {
    fontSize: "15px",
    color: "#777",
  },
  hr: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "0",
  },
  stats: {
    padding: "10px 15px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    marginBottom: "8px",
    cursor: "pointer",
  },
  count: {
    color: "#0a66c2",
    fontWeight: "600",
  },
  premium: {
    padding: "10px 15px",
    fontSize: "15px",
    cursor: "pointer",
  },
  items: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

const Leftsidebar = () => {
  const navigate = useNavigate();
  return (
    <aside style={styles.sidebar}>
      {/* Cover */}
      <div style={styles.cover}></div>

      {/* Profile */}
      <div style={styles.profileSection}
      onClick={()=>navigate("/Bio")}>
        <img
          src={profile}
          alt="Profile"
          style={styles.profileImg}
        />

        <h4 style={styles.name}>John Doe</h4>
       
        <p style={styles.headline}>CEO & Founder | linkedin| Grow and Learn</p>

        <p style={styles.location}>Harvard University</p>
      </div>

      <hr style={styles.hr} />

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statRow}>
          <span>Profile viewers</span>
          <span style={styles.count}>120</span>
        </div>
        <div style={styles.statRow}>
          <span>Post impressions</span>
          <span style={styles.count}>1,240</span>
        </div>
      </div>

      <hr style={styles.hr} />

      {/* Premium */}
      <div style={styles.premium}>
        <span>Access exclusive tools & insights</span>
        <br />
        <strong style={{ color: "#915907" }}>
          Try Premium for free
        </strong>
      </div>

      <hr style={styles.hr} />

      {/* My Items */}
      <div style={styles.items}>
        🔖 <span>My items</span>
      </div>
    </aside>
  );
};

export default Leftsidebar;
