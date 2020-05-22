import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

// Initiates redux connection to global store to access Global state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Logouts user by using the logout action type via Redux
  logOutClickHandler = () => {
    const { logout, history } = this.props;
    logout();

    history.push("/");
  }

  render() {
    return (
      <Fragment>
        <NavLink className="nav-link" onClick={this.logOutClickHandler} href="#">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            className="text-link"
          />
        </NavLink>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
