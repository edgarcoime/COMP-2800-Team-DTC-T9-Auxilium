import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import Header from "./../components/Header/Header";
import logo from "./../images/logo_transparent.png";
import "bootstrap/dist/css/bootstrap.min.css";
import './pages.css'

// Initiates redux connection to the Global store to access Global state
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

  // On change handler for input fields to change state.
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Upon sending request to login checks to see if error was found
  // If error was found sets an error message in component state to display later.
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

  // Submit event handler to log user in based on Redux action type function.
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
      <div>
        <Header history={this.props.history}/>
        <div className="aux-height">
          <Card className="card-background shadow w-75 mx-auto mt-4">
            { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null } 
            <CardTitle className="text-center p-3">
              <NavLink to="/register" className="d-block text-right">
                <button type="button" className="btn btn-info">
                  Register
                </button>
              </NavLink>
              <div>
                <img
                  src={logo}
                  className="d-block mx-auto  "
                  height="150"
                  width="150"
                />
              </div>
              
            </CardTitle>
            <CardBody className="mx-auto w-75">
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
      </div>
      
    );
  }
}

// Sets the types of the Global Vars coming in as "props".
Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

// Maps Redux store to the props of the Login component.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);

