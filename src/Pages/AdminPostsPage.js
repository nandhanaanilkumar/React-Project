import { useState } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import PostsTable from "../Components/Admin/Posts/PostsTable";
import ReportedPostsTab from "../Components/Admin/Posts/ReportedPostsTab";
import AdminTopbar from "../Components/Admin/Admintopbar";

const AdminPostsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div style={styles.layout}>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SECTION */}
      <div style={styles.main}>

        {/* TOPBAR */}
        <AdminTopbar title="Posts Management" />

        {/* PAGE CONTENT */}
        <div style={styles.content}>
          <h2>Posts Management</h2>

          {/* Tabs */}
          <div style={styles.tabs}>
            <button
              style={activeTab === "all" ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab("all")}
            >
              All Posts
            </button>

            <button
              style={activeTab === "reported" ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab("reported")}
            >
              Reported
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "all" ? <PostsTable /> : <ReportedPostsTab />}
        </div>

      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },

  tabs: {
    marginBottom: "16px",
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },

  activeBtn: {
    padding: "8px 14px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AdminPostsPage;