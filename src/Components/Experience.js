import React, { useEffect, useState } from "react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

   useEffect(() => {

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
    <div className="bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-10">

            <div className="card shadow-sm">
              <div className="card-body">

                <div className="d-flex justify-content-between mb-3">
                  <h5>Experience</h5>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={addExperience}
                  >
                    + Add
                  </button>
                </div>

                {experiences.length === 0 && (
                  <p className="text-muted small">
                    No experience added yet.
                  </p>
                )}

                {experiences.map((exp, index) => (
                  <div key={index} className="mb-3">

                    <div className="d-flex justify-content-between">
                      <h6>{exp.role}</h6>
                      <button
                        className="btn btn-sm btn-link"
                        onClick={() => editExperience(exp, index)}
                      >
                        Edit
                      </button>
                    </div>

                    <small className="text-muted">
                      {exp.company}
                    </small>

                    <p className="small text-muted mb-1">
                      {exp.duration}
                    </p>

                    <p className="small mb-0">
                      {exp.description}
                    </p>

                    <hr />
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;