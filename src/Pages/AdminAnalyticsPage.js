import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/analytics");
      console.log("DATA:", res.data);
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading || !analytics) 
    return <div style={{ padding: 20 }}>Loading analytics...</div>;

 return (
  <div style={styles.layout}>
    
    {/* SIDEBAR */}
    <AdminSidebar />

    {/* RIGHT SIDE */}
    <div style={styles.main}>

      {/* TOPBAR */}
      <AdminTopbar title="Analytics Dashboard" />

      {/* PAGE CONTENT */}
      <div style={styles.content}>
        <div style={styles.page}>
          <h2 style={styles.title}>📊 Admin Analytics Dashboard</h2>

          {/* KPI CARDS */}
          <div style={styles.cardContainer}>
            <AnalyticsCard title="Total Users" value={analytics.totalUsers} />
            <AnalyticsCard title="Total Posts" value={analytics.totalPosts} />
            <AnalyticsCard title="Total Comments" value={analytics.totalComments} />
            <AnalyticsCard title="Active Users" value={analytics.activeUsers} />
          </div>

          {/* CHARTS */}
          <div style={styles.graphSection}>
            
            <div style={styles.graphCard}>
    <h3>User Growth</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={analytics.userGrowth || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#007bff" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* POSTS PER MONTH */}
  <div style={styles.graphCard}>
    <h3>Posts Per Month</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={analytics.postsPerMonth || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="posts" fill="#28a745" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* TOP USERS */}
  <div style={styles.graphCard}>
    <h3>Top Active Users</h3>

    <div style={{ overflowY: "auto", maxHeight: "280px" }}>
      {analytics.topUsers?.map((u, i) => (
        <div key={i} style={styles.userRow}>
          <span>{u.name}</span>
          <span>{u.posts} posts</span>
        </div>
      ))}
    </div>
  </div>

  {/* WEEKLY ENGAGEMENT */}
  <div style={styles.graphCard}>
    <h3>Weekly Engagement</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={analytics.weeklyEngagement || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="engagement" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
};

const AnalyticsCard = ({ title, value }) => (
  <div style={styles.card}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

const styles = {
  page: {
  flex: 1,
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh",
},
  title: {
    marginBottom: "20px",
    color: "#222",
  },
  userRow: {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #eee"
},
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
 graphSection: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr", 
  gap: "20px",
},
  graphCard: {
  background: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  minHeight: "360px", // ⭐ IMPORTANT
  display: "flex",
  flexDirection: "column",
},
    layout: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f1f5f9",
  },
  main: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
},

content: {
  flex: 1,
  overflowY: "auto",
},

};

export default AdminAnalyticsPage;