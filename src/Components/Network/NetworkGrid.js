import PeopleCard from "./PeopleCard";
import { useEffect, useState } from "react";
const NetworkGrid = () => {
  const [people, setPeople] = useState([]);

useEffect(() => {

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  fetch(`http://localhost:5000/people/${loggedUser.id}`)
    .then(res => res.json())
    .then(data => setPeople(data));

}, []);



  return (
    <div>
      <h5>People you may know</h5>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px"
      }}>
       {people.map(p => (
  <PeopleCard
    key={p._id}
    id={p._id}
    name={`${p.firstName} ${p.lastName}`}
    role={p.headline}
    profileImage={p.profileImage}
  />
))}

      </div>
    </div>
  );
};

export default NetworkGrid;
