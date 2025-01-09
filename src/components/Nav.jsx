import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-sm ">
        <NavLink
         
         
          style={{
            borderBottom: "1px solid red",
            borderBottomRightRadius: "20px",
            padding: "5px 20px ",
            margin: "0px 10px",
          }}
          className={({isActive})=> (isActive ? "navbar-brand active-link":"navbar-brand")}
          to="/"
        >
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink
                style={{
                  borderBottom: "1px solid red",
                  borderBottomRightRadius: "20px",
                  padding: "5px 20px ",
                  margin: "0px 10px",
                }}
                className={({isActive})=> (isActive ? "nav-link active-link":"nav-link")}
                to="/about"
                
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                style={{
                  borderBottom: "1px solid red",
                  borderBottomRightRadius: "20px",
                  padding: "5px 20px ",
                  margin: "0px 10px",
                }}
                className={({isActive})=> (isActive ? "nav-link active-link":"nav-link")}
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                style={{
                  borderBottom: "1px solid red",
                  borderBottomRightRadius: "20px",
                  padding: "5px 20px ",
                  margin: "0px 10px",
                }}
                className={({isActive})=> (isActive ? "nav-link active-link":"nav-link")}
                to="/register"
              >
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                style={{
                  borderBottom: "1px solid red",
                  borderBottomRightRadius: "20px",
                  padding: "5px 20px ",
                  margin: "0px 10px",
                }}
                className={({isActive})=> (isActive ? "nav-link active-link":"nav-link")}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
