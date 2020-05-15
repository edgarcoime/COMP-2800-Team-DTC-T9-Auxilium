import React, { Component, Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeart1,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Components
import CommentTile from "./partials/Comment.component";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

class LikeComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: 0,
      isCommentClicked: 0,
      postComments: [],
      postLikes: [],
      comment: "",
      refreshComponent: true,
    };
  }

  componentWillUnmount = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      this.setState({
        isClicked: 0,
        isCommentClicked: 0,
      });
    }
  };

  componentDidUpdate = () => {
    const { isClicked } = this.state;
    const { isAuthenticated } = this.props;
    if (!isClicked && isAuthenticated) {
      let userLiked = this.userAlreadyLiked();
      if (userLiked) {
        this.setState({ isClicked: 1 });
      }
    };
  };

  componentDidMount = async () => {
    try {
      const { id, isCovid } = this.props;
      let url = "";
      isCovid
        ? (url = "http://localhost:5000/api/comment/getcovidcomments")
        : (url = "http://localhost:5000/api/comment/getpostcomments");
      const data = { postId: id };
      const response = await axios.post(url, data);

      this.setState({
        postComments: response.data.comments,
        postLikes: response.data.likes,
        refreshComponent: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  userAlreadyLiked = () => {
    const {
      user: { name: username, _id: userId },
    } = this.props;
    const { postLikes } = this.state;
    const userLoggedIn = { ownerId: userId, owner: username };
    let alreadyLiked = false;
    postLikes.forEach((like) => {
      if (like.ownerId === userLoggedIn.ownerId) {
        alreadyLiked = true;
      }
    });
    return alreadyLiked;
  };

  handleLikeClick = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      alert("You must be signed in to like a post!");
    } else {
      if (this.state.isClicked == 0) {
        this.likePost();
      } else {
        this.unLikePost();
      }
    }
  };

  likePost = async () => {
    try {
      // Destructuring objects
      const {
        token,
        id: postId,
        user: { name, _id: userId },
        isCovid,
      } = this.props;

      // initialize fetch URL
      const likeData = {
        owner: name,
        ownerId: userId,
        postId,
      };
      let apiURL = "";
      isCovid
        ? (apiURL = "http://localhost:5000/api/like/covid")
        : (apiURL = "http://localhost:5000/api/like");

      // Axios request to post comment to mongo using backend api
      const response = await axios({
        method: "post",
        url: apiURL,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: likeData,
      });

      // parsing through resopnse data and setting Component state to display comment
      const updatedPost = response.data;
      console.log(updatedPost);
      const newLike = {
        ownerId: userId,
        owner: name,
      };
      let newStateLikes = [...this.state.postLikes];
      newStateLikes.push(newLike);
      this.setState({
        isCommentClicked: 0,
        refreshComponent: true,
        postLikes: newStateLikes,
      });

      // Set like to Clicked
      this.setState({ isClicked: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  unLikePost = async () => {
    try {
      // Destructuring objects
      const {
        token,
        id: postId,
        user: { name, _id: userId },
        isCovid,
      } = this.props;

      // initialize fetch URL
      const likeData = {
        owner: name,
        ownerId: userId,
        postId,
      };
      let apiURL = "";
      isCovid
        ? (apiURL = "http://localhost:5000/api/like/covid/delete")
        : (apiURL = "http://localhost:5000/api/like/delete");

      // Axios request to post comment to mongo using backend api
      const response = await axios({
        method: "post",
        url: apiURL,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: likeData,
      });

      // parsing through resopnse data and setting Component state to display comment
      const updatedPost = response.data;
      console.log(updatedPost);
      const newLike = {
        ownerId: userId,
        owner: name,
      };
      let originalStateLikes = [...this.state.postLikes];
      const newStateLikes = originalStateLikes.filter(
        (like) => like.ownerId !== userId
      );
      console.log(originalStateLikes, newStateLikes);
      this.setState({
        isCommentClicked: 0,
        refreshComponent: true,
        postLikes: newStateLikes,
      });

      // Set like to Clicked
      this.setState({ isClicked: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  handleCommentClick = (e) => {
    if (this.state.isCommentClicked == 0) {
      this.setState({ isCommentClicked: 1 });
    } else {
      this.setState({ isCommentClicked: 0 });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitComment = async (e) => {
    const { isAuthenticated, isCovid } = this.props;
    if (!isAuthenticated) {
      alert("Please sign in to comment");
    } else {
      // Destructuring Objects
      const { comment } = this.state;
      const {
        token,
        id: postId,
        user: { name, _id: userId },
      } = this.props;

      // Initializing fetch request data for axios
      const commentData = {
        text: comment,
        owner: name,
        ownerId: userId,
        postId,
      };
      let apiURL = "";
      isCovid
        ? (apiURL = "http://localhost:5000/api/comment/covid")
        : (apiURL = "http://localhost:5000/api/comment/");

      // Axios request to post comment to mongo using backend api
      const response = await axios({
        method: "post",
        url: apiURL,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: commentData,
      });

      // parsing through resopnse data and setting Component state to display comment
      const newComment = response.data;
      let newStateComments = [...this.state.postComments];
      newStateComments.push(newComment);
      this.setState({
        comment: "",
        isCommentClicked: 0,
        refreshComponent: true,
        postComments: newStateComments,
      });
    }
  };

  render() {
    // const comments = this.state.postComments;
    const { postLikes, postComments: comments } = this.state;
    return (
      <div>
        <p>{postLikes.length} likes</p>
        <span>
          <button className="btn" onClick={this.handleLikeClick}>
            <span>
              <FontAwesomeIcon
                icon={this.state.isClicked == 1 ? faHeart1 : faHeart}
                size="2x"
              />
            </span>
          </button>
          <button className="btn" onClick={this.handleCommentClick}>
            <span className="pl-3">
              <FontAwesomeIcon icon={faComment} size="2x" />
            </span>
          </button>
        </span>
        <Collapse isOpen={this.state.isCommentClicked} className="mt-3">
          <span>
            <input
              type="text"
              className="form-control d-inline w-75"
              name="comment"
              placeholder="Leave a comment"
              onChange={this.onChange}
            ></input>
            <button type="submit" className="btn" onClick={this.submitComment}>
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </button>
          </span>
          {comments.map((comment) => (
            <CommentTile
              key={"commentTile" + comment._id}
              commentId={comment._id}
              commentOwner={comment.owner}
              text={comment.text}
              ownerId={comment.ownerId}
              createdAt={comment.createdAt}
            />
          ))}
        </Collapse>
      </div>
    );
  }
}

LikeComment.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  id: PropTypes.string,
  comments: PropTypes.array,
  user: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { id, comments } = ownProps;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id,
    comments,
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(LikeComment);
