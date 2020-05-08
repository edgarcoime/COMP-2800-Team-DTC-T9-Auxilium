import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import Header from "./../components/Header/Header";
import logo from "./../images/logo_transparent.png";
import "bootstrap/dist/css/bootstrap.min.css";
import './pages.css'

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if(error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated redirect to login page
    if (isAuthenticated) {
      this.props.history.push("/")
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email, password
    };

    // Attempt to login
    this.props.login(user)
  };

  render() {
    return (
      <div className="aux-background">
        <Header />
        <Card className="aux-background shadow">
          { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null } 
          <CardTitle className="text-center p-3">
            <NavLink to="/register" className="d-block pull-right">
              <button type="button" className="btn btn-info">
                Register
              </button>
            </NavLink>

            <img
              src={logo}
              className="d-block mx-auto  "
              height="150"
              width="150"
            />
          </CardTitle>
          <CardBody className="mx-auto w-50">
            <form onSubmit={this.handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.onChange}
                className="form-control"
              />
              <input
                type="password"
                name="password"
                id="email"
                placeholder="Password"
                onChange={this.onChange}
                className="form-control mt-4"
              />
              <button type="submit" className="btn btn-success mt-4">
                Login
              </button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);

