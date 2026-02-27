import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../Components/Admin/Adminsidebar";
import AdminTopbar from "../Components/Admin/Admintopbar";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/analytics"
      );
      setAnalytics(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
    }
  };

  // first load
  useEffect(() => {
    fetchAnalytics();
  }, []);

  // LIVE UPDATE every 5 sec
  useEffect(() => {
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <h4>Total Users</h4>
                <p>{analytics?.users || 0}</p>
                <span className="trend">Live data</span>
              </div>

              <div className="stat-card">
                <h4>Posts Published</h4>
                <p>{analytics?.posts || 0}</p>
                <span className="trend">Auto updating</span>
              </div>

              <div className="stat-card">
                <h4>Total Comments</h4>
                <p>{analytics?.comments || 0}</p>
                <span className="trend">Realtime</span>
              </div>

              <div className="stat-card">
                <h4>Reported Items</h4>
                <p>{analytics?.reports || 0}</p>
                <span style={{ color: "#dc2626" }}>
                  Needs attention
                </span>
              </div>
            </div>

            {/* Traffic Summary (static for now) */}
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

            {/* Engagement */}
            <div className="section-card">
              <h3>User Engagement Insights</h3>
              <ul>
                <li>
                  👍 Average likes per post:{" "}
                  {analytics?.avgLikes || 0}
                </li>
                <li>
                  💬 Average comments per post:{" "}
                  {analytics?.avgComments || 0}
                </li>
                <li>⏱ Average reading time: 4.2 mins</li>
              </ul>
            </div>

            {/* Moderation */}
            <div className="section-card">
              <h3>Moderation Insights</h3>
              <ul>
                <li>
                  🚫 {analytics?.reports || 0} reports pending
                </li>
                <li>📝 Live moderation enabled</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;