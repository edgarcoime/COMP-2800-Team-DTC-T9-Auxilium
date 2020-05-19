import React, { Component, Fragment } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Component
import CovidPost from "./partials/CovidPost.component";
import {getAllCovidPosts} from "../actions/covidActions";
import {connect} from "react-redux";

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
    this.props.getAllCovidPosts();
  }

  render() {
    return (
      // <div>
      //   {posts.map((post) => (
      //     <CovidPost 
      //       _id={post._id}
      //       owner={post.owner}
      //       createdAt={post.createdAt}
      //       title={post.title}
      //       content={post.content}
      //       likes={post.likes}
      //       comments={post.comments}
      //       isAuthenticated={ this.props.isAuthenticated }
      //       filteredPosts = {this.state.filteredPosts}
      //     />
      //   ))}
      // </div>
            <div>
            {this.props.coviPosts.map((post) => (
              <CovidPost 
                _id={post._id}
                owner={post.owner}
                createdAt={post.createdAt}
                title={post.title}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                isAuthenticated={ this.props.isAuthenticated }
                filteredPosts = {this.state.filteredPosts}
              />
            ))}
          </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  coviPosts: state.covidPost.covidPosts
});

export default connect(mapStateToProps, {getAllCovidPosts})(PostTileCovid);
