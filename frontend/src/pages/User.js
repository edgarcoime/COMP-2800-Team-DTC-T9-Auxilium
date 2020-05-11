import React, { Component } from "react";
import axios from 'axios'
import Header from "./../components/Header/Header";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {},
    };
  }

  componentDidMount() {
      const token = localStorage.getItem('token');
      console.log(token);
      const headers = {
        'x-auth-token': {token}
      };
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 className="text-center">Profile</h1>
          <Row>
            <Col className="col-12 col-sm-6">
                <p className="text-center mt-3">{"First Name: " }</p>
            </Col>
            <Col className="col-12 col-sm-6">
                <p className="text-center mt-3">{"Last Name: "}</p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">{"Username: "}</p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3  ">Email@gmail.com</p>
            </Col>
          </Row>
          <Row></Row>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,

});

export default connect(mapStateToProps, { login })(User);
