import React, { useEffect, useState } from "react";

const FollowersPage = () => {

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {

      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      const res = await fetch(
        `http://localhost:5000/followers/${loggedUser.id}`
      );

      const data = await res.json();

      setFollowers(data);
    };

    fetchFollowers();
  }, []);

  return (
    <div>
      <h3>Followers</h3>

      {followers.map((f, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <img
            src={f.sender.profileImage}
            width="50"
            alt=""
          />
          <b>
            {f.sender.firstName} {f.sender.lastName}
          </b>
          <p>{f.sender.headline}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowersPage;