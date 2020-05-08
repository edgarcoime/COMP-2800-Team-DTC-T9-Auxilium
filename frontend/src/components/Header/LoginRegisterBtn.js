import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

export default function LoginRegisterBtn(props) {
  const { user, isAuthenticated } = props;
  return (
    <NavLink to={ isAuthenticated ? "/user": "/login"} className="nav-link">
      <span className="text-link">
        { isAuthenticated ? `Welcome, ${user.name}` : "Login/Register"}
      </span>
    </NavLink>
  );
}
