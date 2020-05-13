import React, { Component } from "react";
import axios from "axios";
import Header from "./../components/Header/Header";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { tokenConfig } from "../actions/authActions";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    console.log(`Component Will mount:`, this.props);
  }

  render() {
    const {
      firstName,
      lastName,
      name,
      email,
      covidPostsCreated,
      covidPostsAccepted,
      postsCreated
    } = this.props.user
    console.log(postsCreated)
    return (
      <div>
        <Header />
        <div>
          <h1 className="text-center">Profile</h1>
          <Row>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">First Name: {firstName}</p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">Last Name: {lastName}</p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">Username: {name}</p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3  ">Email: {email}</p>
            </Col>
          </Row>
          <Row></Row>
        </div>

        <h2>Posts Created</h2>
        {
          postsCreated.map(post => (
            <p>{post.title}</p>
          ))
        }
        <h2>COVID Posts Created</h2>
        {
          covidPostsCreated.map(post => (
            <p>{post.title}</p>
          ))
        }
        <h2>COVID Posts Accepted</h2>
        {
          covidPostsAccepted.map(post => (
            <p>{post.title}</p>
          ))
        }
      </div>
    );
  }
}

User.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(User);
