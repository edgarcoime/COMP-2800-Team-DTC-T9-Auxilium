import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "./LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Components
import Post from "./partials/Post.component";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class PostTile extends Component {
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

  componentDidMount() {
    axios.get("/api/posts/getall").then((res) => {
      const posts = res.data;
      // console.log(posts)
      this.setState({ posts });
    });
  }

  render() {
    if(this.props.isAuthenticated){
    var {user, token} = this.props;
    var username = user.name;
    var userId = user._id;
    }
    // console.log(username, userId)
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
            userId = {userId}
            token = {token}
          />
        ))}
      </div>
    );
  }
}
PostTile.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  id: PropTypes.string,
  user: PropTypes.object,
  token: PropTypes.string,
};

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

export default connect(mapStateToProps, null)(PostTile);

