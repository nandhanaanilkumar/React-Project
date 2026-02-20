import React, { useEffect, useState } from "react";

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      const res = await fetch(
        `http://localhost:5000/following/${loggedUser.id}`
      );

      const data = await res.json();
      setFollowing(data);
    };

    fetchFollowing();
  }, []);

  return (
    <div>
      <h3>Following</h3>

      {following.map((f, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <img
            src={f.receiver.profileImage}
            width="50"
            alt=""
          />
          <b>
            {f.receiver.firstName} {f.receiver.lastName}
          </b>
          <p>{f.receiver.headline}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowingPage;