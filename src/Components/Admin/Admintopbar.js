import React from 'react';
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
const Admintopbar = () => {
  return (
    <div style={{
      padding: "15px 20px",
      background: "#fff",
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>Dashboard</h2>
      <div>
        <span style={{ marginRight: "15px" }}>🔔</span>
        <span>Admin</span>
      </div>
    </div>
  );
};

Admintopbar.propTypes = propTypes;
Admintopbar.defaultProps = defaultProps;
// #endregion

export default Admintopbar;