import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "../LikeComment";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export class CovidPost extends Component {
  constructor(props) {
    console.log("Constructor runs");
    super(props);

    this.state = {
      isCovid: true,
      acceptedBy: this.props.assignedTo,
    };
  }

  componentDidMount() {
    console.log("component mounting");
  }

  componentDidUpdate() {
    console.log("component updated");
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
      alert("Only the post owner has the right to delete");
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

  acceptRequest = async (e) => {
    try {
      const { isAuthenticated, _id: postId } = this.props;
      if (!isAuthenticated) {
        alert("You must be logged in to volunteer to help individuals!");
      } else {
        // Destructuring necessary variables to send request
        const {
          token,
          username: loggedInUsername,
          userId: loggedInUserId,
          owner: postOwnerName,
          ownerId: postOwnerId,
        } = this.props;

        const postData = {
          reqOwner: loggedInUsername,
          reqOwnerId: loggedInUserId,
          covidPostId: postId,
        };

        // Creating Post request
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/api/covid/acceptrequest",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": token,
          },
          data: postData,
        });

        // Setting state to force component re-render
        console.log(response)
        this.setState({
          acceptedBy: {
            name: loggedInUsername,
            _id: loggedInUserId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteVolunteerRequest = async () => {
    try {
      const { isAuthenticated, _id: postId } = this.props;
      if (!isAuthenticated) {
        alert("You must be logged in to interact with volunteering!");
      } else {
        // Destructuring necessary variables to send request
        const {
          token,
          username: loggedInUsername,
          userId: loggedInUserId,
          owner: postOwnerName,
          ownerId: postOwnerId,
        } = this.props;

        // Forming request data
        const postData = {
          reqOwner: loggedInUsername,
          reqOwnerId: loggedInUserId,
          covidPostId: postId,
        };

        // Creating Post request
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/api/covid/deleterequest",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": token,
          },
          data: postData,
        });

        // Setting state to force component re-render
        console.log(response);
        this.setState({
          acceptedBy: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  acceptedRequestText = () => {
    if (!this.state.acceptedBy) {
      return null;
    } else {
      return (
        <Fragment>
          <Col xs="auto">
            <span>Assigned to {this.state.acceptedBy.name}</span>
          </Col>
        </Fragment>
      );
    }
  };

  acceptRequestButton = () => {
    if (this.state.acceptedBy) {
      // const samePerson = this.state.acceptedBy._id === this.props.userId;
      // console.log(samePerson)
      if (this.state.acceptedBy._id === this.props.userId) {
        return (
          <Fragment>
            <button
              className="btn btn-warning float-right"
              onClick={this.deleteVolunteerRequest}
            >
              Rescind Request
              {/* inside if statement */}
            </button>
          </Fragment>
        );
      }
    } else if (this.props.ownerId !== this.props.userId){
      return (
        <Fragment>
          <button
            className="btn btn-info float-right"
            onClick={this.acceptRequest}
          >
            Accept
          </button>
        </Fragment>
      );
    } else {
      return null
    }
  };

  render() {
    console.log("component rerenders");
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
      ownerId,
      isUserProfilePage
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
    return (
      <div id={"post" + _id}>
        <Row>
          <Col className="mt-5">
            <Card className="bg-light shadow-sm">
              <CardTitle className="p-3">
                <Row>
                  <Col>
                    <p>
                      <strong>{owner}</strong>
                    </p>
                  </Col>
                  {this.acceptedRequestText()}
                  <Col>
                    <span className="float-right">
                      {this.postCreated(createdAt)}
                    </span>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody className="pt-0">
                <h4>{title}</h4>
                <p>{content}</p>
                {userIsTheSame && isUserProfilePage ? deleteBtn : null}
                {/* {!userIsTheSame ? this.acceptRequestButton() : null} */}
                {isAuthenticated ? this.acceptRequestButton() : null}
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
