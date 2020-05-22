import React, { Component, Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentOwner: props.ownerId,
    };
  }
  commentCreated = (createdAt) => {
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

    return `${createdWhen}`;
  };
  submitDeleteComment = (e) => {
    const { isAuthenticated, commentId, isCovid } = this.props;
    console.log(commentId);
    if (!isAuthenticated) {
      alert("Only the comment owenr has the right to delete");
    } else {
      const { text, user, userId, token, postId } = this.props;
      const commentData = {
        text: text,
        owner: user,
        ownerId: userId,
        postId: postId,
      };
      console.log(commentData);

      axios({
        method: "post",
        url: isCovid
          ? `http://localhost:5000/api/comment/covid/delete/${commentId}`
          : `http://localhost:5000/api/comment/delete/${commentId}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: commentData,
      }).then((response) => console.log(response));
      this.forceUpdate();
      e.target.value = "";
    }
    const removeButton = document.getElementById("comment" + commentId);
    removeButton.parentNode.removeChild(removeButton);
  };
  render() {
    const { commentId, commentOwner, text, ownerId:commentOwnerId, createdAt } = this.props;
    let userIsTheSame = false;
    if (this.props.isAuthenticated) {
      var { userId, user } = this.props;
      userIsTheSame = commentOwnerId === userId;
    }
    const deleteBtn = (
      <Fragment>
        <button
          type="submit"
          className="btn close"
          onClick={this.submitDeleteComment}
        >
          <FontAwesomeIcon icon={faTrashAlt} size="xs" />
        </button>
      </Fragment>
    );
    return (
      <div className="container">
        <div id={"comment" + commentId}>
          {
            userIsTheSame ? deleteBtn : null
          }
          <p><strong>{`${commentOwner}:`}</strong>{` ${text}`}</p>
          <p className="text-right">{this.commentCreated(createdAt)}</p>
        </div>
        <hr className="bg-info"/>
      </div>
      
    );
  }
}

export default Comment;
