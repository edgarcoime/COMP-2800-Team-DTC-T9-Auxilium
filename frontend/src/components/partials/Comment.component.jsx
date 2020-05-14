import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
export class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentOwner: props.ownerId
    }
  }
  submitDeleteComment = (e) => {
    const {isAuthenticated, commentId} = this.props;
    if (!isAuthenticated) {
      alert("Only the comment owenr has the right to delete");
    } else {
      const {text, user, userId, token, postId} = this.props;
      const commentData = {
        text: text,
        owner: user,
        ownerId: userId,
        postId:postId,
      };
      console.log(commentData)

      axios({
        method: "post",
        url: `http://localhost:5000/api/comment/delete/${commentId}`,
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
    const { commentId, commentOwner, text, ownerId, user } = this.props;
    if(commentOwner == user){
      return (
      <div class="comment-tile" id={"comment" + commentId}>
        <button type="submit" className="btn close position-relative" onClick={this.submitDeleteComment}>x</button>
        <p>{`${commentOwner}: ${text}`}</p>
      </div>
    )
      }
      else{
        return (
          <div class="comment-tile" id={"comment" + commentId}>
            <p>{`${commentOwner}: ${text}`}</p>
          </div>
        )
      }
    
  }
}

export default Comment
