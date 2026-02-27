import React from 'react';
import { useState, useEffect } from 'react';
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
  const [results, setResults] = useState(null);
  useEffect(() => {

  const search = async () => {

  if (!searchQuery?.text?.trim()) {
  setResults(null);
  return;
}
const loggedUser =
  JSON.parse(localStorage.getItem("loggedInUser"));
const res = await fetch(
  `http://localhost:5000/search?text=${searchQuery.text}
   &page=${searchQuery.page}
   &userId=${loggedUser.id}`
);

    const data = await res.json();

    setResults(data);
  };

  search();

}, [searchQuery]);
    return <div>
     
        <div className="container-fluid mt-4">
  <div className="row">
    <div className="col">
    <Leftsidebar />
  </div>
  <div className="col">
           <Feed
  searchQuery={searchQuery}
  searchResults={results}
/>
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