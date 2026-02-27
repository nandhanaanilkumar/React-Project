import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
const Usertable = () => {
     const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/admin/users"
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "30px"
    }}>
      <h3>Users</h3>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                {u.firstName} {u.lastName}
              </td>

              <td>{u.email}</td>

              <td>{u.status || "Active"}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Usertable;