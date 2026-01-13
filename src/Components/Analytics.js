import React from "react";

const Analytics = () => {
  return (
  
<div className="bg-light py-4">

    <div className="container">
      <div className="row justify-content-center">

        {/* ✅ Width controller */}
        <div className="col-12 col-md-10 col-lg-10 mt-3 mb-3">

          <div className="card shadow-sm">
            <div className="card-body">

              {/* Title */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">📊 Analytics</h5>
                <small className="text-muted">Last 30 days</small>
              </div>

              {/* Stats */}
              <div className="row text-center">
                <div className="col-6 col-md-3 mb-3">
                  <h4 className="mb-0">1,245</h4>
                  <small className="text-muted">Profile views</small>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <h4 className="mb-0">3,420</h4>
                  <small className="text-muted">Post likes</small>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <h4 className="mb-0">+120</h4>
                  <small className="text-muted">New followers</small>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <h4 className="mb-0">8.9K</h4>
                  <small className="text-muted">Profile reach</small>
                </div>
              </div>

              <hr />

              {/* Engagement */}
              <div className="text-center">
                <h6 className="mb-1">Engagement Rate</h6>
                <p className="text-success fw-semibold mb-0">7.8% ↑</p>
                <small className="text-muted">
                  Compared to last month
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Analytics;
