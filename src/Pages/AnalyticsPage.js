import React from "react";

const Analytics = () => {
  return (
    <div className="bg-light py-2">
      <div className="container" style={{ maxWidth: "1120px" }}>
        <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h4 className="fw-bold m-0" style={{ fontSize: "22px" }}>📊 Analytics</h4>
              <small className="text-muted" style={{ fontSize: "14px" }}>Private to you</small>
            </div>
            <p className="text-muted mb-4" style={{ fontSize: "16px" }}>Performance in the last 30 days</p>

            <div className="row g-3">
              {[
                { label: "Profile views", val: "1,245" },
                { label: "Post likes", val: "3,420" },
                { label: "New followers", val: "+120" },
                { label: "Search appearances", val: "86" }
              ].map((stat, i) => (
                <div key={i} className="col-md-3">
                  <div className="p-3 rounded-3 h-100" 
                       style={{ transition: "0.3s", cursor: "pointer" }}
                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    <h3 className="fw-bold mb-0" style={{ fontSize: "26px", color: "#0a66c2" }}>{stat.val}</h3>
                    <small className="fw-bold text-dark" style={{ fontSize: "15px" }}>{stat.label}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-3 bg-light text-center border">
              <h6 className="mb-1" style={{ fontSize: "18px" }}>Overall Engagement Rate</h6>
              <p className="text-success fw-bold mb-0" style={{ fontSize: "22px" }}>7.8% ↑</p>
              <small className="text-muted">You are reaching 12% more people than last month</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;