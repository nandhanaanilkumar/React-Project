import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


const Registration = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    navigate("/");
  };


    return <div>
       <section className="hero-section mb-5 d-flex align-items-center justify-content-center " style={{minHeight: '100vh', width: '100%', backgroundColor: '#f5f5f5'}}>

        {error && <div className="alert alert-danger">{error}</div>}

  <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
    <div className="container">
      <div className="row gx-5 align-items-center justify-content-center">
        <div className="col-lg-6 mb-5 text-center">
          <h1 className="my-5 display-3 fw-bold ls-tight mt-3">
            Share Your Story <br />
            <span className="text-primary">With the world</span>
          </h1>
         <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
  Share your thoughts, ideas, and experiences through meaningful blog posts.
  Create, edit, and publish content while engaging with readers through likes,
  comments, and shares on a single platform.
</p>

        </div>

        <div className="col-lg-6 mb-5 mb-lg-0 text-center">
          <div className="card mt-3">
            <div className="card-body py-5 px-md-5 justify-content-center">
               <h3 className="text-primary mb-3">Create Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                          <input
            type="text"
            className="form-control mb-3"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                     <input
            type="text"
            className="form-control mb-3"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
                    </div>
                  </div>
                </div>

                {/* <!-- Email input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                   <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
                </div>

                {/* <!-- Password input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                   <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
                </div>      
 
                {/* <!-- Confirm Password input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                   <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <small className="text-muted">
            Password must contain uppercase, lowercase, number & special character
          </small>
                </div>
                {/* <!-- Submit button --> */}
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                  Sign up
                </button>

                <p className="text-center mt-3">Already have an account? <Link to="/">Sign in</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>;
}


export default Registration;