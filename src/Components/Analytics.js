import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {

  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {

      const loggedUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

      const userId =
        loggedUser?.id || loggedUser?._id;

      if (!userId) return;

      const res = await axios.get(
        `http://localhost:5000/user-analytics/${userId}`
      );

      setAnalytics(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ⭐ REAL-TIME UPDATE (every 5 sec)
  useEffect(() => {

    fetchAnalytics();

    const interval = setInterval(() => {
      fetchAnalytics();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  if (!analytics)
    return <div className="p-3">Loading analytics...</div>;

  return (
    <div className="bg-light py-4">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-10 col-lg-10 mt-3 mb-3">

            <div className="card shadow-sm">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">📊 Analytics</h5>
                  <small className="text-muted">
                    Live data
                  </small>
                </div>

                {/* DYNAMIC STATS */}
                <div className="row text-center">

                  <div className="col-6 col-md-3 mb-3">
                    <h4>{analytics.profileViews}</h4>
                    <small className="text-muted">
                      Profile views
                    </small>
                  </div>

                  <div className="col-6 col-md-3 mb-3">
                    <h4>{analytics.postLikes}</h4>
                    <small className="text-muted">
                      Post likes
                    </small>
                  </div>

                  <div className="col-6 col-md-3 mb-3">
                    <h4>+{analytics.newFollowers}</h4>
                    <small className="text-muted">
                      Followers
                    </small>
                  </div>

                  <div className="col-6 col-md-3 mb-3">
                    <h4>{analytics.profileReach}</h4>
                    <small className="text-muted">
                      Profile reach
                    </small>
                  </div>

                </div>

                <hr />

                <div className="text-center">
                  <h6 className="mb-1">
                    Engagement Rate
                  </h6>

                  <p className="text-success fw-semibold mb-0">
                    {analytics.engagement}% ↑
                  </p>

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