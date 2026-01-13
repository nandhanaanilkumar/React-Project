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
const Usertable = () => {
    
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "30px"
    }}>
      <h3>Users</h3>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@mail.com</td>
            <td>Active</td>
            <td>🚫 Ban</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@mail.com</td>
            <td>Active</td>
            <td>🚫 Ban</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Usertable.propTypes = propTypes;
Usertable.defaultProps = defaultProps;
// #endregion

export default Usertable;