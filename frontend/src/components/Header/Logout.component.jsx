import React, { Component, Fragment } from 'react'
import { NavLink } from "reactstrap";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions"

export class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    )
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
