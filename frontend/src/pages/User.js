import React, { Component } from "react";
import axios from "axios";
import Header from "./../components/Header/Header";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { tokenConfig } from "../actions/authActions";

// Components
import Post from "../components/partials/Post.component";
import CovidPost from "../components/partials/CovidPost.component";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <div className="container">
        <h1 className="text-center">Profile</h1>
          <Row>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">
                First Name: {this.props.user.firstName}
              </p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">
                Last Name: {this.props.user.lastName}
              </p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3">
                Username: {this.props.user.name}
              </p>
            </Col>
            <Col className="col-12 col-sm-6">
              <p className="text-center mt-3  ">
                Email: {this.props.user.email}
              </p>
            </Col>
          </Row>
          <h2 className="mt-5"><strong>Posts Created</strong></h2>
          <hr />
          {this.props.user.postsCreated.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              owner={post.owner}
              createdAt={post.createdAt}
              title={post.title}
              content={post.content}
              likes={post.likes}
            />
          ))}
          <h2 className="mt-5"><strong>COVID Posts Created</strong></h2>
          <hr />
          {this.props.user.covidPostsCreated.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              owner={post.owner}
              createdAt={post.createdAt}
              title={post.title}
              content={post.content}
              likes={post.likes}
            />
          ))}
          <h2 className="mt-5"><strong>COVID Posts Accepted</strong></h2>
          <hr />
          {this.props.user.covidPostsAccepted.map((post) => (
            <p>{post.title}</p>
          ))}
        </div>
        
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
