import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "../LikeComment";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export class CovidPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCovid: true,
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

    return `${createdWhen}`;
  };

  submitDeleteComment = (e) => {
    const { isAuthenticated, _id } = this.props;
    if (!isAuthenticated) {
      alert("Only the psit owenr has the right to delete");
    } else {
      const { username, userId, token } = this.props;
      const postData = {
        reqOwner: username,
        reqOwnerId: userId,
        postId: _id,
      };
      axios({
        method: "delete",
        url: "http://localhost:5000/api/covid",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": token,
        },
        data: postData,
      }).then((response) => console.log(response));
      this.forceUpdate();
      e.target.value = "";
    }
    const removeButton = document.getElementById("post" + _id);
    removeButton.parentNode.removeChild(removeButton);
  };

  acceptRequest = (e) => {
    // console.log("Accepted request", e);
    const {
      isAuthenticated,
      _id: postId,
      username: loggedInUsername,
      userId: loggedInUserId,
      owner: postOwnerName,
      ownerId: postOwnerId,
    } = this.props;
    console.log(loggedInUsername, loggedInUserId, postOwnerName, postOwnerId);
  };

  render() {
    const {
      _id,
      owner,
      createdAt,
      title,
      content,
      comments,
      isAuthenticated,
      username,
      userId,
      ownerId
    } = this.props;
    // console.log(this.props.likes)

    const userIsTheSame = userId === ownerId;
    const deleteBtn = (
      <Fragment>
        <button
          type="submit"
          className="btn btn-danger float-right"
          onClick={this.submitDeleteComment}
        >
          Delete
        </button>
      </Fragment>
    );
    const acceptBtn = (
      <Fragment>
        <button
          className="btn btn-info float-right"
          onClick={this.acceptRequest}
        >
          Accept
        </button>
      </Fragment>
    );
    return (
      <div>
        <Row key={_id}>
          <Col className="mt-5">
            <Card className="bg-light shadow-sm">
              <CardTitle className="p-3">
                <Row>
                  <Col className="col-8 col-sm-10">
                    <p>
                      <strong>{owner}</strong>
                    </p>
                  </Col>
                  <Col className="col-4 col-sm-2">
                    <span className="float-right">
                      {this.postCreated(createdAt)}
                    </span>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody className="pt-0">
                <h4>{title}</h4>
                <p>{content}</p>
                {userIsTheSame ? deleteBtn : null}
                {userIsTheSame ? null: acceptBtn }
                <LikeComment
                  id={_id}
                  comments={comments}
                  isAuthenticated={isAuthenticated}
                  isCovid={this.state.isCovid}
                  likes={this.props.likes}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CovidPost;
