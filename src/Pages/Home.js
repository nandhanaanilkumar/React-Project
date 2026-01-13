import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
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
const Home = ({searchQuery}) => {
    return <div>
     
        <div className="container-fluid mt-4">
  <div className="row">
    <div className="col">
    <Leftsidebar />
  </div>
  <div className="col">
           <Feed searchQuery={searchQuery} />
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