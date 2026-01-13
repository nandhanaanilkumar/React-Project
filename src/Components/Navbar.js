import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Notification from '../Pages/Notification';
import { useNavigate } from 'react-router-dom';
import Network from '../Pages/Network'; 
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
const Nav = () => {
  const navigate = useNavigate();
    return <div> 
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand">Blogging App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
       <li className="nav-item">
          <span 
          className="nav-link active" 
          role="button" onClick={() => navigate("/network")}
          >Networks</span>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Message</a>
        </li>
        <li className="nav-item">
          <span
                className="nav-link active"
                role="button"
                onClick={() => navigate("/notifications")}
              >Notifications</span>
        </li>
      </ul>
      <form className="d-flex" role="search">
        
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> 

      
    </div>
  </div>
</nav>
    </div>;
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
// #endregion

export default Nav;