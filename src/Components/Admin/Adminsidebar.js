import React from 'react';
import { useNavigate } from 'react-router-dom';
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
const Adminsidebar = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      width: "220px",
      minHeight: "100vh",
      background: "#1e293b",
      color: "#fff",
      padding: "20px"
    }}>
      <h3 style={{ marginBottom: "30px" }}>Admin Panel</h3>

      <p>📊 Dashboard</p>
      <p>👥 Users</p>
<p onClick={() => navigate("/admin/posts")} style={{ cursor: "pointer" }}>
  📝 Posts
</p>
      <p>💬 Comments</p>
      <p>📈 Analytics</p>
      <p>⚙️ Settings</p>
    </div>
  );
};


Adminsidebar.propTypes = propTypes;
Adminsidebar.defaultProps = defaultProps;
// #endregion

export default Adminsidebar;