import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";
import StatsCards from "../Components/Statscard";
import RecentActivity from "../Components/Recentactivity";
import UsersTable from "../Components/Usertable";
import PostsTable from "../Components/Posttable";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", background: "#f1f5f9" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <AdminTopbar />

        <div style={{ padding: "20px" }}>
          <StatsCards />
          <RecentActivity />
          <UsersTable />
          <PostsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
