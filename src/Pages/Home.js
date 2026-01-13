import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Nav from '../Components/Navbar';
import Leftsidebar from '../Components/Leftsidebar';
import Feed from '../Components/Feed';
import RightSidebar from '../Components/Rightsidebar';
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
const Home = () => {
    return <div>
        <div>
            <Nav/>
        </div>
        <div className="container-fluid mt-4">
  <div className="row">
    <div className="col">
    <Leftsidebar />
  </div>
  <div className="col">
           <Feed/>
          </div>
          <div className='col'>
            <RightSidebar />
          </div>
  </div>
</div>
    </div>;
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;