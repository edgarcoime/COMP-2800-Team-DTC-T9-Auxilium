import React, { Component, Fragment } from "react";
import axios from "axios";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "./LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Post from "./partials/Post.component";


class PostTileCovid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  postCreated = (createdAt) => {
    let createdWhen = "";
    const created = Date.parse(createdAt);
    let now = Date.now();
    const differenceInMilliSecond = now - created;
    const h = differenceInMilliSecond / 1000 / 60 / 60;
    if (h >= 24) {
      createdWhen = Math.trunc(h / 24) + "d ago";
    } else if (h < 1) {
      createdWhen = Math.trunc(h * 60) + "m ago";
    } else {
      createdWhen = Math.trunc(h) + "h ago";
    }

    return `Created: ${createdWhen}`;
  };

  postUpdated = (updatedAt) => {
    let updatedWhen = "";
    const created = Date.parse(updatedAt);
    let now = Date.now();
    const differenceInMilliSecond = now - created;
    const h = differenceInMilliSecond / 1000 / 60 / 60;
    if (h >= 24) {
      updatedWhen = Math.trunc(h / 24) + "d ago";
    } else if (h < 1) {
      updatedWhen = Math.trunc(h * 60) + "m ago";
    } else {
      updatedWhen = Math.trunc(h) + "h ago";
    }

    return `Updated: ${updatedWhen}`;
  };

  componentDidMount() {
    axios.get("/api/covid/getall").then((res) => {
      const posts = res.data;
      // console.log(posts)
      this.setState({ posts });
    });
  }

  render() {
    if(this.props.user){
      var {user, token} = this.props;
      var username = user.name
      }
    // const { posts } = this.state;
    return (
      <div className="posts-container">
      {this.state.posts.map((post) => (
        <Post 
          _id={post._id}
          owner={post.owner}
          createdAt={post.createdAt}
          title={post.title}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          isAuthenticated={ this.props.isAuthenticated }
          username = {username}
          token = {token}
        />
      ))}
    </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id,
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(PostTileCovid);
