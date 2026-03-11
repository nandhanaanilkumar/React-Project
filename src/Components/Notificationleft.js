import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import profile from "../assets/Profile.jpg";

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
  width:"100%"
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
const [user, setUser] = useState(null); 
const [stats, setStats] = useState({
  profileViews: 0,
  postImpressions: 0
});   
   useEffect(() => {

  const fetchData = async () => {

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedUser) return;

    const userId = loggedUser._id || loggedUser.id;

    // fetch profile
    const profileRes = await fetch(
      `http://localhost:5000/profile/${userId}`
    );
    const profileData = await profileRes.json();
    setUser(profileData);

    // fetch analytics
    const statsRes = await fetch(
      `http://localhost:5000/user-analytics/${userId}`
    );

    const statsData = await statsRes.json();

    setStats({
      profileViews: statsData.profileViews,
      postImpressions: statsData.profileReach
    });
  };

  fetchData();

}, []);
  return (
    <div style={styles.wrapper}>
    <aside style={styles.sidebar}>
      {/* Cover */}
    <div
  style={{
    ...styles.cover,
    backgroundImage: user?.backgroundImage
      ? user.backgroundImage.startsWith("data:image")
        ? `url(${user.backgroundImage})` // base64 image
        : `url(http://localhost:5000/${user.backgroundImage})` // server image
      : "linear-gradient(135deg,#0a66c2,#004182)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
></div>

      <div
  style={styles.profileSection}
  onClick={() => navigate("/Bio")}
>
  <img
    src={user?.profileImage || profile}
    alt="Profile"
    style={styles.profileImg}
  />


         <h4 style={styles.name}>
    {user?.firstName} {user?.lastName}
  </h4>
       

  <p style={styles.headline}>
    {user?.headline || "Add headline"}
  </p>
          <p style={styles.location}>
    {user?.education || "Add education"}
  </p>
</div>
      <hr style={styles.hr} />

      {/* Stats */}
     <div style={styles.stats}>
  <div style={styles.statRow}>
    <span>Profile viewers</span>
    <span style={styles.count}>
      {stats.profileViews}
    </span>
  </div>

  <div style={styles.statRow}>
    <span>Post impressions</span>
    <span style={styles.count}>
      {stats.postImpressions}
    </span>
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
