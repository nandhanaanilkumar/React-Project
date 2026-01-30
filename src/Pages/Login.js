import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../Pages/ForgotPasswordModal";

const Login = () => {
  const navigate = useNavigate();
const [error, setError] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showForgot, setShowForgot] = useState(false);

  const ADMIN_EMAIL="admin@blog.com";
  const ADMIN_PASSWORD="admin123";
  const USER_EMAIL="user@blog.com";
  const USER_PASSWORD="user123";

  const handleSubmit = (e) => {
    e.preventDefault();
      const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  // change route if needed
  if(email===ADMIN_EMAIL && password===ADMIN_PASSWORD){
    console.log("Admin logged in");
    navigate("/admindashboard");
    return;
  }
  if (
    savedUser &&
    email === savedUser.email &&
    password === savedUser.password
  )   
  {
    setError("");
    navigate("/home");
    return;
  }else if(email===USER_EMAIL && password===USER_PASSWORD){
    console.log("Default user logged in");
    navigate("/home");
    return;
  } 
    setError("Invalid email or password");

  };

  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-center mb-5">
            <h1 className="display-4 fw-bold">
              Welcome Back <br />
              <span className="text-primary">Login to continue</span>
            </h1>
            <p className="text-muted">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* LOGIN CARD */}
          <div className="col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                   {error && (
    <div className="alert alert-danger text-center">
      {error}
    </div>
  )}
                  {/* Email */}
                  <div className="form-outline mb-4">
                    
                    <input
                      type="email"
                      id="loginEmail"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value);
                        setError("");
                      }}
                      className="form-control"
                      required
                    />
                    <label className="form-label" htmlFor="loginEmail">
                      Email address
                    </label>
                  </div>

                  {/* Password */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="loginPassword"
                      value={password}
                      onChange={(e) => 
                        {setPassword(e.target.value);
                        setError("");
                        }}
                      className="form-control"
                      required
                    />
                    <label className="form-label" htmlFor="loginPassword">
                      Password
                    </label>
                  </div>

                  {/* Remember me */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-100 mb-4"
                  >
                    Login
                  </button>
                  <div>
        <span
          onClick={() => setShowForgot(true)}
          style={{
            color: "#0a66c2",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot password?
        </span>
      </div>
                  {showForgot && (<ForgotPasswordModal onClose={() => setShowForgot(false)} />)}  
                    
                  <div>
                    <a href="/registration">Don't have an account? Sign Up</a>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;
