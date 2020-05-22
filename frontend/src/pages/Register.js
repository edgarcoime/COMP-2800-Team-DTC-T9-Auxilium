import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import Header from "./../components/Header/Header";
import logo from "./../images/logo_transparent.png";
import './pages.css'

// Initiates redux connection to the Global store to access Global state
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
      name: "",
      password: "",
      confirmPassword: "",
      msg: null,
    };
  }

  // On change handler for input fields to change state.
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Clears errors in props 
  componentWillUnmount() {
    this.props.clearErrors();
  }

  // Sets error message if API sends an error code and displays message on screen
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

  // Submit event handler to register a user based on Redux action type function
  onSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      firstName,
      lastName,
      name,
      password,
      confirmPassword,
    } = this.state;

    // Create user object
    const newUser = {
      email,
      firstName,
      lastName,
      name,
      password,
      confirmPassword,
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <Card className="card-background shadow  w-75 mx-auto mt-4">
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <CardTitle className="text-center p-3">
            <img
              src={logo}
              alt="Auxilium Logo"
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
                name="name"
                id="name"
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

// Sets the types of the Global Vars coming in as "props".
Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

// Maps Redux store to the props of the Register component.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
