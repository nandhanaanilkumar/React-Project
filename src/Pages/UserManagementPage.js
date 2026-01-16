import { useState } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";

const UserManagementPage = () => {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", role: "Author", status: "Active" },
    { id: 2, name: "Admin User", email: "admin@gmail.com", role: "Admin", status: "Active" }
  ]);

  return (
    <>
      {/* REQUIRED STYLES */}
      <style>{`
        .admin-layout {
          display: flex;
          height: 100vh;
          background-color: #f1f5f9;
        }
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .admin-content {
          padding: 20px;
          overflow-y: auto;
          background: #f8fafc;
        }
        table {
          width: 100%;
          background: #fff;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 10px;
        }
        th {
          background: #e2e8f0;
        }
      `}</style>

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-main">
          <AdminTopbar />

          <div className="admin-content">
            <h2>User Management</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
