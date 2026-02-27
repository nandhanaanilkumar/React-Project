import { useEffect, useState } from "react";
import axios from "axios";

const StatsCards = () => {

  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    reports: 0,
  });

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "200px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/stats"
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <div style={cardStyle}>
        👥 Users<br /><b>{stats.users}</b>
      </div>

      <div style={cardStyle}>
        📝 Posts<br /><b>{stats.posts}</b>
      </div>

      <div style={cardStyle}>
        💬 Comments<br /><b>{stats.comments}</b>
      </div>

      <div style={cardStyle}>
        🚨 Reports<br /><b>{stats.reports}</b>
      </div>
    </div>
  );
};

export default StatsCards;