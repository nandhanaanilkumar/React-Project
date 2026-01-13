import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Profile from '../Components/Profilecom';
import Analytics from '../Components/Analytics';
import Experience from '../Components/Experience';
import Nav from '../Components/Navbar';
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
const Bio = () => {
    return <div>
        <div>
            <Nav></Nav>
        </div>
        <div>
            <Profile></Profile>
        </div>
        <div>
            <Analytics></Analytics>
        </div>
        <div>
            <Experience></Experience>
        </div>
    </div>;
}

Bio.propTypes = propTypes;
Bio.defaultProps = defaultProps;
// #endregion

export default Bio;