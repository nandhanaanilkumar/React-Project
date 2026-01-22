import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Registration = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return <div>
       <section className="hero-section mb-5 d-flex align-items-center justify-content-center " style={{minHeight: '100vh', width: '100%', backgroundColor: '#f5f5f5'}}>


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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form3Example1" className="form-control" />
                      <label className="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form3Example2" className="form-control" />
                      <label className="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                {/* <!-- Email input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control" />
                  <label className="form-label" for="form3Example3">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" />
                  <label className="form-label" for="form3Example4">Password</label>
                </div>      

                {/* <!-- Submit button --> */}
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                  Sign up
                </button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>or sign up with:</p>
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>

                </div>
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

Registration.propTypes = propTypes;
Registration.defaultProps = defaultProps;
// #endregion

export default Registration;