import { useState } from "react";
import PostsToolbar from "../Components/Admin/Posts/PostsToolBar";
import PostsTable from "../Components/Admin/Posts/PostsTable";
import ReportedPostsTab from "../Components/Admin/Posts/ReportedPostsTab";

const AdminPostsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts Management</h2>

      {/* Tabs */}
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setActiveTab("all")}>All Posts</button>
        <button onClick={() => setActiveTab("reported")}>Reported</button>
      </div>

      <PostsToolbar />

      {activeTab === "all" ? <PostsTable /> : <ReportedPostsTab />}
    </div>
  );
};

export default AdminPostsPage;
