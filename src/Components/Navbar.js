import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import postlyLogo from "../assets/postly-logo.png";

const Nav = ({searchQuery, setSearchQuery}) => {
  const navigate = useNavigate();
const logout = () => {
  localStorage.clear(); 
  navigate("/");
};
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
            <NavItem to="/home" label="Home" />
            <NavItem to="/network" label="Network" />
            <NavItem to="/messages" label="Messages" />
            <NavItem to="/notifications" label="Notifications" />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

const NavItem = ({ to, label }) => (
  <li className="nav-item">
    <NavLink
      to={to}
      className="nav-link"
      style={({ isActive }) => ({
        fontWeight: "500",
        color: isActive ? "#0a66c2" : "#555",
        borderBottom: isActive ? "3px solid #0a66c2" : "3px solid transparent",
        paddingBottom: "6px",
      })}
    >
      {label}
    </NavLink>
  </li>
);

export default Nav;
