import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";

const AnalyticsPage = () => {
  return (
    <>
      <style>{`
        .admin-layout {
          display: flex;
          height: 100vh;
          background: #f1f5f9;
        }
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .admin-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .stat-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .stat-card h4 {
          font-size: 14px;
          color: #64748b;
        }
        .stat-card p {
          font-size: 26px;
          font-weight: bold;
          margin-top: 8px;
          color: #0f172a;
        }
        .section-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .metric-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }
        .progress-bar {
          background: #e2e8f0;
          height: 8px;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 6px;
        }
        .progress-fill {
          height: 100%;
          background: #2563eb;
        }
        .trend {
          font-size: 14px;
          color: #16a34a;
        }
      `}</style>

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-main">
          <AdminTopbar />

          <div className="admin-content">
            <h2>Analytics</h2>

            {/* KPI Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Views</h4>
                <p>124,560</p>
                <span className="trend">↑ 12% this month</span>
              </div>
              <div className="stat-card">
                <h4>Monthly Active Users</h4>
                <p>8,420</p>
                <span className="trend">↑ 8% growth</span>
              </div>
              <div className="stat-card">
                <h4>Posts Published</h4>
                <p>540</p>
                <span className="trend">+24 this month</span>
              </div>
              <div className="stat-card">
                <h4>Reported Comments</h4>
                <p>12</p>
                <span style={{ color: "#dc2626" }}>Needs attention</span>
              </div>
            </div>

            {/* Traffic Summary */}
            <div className="section-card">
              <h3>Traffic Summary</h3>

              <div className="metric-row">
                <span>Desktop Users</span>
                <span>68%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "68%" }} />
              </div>

              <div className="metric-row">
                <span>Mobile Users</span>
                <span>32%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "32%", background: "#16a34a" }}
                />
              </div>
            </div>

            {/* Engagement Insights */}
            <div className="section-card">
              <h3>User Engagement Insights</h3>
              <ul>
                <li>👍 Average likes per post: 42</li>
                <li>💬 Average comments per post: 8</li>
                <li>⏱ Average reading time: 4.2 mins</li>
              </ul>
            </div>

            {/* Top Performing Posts */}
            <div className="section-card">
              <h3>Top Performing Posts</h3>
              <table width="100%" cellPadding="10">
                <thead>
                  <tr>
                    <th align="left">Post Title</th>
                    <th align="left">Views</th>
                    <th align="left">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>How React Works</td>
                    <td>12,430</td>
                    <td>High</td>
                  </tr>
                  <tr>
                    <td>Node.js Basics</td>
                    <td>9,540</td>
                    <td>Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Moderation Insights */}
            <div className="section-card">
              <h3>Moderation Insights</h3>
              <ul>
                <li>🚫 12 comments reported</li>
                <li>👤 3 users suspended</li>
                <li>📝 8 posts awaiting review</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
