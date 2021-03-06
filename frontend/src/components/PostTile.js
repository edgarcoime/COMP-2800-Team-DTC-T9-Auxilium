import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col } from "reactstrap";
import loading from "./images/loading_1.gif";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./component.css";

// Components
import Post from "./partials/Post.component";

// Initiates redux connection to the Global store to access Global state
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PostTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      limitedPosts: [],
      index: 0,
      hasMore: true,
    };
  }

  // Function to convert createdAt timestamp from server
  // into how long ago it was created from current time
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

  // Gets all the regular posts from the DB:
  // 1. Sends a request to the API to grab all regular posts.
  // 2. Filters post to show a limited amount to display first.
  componentDidMount() {
    axios.get("/api/posts/getall").then((res) => {
      const posts = res.data;
      // console.log(posts)
      this.setState({ posts: posts });
      this.setState({ filteredPosts: posts });
      this.loadData();
    });
  }

  // Parses through posts to find post that matches user's search field query.
  handleSearchChange = (event) => {
    const { value } = event.target;
    const lowerCaseValue = value.toLowerCase();

    this.setState((prevState) => {
      const limitedPosts = prevState.posts.filter((elm) =>
        elm.title.toLowerCase().includes(lowerCaseValue)
      );

      return { limitedPosts };
    });
  };

  // Function that loads 9 more posts from pool of posts.
  // (Upon page load only loads 9 first)
  loadData = () => {
    const limitedPosts = this.state.limitedPosts;
    const filteredPosts = this.state.filteredPosts;
    const tempIndex = this.state.index;
    this.setState({ index: tempIndex + 9 });
    for (let i = tempIndex; i < this.state.index; i++) {
      if (i >= filteredPosts.length - 1) {
        this.setState({ hasMore: false });
        return;
      }
      limitedPosts.push(filteredPosts[i]);
    }
    this.setState({ limitedPosts: limitedPosts });
  };

  // Function that loads more posts
  loadMoreData = () => {
    const limitedPosts = this.state.limitedPosts;
    const filteredPosts = this.state.filteredPosts;
    if (limitedPosts.length >= filteredPosts.length) {
      this.setState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      this.loadData();
    }, 1000);
  };

  render() {
    const { limitedPosts } = this.state;
    const { isAuthenticated } = this.props;
    let user = "";
    let username = "";
    let userId = "";
    let token = "";
    if (isAuthenticated) {
      user = this.props.user;
      username = user.name;
      userId = user._id;
      token = this.props.token;
    }
    return (
      <div className="container">
        <div className="form-group has-search mt-4">
          <span className="form-control-logo">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            onChange={this.handleSearchChange}
          />
        </div>
        <InfiniteScroll
          className="scroll-box"
          dataLength={limitedPosts.length}
          next={this.loadMoreData}
          hasMore={this.state.hasMore}
          loader={
            <Row className="text-center mt-1">
              <Col>
                <img src={loading} alt="loading" height="70" width="70" />
              </Col>
            </Row>
          }
          endMessage={
            <h5 className="text-center mt-3">
              <strong>
                There's nothing left! You have reached the end of General Posts.
              </strong>
            </h5>
          }
        >
          {limitedPosts.map((post) => (
            <TransitionGroup>
              <CSSTransition key={post._id} classNames="fade" timeout={1500}>
                <Post
                  key={post._id}
                  _id={post._id}
                  owner={post.owner}
                  ownerId={post.ownerId}
                  createdAt={post.createdAt}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                  isAuthenticated={this.props.isAuthenticated}
                  username={username}
                  userId={userId}
                  token={token}
                />
              </CSSTransition>
            </TransitionGroup>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

// Sets the types of the Global Vars coming in as "props".
PostTile.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  id: PropTypes.string,
  user: PropTypes.object,
  token: PropTypes.string,
};

// Maps Redux store to the props of the PostTile component.
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id,
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(PostTile);
