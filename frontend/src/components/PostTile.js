import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "./LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import store from '../store';


// Components
import Post from "./partials/Post.component";
import {getAllPosts} from "../actions/postActions";
import {connect} from "react-redux";

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
    this.props.getAllPosts()
  }

  render() {

    return (
      // <div className="container">
      //   {this.state.posts.map((post) => (
      //     <Post 
      //       _id={post._id}
      //       owner={post.owner}
      //       createdAt={post.createdAt}
      //       title={post.title}
      //       content={post.content}
      //       likes={post.likes}
      //       comments={post.comments}
      //       isAuthenticated={ this.props.isAuthenticated }
      //     />
      //   ))}
      // </div>
      <div className="container">
      {this.props.posts.map((post) => (
        <Post 
          _id={post._id}
          owner={post.owner}
          createdAt={post.createdAt}
          title={post.title}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          isAuthenticated={ this.props.isAuthenticated }
        />
      ))}
    </div>
    );
  }
}
const mapStateToProps = (state) => ({
    posts: state.post.posts
  });

export default connect(mapStateToProps, {getAllPosts})(PostTile);
