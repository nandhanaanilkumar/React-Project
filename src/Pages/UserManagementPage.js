import { useState, useEffect } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";
import axios from "axios";

const UserManagementPage = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/admin/users"
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ⭐ LinkedIn-style filtering
  const filteredUsers = users.filter(u => {

    const fullName =
      `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

const matchesRole =
  roleFilter === "All" ||
  (u.role || "").toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });
console.log(users);
  return (
    <>
      <style>{`
        .admin-layout {
          display:flex;
          height:100vh;
          background:#f1f5f9;
        }
        .admin-main {
          flex:1;
          display:flex;
          flex-direction:column;
        }
        .admin-content {
          padding:20px;
          overflow-y:auto;
          background:#f8fafc;
        }
        table {
          width:100%;
          background:#fff;
          border-collapse:collapse;
        }
        th,td {
          border:1px solid #e2e8f0;
          padding:10px;
        }
        th {
          background:#e2e8f0;
        }
      `}</style>

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-main">
          <AdminTopbar />

          <div className="admin-content">
            <h2>User Management</h2>

            {/* ⭐ Search + Filter */}
            <div style={{ display:"flex", gap:"10px", marginBottom:"15px" }}>
              <input
                placeholder="Search user..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

              <select
                value={roleFilter}
                onChange={(e)=>setRoleFilter(e.target.value)}
              >
                <option>All</option>
                <option>Admin</option>
                <option>User</option>
                <option>Author</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>

                    <td>{user.email}</td>

                    <td>{user.role || "User"}</td>

                    <td>
                      <span style={{
                        padding:"4px 8px",
                        borderRadius:"6px",
                        background:
                          user.status === "Banned"
                            ? "#fee2e2"
                            : "#dcfce7",
                        color:
                          user.status === "Banned"
                            ? "#991b1b"
                            : "#166534"
                      }}>
                        {user.status || "Active"}
                      </span>
                    </td>

                    <td>
                      {new Date(user.createdAt)
                        .toLocaleDateString()}
                    </td>
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