import React, { useEffect, useState } from "react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("experiences")) || [];
    setExperiences(stored);
  }, []);

  // Save to localStorage
  const saveExperiences = (data) => {
    setExperiences(data);
    localStorage.setItem("experiences", JSON.stringify(data));
  };

  // Add Experience
  const addExperience = () => {
    const role = prompt("Role");
    const company = prompt("Company / Organization");
    const duration = prompt("Duration (e.g. Jan 2024 – May 2024)");
    const description = prompt("Description");

    if (!role || !company) return;

    const newExp = {
      id: Date.now(),
      role,
      company,
      duration,
      description,
    };

    saveExperiences([...experiences, newExp]);
  };

  // Edit Experience
  const editExperience = (exp) => {
    const role = prompt("Role", exp.role);
    const company = prompt("Company", exp.company);
    const duration = prompt("Duration", exp.duration);
    const description = prompt("Description", exp.description);

    const updated = experiences.map((e) =>
      e.id === exp.id
        ? { ...e, role, company, duration, description }
        : e
    );

    saveExperiences(updated);
  };

  return (
    <div className="bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-10">

            <div className="card shadow-sm">
              <div className="card-body">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Experience</h5>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={addExperience}
                  >
                    + Add
                  </button>
                </div>

                {/* Experience List */}
                {experiences.length === 0 && (
                  <p className="text-muted small">
                    No experience added yet.
                  </p>
                )}

                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-3">

                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0">{exp.role}</h6>
                      <button
                        className="btn btn-sm btn-link"
                        onClick={() => editExperience(exp)}
                      >
                        Edit
                      </button>
                    </div>

                    <small className="text-muted">
                      {exp.company}
                    </small>

                    <p className="text-muted small mb-1">
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
