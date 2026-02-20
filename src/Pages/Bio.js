import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Profile from '../Components/Profilecom';
import Analytics from '../Components/Analytics';
import Experience from '../Components/Experience';
import ProfilePosts from "../Components/ProfilePosts";

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
            <Profile></Profile>
        </div>
        <div>
            <Analytics></Analytics>
        </div>
        <div>
            <Experience></Experience>
        </div>
        <div>
            <ProfilePosts></ProfilePosts>
        </div>
    </div>;
}

Bio.propTypes = propTypes;
Bio.defaultProps = defaultProps;
// #endregion

export default Bio;