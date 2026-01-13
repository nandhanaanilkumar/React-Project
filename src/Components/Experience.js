import React from "react";

const Experience = () => {
  return (
    <div className="bg-light py-4">
    
      <div className="container">

        <div className="row justify-content-center">
                      <div className="col-12 col-md-10 col-lg-10 mt-7 mb-7">
        <div className="card shadow-sm">
            <div className="card-body">

        <h6 className="mb-3">Experience</h6>

        {/* Experience 1 */}
        <div className="mb-3">
          <h6 className="mb-0">Frontend Developer Intern</h6>
          <small className="text-muted">ABC Tech · Internship</small>
          <p className="text-muted small mb-1">Jan 2024 – May 2024</p>
          <p className="small mb-0">
            Built responsive UI components using React and Bootstrap.
          </p>
        </div>

        <hr />

        {/* Experience 2 */}
        <div>
          <h6 className="mb-0">Web Developer</h6>
          <small className="text-muted">Personal Projects</small>
          <p className="text-muted small mb-1">2023 – Present</p>
          <p className="small mb-0">
            Developed a blogging platform with profiles, posts, and analytics.
          </p>
        </div>

      </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Experience;
