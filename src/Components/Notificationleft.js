import React from "react";
import { useNavigate } from "react-router-dom";
const styles = {
  sidebar: {
      width: "500px",  
              // ⬅️ wider
  minHeight: "350px",      // ⬅️ taller
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
  manage: {
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
    extraBox: {
           width: "500px",
    border: "1px solid #2e1878ff",
     borderRadius: "10px",
     marginLeft:"130px",
        marginTop:"20px",
        padding: "15px",
          
  },
};

const Leftsidebar = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.wrapper}>
    <aside style={styles.sidebar}>
      {/* Cover */}
      <div style={styles.cover}></div>

      {/* Profile */}
      <div style={styles.profileSection}
      onClick={()=>navigate("/Bio")}>
        <img
          src="C:\Users\User\OneDrive\Documents\react_project\blogging\src\assets\Gemini_Generated_Image_n3kxnhn3kxnhn3kx.png"
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

      
    </aside>
   
    <aside style={styles.card}>
        <div style={styles.extraBox}>
            <h5 style={{marginBottom:"10px"}}>Manage Notifiations</h5>
            <div >
                <a href="/">Go to Settings</a>
            </div>
        </div>

    </aside>
     </div>

  );
};

export default Leftsidebar;
