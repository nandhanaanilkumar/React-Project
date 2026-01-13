import { useState } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import PostsToolbar from "../Components/Admin/Posts/PostsToolBar";
import PostsTable from "../Components/Admin/Posts/PostsTable";
import ReportedPostsTab from "../Components/Admin/Posts/ReportedPostsTab";

const AdminPostsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div style={{ display: "flex", background: "#f1f5f9", minHeight: "100vh" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: 20 }}>
        <h2>Posts Management</h2>

        {/* Tabs */}
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setActiveTab("all")}>All Posts</button>
          <button onClick={() => setActiveTab("reported")}>Reported</button>
        </div>

        <PostsToolbar />

        {activeTab === "all" ? <PostsTable /> : <ReportedPostsTab />}
      </div>
    </div>
  );
};

export default AdminPostsPage;
