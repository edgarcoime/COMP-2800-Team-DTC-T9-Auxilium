import React, { Component } from "react";
import { Row, Col, Navbar, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faViruses } from '@fortawesome/free-solid-svg-icons'
import logo from "./../../images/logo_transparent.png";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

// Initiates redux connection to the Global store to access Global state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginRegisterBtn from "./LoginRegisterBtn";
import Logout from "./Logout.component";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      isOpen: false
    };
  }

  handleToggle = () => {
    const currentState = this.state.isOpen;
    this.setState({isOpen: !currentState});
  }

  render() {
    const { history, auth: {isAuthenticated, user} } = this.props;
    
    return (
      <div className="header">
        <div className="container">
          <Row>
            <Col className="col-4 col-sm-2 col-md-2 order-2 order-sm-2 order-md-1 ">
              <NavLink to="/" className="justify-content-end">
                <img src={logo} alt="Auxilium logo" width="80"/>
              </NavLink>
            </Col>
            <Col className="col col-sm col-md order-1 order-sm-1 order-md-3">
              <Navbar dark expand="md" className="mt-2 float-md-right">
              <NavbarToggler onClick={this.handleToggle} className="text-white"/>
              <Collapse  isOpen={this.state.isOpen} navbar>
                  <Nav className=" w-100" navbar>
                    <NavItem className="mr-2">
                      <NavLink to="/" className="nav-link ">
                        <span className="text-link">
                          <i className=" fa fa-home fa-lg mr-1"></i>
                          <span className="d-sm-inline d-md-none d-lg-inline">Home</span>
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                      <NavLink to="/covid" className="nav-link">
                      <span className="nav-text ml-1 text-link">
                        <FontAwesomeIcon icon={faViruses} size="lg" className="mr-1"/>
                        <span className=" d-sm-inline d-md-none d-lg-inline">COVID-19</span>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                      <NavLink to="/about" className="nav-link">
                        <span className="text-link">
                          <i className="fa fa-users fa-lg mr-1"></i>
                          <span className="d-sm-inline d-md-none d-lg-inline">About Us</span>
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                        <LoginRegisterBtn user={user} isAuthenticated={isAuthenticated} />
                    </NavItem>
                    <NavItem className="mr-2">
                      { isAuthenticated ? <Logout history={history}/> : null }
                    </NavItem>
                  </Nav>
              </Collapse>
              </Navbar>
            </Col>
          </Row>
        </div>
        
      </div>
    );
  }
}

// Sets the types of the global vars coming in as "props"
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object
};

// Maps Redux store to the props of Header component
const mapStateToProps = (state, ownProps) => {
  const { history } = ownProps
  return {
    auth: state.auth,
    history
  }
};

export default connect(mapStateToProps, null)(Header);
