import React, { Component } from "react";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import loading from "./images/loading_1.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "reactstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./component.css";

// Component
import CovidPost from "./partials/CovidPost.component";

// Initiates redux connection to the Global store to access Global state
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PostTileCovid extends Component {
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

  // Gets all the Covid posts from the DB:
  // 1. Sends a request to the API to grab all Covid posts.
  // 2. Filters post to show a limited amount to display first
  componentDidMount() {
    axios.get("/api/covid/getall").then((res) => {
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
      const filteredPosts = prevState.posts.filter((elm) =>
        elm.title.toLowerCase().includes(lowerCaseValue)
      );

      return { filteredPosts };
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

  // Function that loads more post
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
    
    // Tommy's added code
    const { filteredPosts, limitedPosts } = this.state;
    if (this.props.isAuthenticated) {
      var { user, token } = this.props;
      var username = user.name;
      var userId = user._id;
      var userEmail = user.email;
    }
    console.log(userEmail)
    
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
              <strong>Oh! There are no more Covid Posts to show!</strong>
            </h5>
          }
        >
          {filteredPosts.map((post) => (
            <TransitionGroup>
              <CSSTransition key={post._id} classNames="fade" timeout={1500}>
                <CovidPost
                  key={post._id}
                  _id={post._id}
                  owner={post.owner}
                  ownerId={post.ownerId}
                  ownerEmail={post.ownerEmail}
                  createdAt={post.createdAt}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                  assignedTo={post.assignedTo}
                  isAuthenticated={this.props.isAuthenticated}
                  username={username}
                  userId={userId}
                  token={token}
                  userEmail={userEmail}
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
PostTileCovid.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  id: PropTypes.string,
  user: PropTypes.object,
  token: PropTypes.string,
};

// Maps Redux store to the props of the PostTileCovid component.
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

export default connect(mapStateToProps, null)(PostTileCovid);
