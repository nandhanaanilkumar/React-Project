
import React, { useEffect, useState } from "react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedUser?.id) return;

  fetch(`http://localhost:5000/experience/${loggedUser.id}`)
    .then(res => res.json())
    .then(data => setExperiences(data));

}, []);

  const addExperience = async () => {

    const role = prompt("Role");
    const company = prompt("Company / Organization");
    const duration = prompt("Duration");
    const description = prompt("Description");

    if (!role || !company) return;

    const res = await fetch(
      `http://localhost:5000/experience/${loggedUser.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company, duration, description })
      }
    );

    const updated = await res.json();
    setExperiences(updated);
  };
   // Edit Experience
  const editExperience = async (exp, index) => {

    const role = prompt("Role", exp.role);
    const company = prompt("Company", exp.company);
    const duration = prompt("Duration", exp.duration);
    const description = prompt("Description", exp.description);

    const res = await fetch(
      `http://localhost:5000/experience/${loggedUser.id}/${index}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company, duration, description })
      }
    );

    const updated = await res.json();
    setExperiences(updated);
  };

  return (
    <div className="bg-light py-2">
      <div className="container" style={{ maxWidth: "1120px" }}>
        <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0" style={{ fontSize: "22px" }}>Experience</h4>
              <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={addExperience}>+ Add Experience</button>
            </div>

            {experiences.length === 0 ? (
              <p className="text-muted italic">Share your career journey by adding your roles.</p>
            ) : (
              experiences.map((exp, index) => (
                <div key={index} className="mb-4 pb-4 border-bottom last-child-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex">
                      <div className="bg-light rounded p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "54px", height: "54px" }}>
                        🏢
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: "20px" }}>{exp.role}</h5>
                        <div className="text-dark fw-medium" style={{ fontSize: "17px" }}>{exp.company}</div>
                        <div className="text-muted mb-2" style={{ fontSize: "15px" }}>{exp.duration}</div>
                        <p className="mt-2" style={{ fontSize: "17px", color: "#444", lineHeight: "1.5" }}>{exp.description}</p>
                      </div>
                    </div>
                    <button className="btn btn-light btn-sm rounded-circle" onClick={() => editExperience(exp, index)}>✎</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;