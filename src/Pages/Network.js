import React, { useEffect, useState } from "react";
import NetworkSidebar from "../Components/Network/NetworkSidebar";
import NetworkTab from "../Components/Network/NetworkTab";
import InvitationCard from "../Components/Network/InvitationCard";
import NetworkGrid from "../Components/Network/NetworkGrid";

const Network = ({ searchQuery }) => {

  const [people, setPeople] = useState([]);

  useEffect(() => {

    const fetchPeople = async () => {

      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      if (!loggedUser) return;

      const res = await fetch(
        `http://localhost:5000/people/${loggedUser.id}`
      );

      const data = await res.json();

      setPeople(Array.isArray(data) ? data : []);
    };

    fetchPeople();

  }, []);

   useEffect(() => {

    const searchUsers = async () => {

      // if search empty → show normal people again
      if (!searchQuery?.text?.trim()) {
        return;
      }

      const res = await fetch(
        `http://localhost:5000/search?text=${searchQuery.text}`
      );

      const data = await res.json();

      setPeople(data.users || []);
    };

    searchUsers();

  }, [searchQuery]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "24px",
        padding: "24px 60px",
        background: "#f3f2ef",
        minHeight: "100vh",
      }}
    >
      <NetworkSidebar />

      <div>
        <NetworkTab />
        <InvitationCard />

        {/* SEARCH RESULT PEOPLE */}
        <NetworkGrid people={people} />
      </div>
    </div>
  );
};

export default Network;