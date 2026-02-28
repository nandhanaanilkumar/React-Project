import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import postlyLogo from "../assets/postly-logo.png";
import { useLocation } from "react-router-dom";
const Nav = ({searchQuery, setSearchQuery}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updates, setUpdates] = useState({
  newPosts: 0,
  newMessages: 0,
  newNotifications: 0,
  newNetwork: 0,
});
const logout = () => {
  localStorage.clear(); 
  navigate("/");
};
const markAsRead = (type) => {
  setUpdates(prev => ({
    ...prev,
    [type]: 0,
  }));
};
useEffect(() => {

  const fetchUpdates = async () => {

    const user =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/updates/${user.id}`
    );

    const data = await res.json();

    setUpdates(data);
  };

  fetchUpdates();

  const interval = setInterval(fetchUpdates, 10000);

  return () => clearInterval(interval);

}, []);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        height: "72px",
        backgroundColor: "#ffffff",
        padding: "0 24px",
        fontSize: "20px",
      }}
    >
      <div className="container-fluid">

        {/* LOGO + NAME */}
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <img
            src={postlyLogo}
            alt="Postly"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />

          <span
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#0a66c2",
            }}
          >
            Postly
          </span>
        </div>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-4 mb-2 mb-lg-0 gap-2">
        <NavItem
  to="/home"
  label="Home"
  count={updates.newPosts}
  onRead={() => markAsRead("newPosts")}
/>

<NavItem
  to="/network"
  label="Network"
  count={updates.newNetwork}
  onRead={() => markAsRead("newNetwork")}
/>

<NavItem
  to="/messages"
  label="Messages"
  count={updates.newMessages}
  onRead={() => markAsRead("newMessages")}
/>

<NavItem
  to="/notifications"
  label="Notifications"
  count={updates.newNotifications}
  onRead={() => markAsRead("newNotifications")}
/>
          </ul>

          {/* SEARCH */}
          <form className="d-flex ms-auto"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
<input
  className="form-control me-2"
  type="search"
  placeholder="Search People or Posts"
  style={{ width: "220px" }}
  value={searchQuery?.text || ""}
  onChange={(e) => {
    const value = e.target.value;

    console.log("NAV SEARCH:", value);
    setSearchQuery({
      text: e.target.value,
      page: location.pathname,
    });
  }}
/>
            <button
              className="btn"
              style={{
                backgroundColor: "#0a66c2",
                color: "#fff",
                border: "none",
              }}
              type="submit"
            >
              Search
            </button>
            <button
    type="button"
    className="btn ms-3"
    onClick={logout}
    style={{
      backgroundColor: "transparent",
      color: "#0a66c2",
      border: "1px solid #0a66c2",
      fontWeight: "500",
    }}
  >
    Logout
  </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label, count, onRead }) => (
  <li className="nav-item position-relative">

    <NavLink
      to={to}
      className="nav-link"
      onClick={onRead}   // ⭐ THIS REMOVES BADGE
      style={({ isActive }) => ({
        fontWeight: "500",
        color: isActive ? "#0a66c2" : "#555",
        borderBottom: isActive
          ? "3px solid #0a66c2"
          : "3px solid transparent",
        paddingBottom: "6px",
      })}
    >
      {label}
    </NavLink>

    {count > 0 && (
      <span
        style={{
          position: "absolute",
          top: "2px",
          right: "-8px",
          background: "red",
          color: "#fff",
          borderRadius: "50%",
          fontSize: "11px",
          padding: "2px 6px",
          fontWeight: "600",
        }}
      >
        {count}
      </span>
    )}
  </li>
);
export default Nav;
