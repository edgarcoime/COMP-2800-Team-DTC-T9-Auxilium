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
      comment: "",
      refreshComponent: true,
    };
  }

  componentDidMount = async () => {
    try {
      const { id } = this.props;
      const url = "http://localhost:5000/api/comment/getpostcomments";
      const data = { postId: id };
      const response = await axios.post(url, data);
      this.setState({
        postComments: response.data.comments,
        refreshComponent: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleLikeClick = () => {
    if (this.state.isClicked == 0) {
      this.setState({ isClicked: 1 });
    } else {
      this.setState({ isClicked: 0 });
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

  submitComment = (e) => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      alert("Please sign in to comment");
    } else {
      const { comment } = this.state;
      const {
        token,
        id: postId,
        user: { name, _id: userId },
      } = this.props;
      const commentData = {
        text: comment,
        owner: name,
        ownerId: userId,
        postId,
      };
      // console.log(commentData)
      axios({
        method: "post",
        url: "http://localhost:5000/api/comment/",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: commentData,
      }).then(response => {
        console.log(response)
        this.setState({ comment: "", isCommentClicked: 0, refreshComponent: true });
      });
    }
  };

  render() {
    const comments = this.state.postComments;
    return (
      <div>
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
            {/* MAP CODE TO LOOP THROUGH COMMENTS */}
            {comments.map((comment) => (
              <CommentTile
                key={"commentTile" + comment._id}
                commentId={comment._id}
                commentOwner={comment.owner}
                text={comment.text}
                ownerId={comment.ownerId}
              />
            ))}
            <input
              type="text"
              className="form-control d-inline w-75"
              name="comment"
              class="comment"
              placeholder="Leave a comment"
              onChange={this.onChange}
            ></input>
            <button type="submit" className="btn" onClick={this.submitComment}>
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </button>
          </span>
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
