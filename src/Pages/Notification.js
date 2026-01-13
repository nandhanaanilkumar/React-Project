import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Notificationbar from '../Components/Notificationbar';
import Nav from '../Components/Navbar';
import Notificationleft from '../Components/Notificationleft';
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
const Notification = () => {
console.log("✅ Notification page rendered");
    return(
    <div>
          <div>
               <Nav/>
                </div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className='col'>
                            <Notificationleft></Notificationleft>
                        </div>
                        <div className="col">
                            <Notificationbar />
                        </div>
                        <div className='col' style={{ width: "100px" }}>
                            
                        </div>
                    </div>
           
       
    </div>
    </div>
    );
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
// #endregion

export default Notification;