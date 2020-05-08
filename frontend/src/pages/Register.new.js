import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header/Header'
import logo from './../images/logo_transparent.png'

// Redux
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
            password: "", 
      password: "",
      confirmPassword: "",
      msg: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated redirect to login page
    if (this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    } = this.state;

    // Create user object
    const newUser = {
      email,
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <Header />
        <Card className="bg-dark shadow">
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <CardTitle className="text-center p-3">
            <img
              src={logo}
              className="d-block mx-auto  "
              height="150"
              width="150"
            />
          </CardTitle>
          <CardBody className="mx-auto w-50">
            <form onSubmit={this.onSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="form-control"
                onChange={this.onChange}
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First name"
                className="form-control mt-4"
                onChange={this.onChange}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
                className="form-control mt-4"
                onChange={this.onChange}
              />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="form-control mt-4"
                onChange={this.onChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control mt-4"
                onChange={this.onChange}
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="form-control mt-4"
                onChange={this.onChange}
              />
              <button type="submit" className="btn btn-success mt-4">
                Register
              </button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
