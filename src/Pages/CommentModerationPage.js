import { useState } from "react";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";

const CommentModerationPage = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      post: "How React Works",
      comment: "This post is stupid!",
      reason: "Abusive Language",
      reportedOn: "2026-01-10",
    },
    {
      id: 2,
      user: "Jane Smith",
      post: "Node.js Basics",
      comment: "Spam link: buy followers here",
      reason: "Spam",
      reportedOn: "2026-01-11",
    },
  ]);

  const deleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((c) => c.id !== id));
    }
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
                    <th>Report Reason</th>
                    <th>Reported On</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {comments.map((c) => (
                    <tr key={c.id}>
                      <td>{c.user}</td>
                      <td>{c.post}</td>
                      <td>{c.comment}</td>
                      <td>{c.reason}</td>
                      <td>{c.reportedOn}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteComment(c.id)}
                        >
                          Delete
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
