import { useState,useEffect } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";
import axios from "axios";
const CommentModerationPage = () => {
  const [comments, setComments] = useState([]);
const fetchComments = async () => {
    const res = await axios.get(
      "http://localhost:5000/admin/reports/comments"
    );
    setComments(res.data);
  };

 useEffect(() => {
    fetchComments();
  }, []);


const deleteComment = async (commentId) => {

  if (!window.confirm("Delete this comment?")) return;

  await axios.put(
    `http://localhost:5000/admin/reports/comments/delete/${commentId}`
  );

  fetchComments();
};

const keepComment = async (id) => {
  await axios.put(
    `http://localhost:5000/admin/reports/comments/keep/${id}`
  );

  fetchComments();
};

  return (
    <>
      {/* Layout CSS */}
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
          text-align: left;
        }
        th {
          background: #e2e8f0;
        }
        .delete-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 4px;
        }
        .delete-btn:hover {
          background: #b91c1c;
        }
      `}</style>

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-main">
          <AdminTopbar />

          <div className="admin-content">
            <h2>Reported Comments</h2>

           {comments.length === 0 ? (
            <p>No reported comments 🎉</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Post</th>
                  <th>Comment</th>
                  <th>Reported On</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {comments.map((c) => (
                <tr key={c.commentId}>
                    <td>
                      {c.user?.firstName || "User"}{" "}
                      {c.user?.lastName || ""}
                    </td>

                    <td>{c.postText?.slice(0,30)}...</td>

                    <td>{c.text}</td>

                    <td>
                      {new Date(c.createdAt).toLocaleString()}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                         deleteComment(c.commentId)
                        }
                      >
                        Delete
                      </button>

                      <button
                        style={{ marginLeft: "8px" }}
                        onClick={() => keepComment(c.commentId)}
                      >
                        Keep
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModerationPage;
