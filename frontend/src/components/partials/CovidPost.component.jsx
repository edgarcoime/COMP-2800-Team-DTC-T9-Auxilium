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
      acceptedBy: this.props.assignedTo,
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

    return `${createdWhen}`;
  };

  // Delete Covid Post functionality by:
  // 1. Sending a request to API to delete Covid Post from Database
  // 2. Visually deletes the CovidPost from the virtual dom
  submitDeleteCovidPost = (e) => {
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

  // Accepting a request for help from a covid post
  // 1. Sending a request to the API to register currently logged in user as accepting request
  // 2. Changing component state to reflect Database change
  // 3. Sending a request to the API to send an email notification to the 
  //    user who created the post that someone has volunteered and CCing the volunteer in the email.
  acceptRequest = async (e) => {
    try {
      // Control structure to prevent unauthorized user to accept post
      const { isAuthenticated, _id: postId } = this.props;
      if (!isAuthenticated) {
        alert("You must be logged in to volunteer to help individuals!");
      } else {
        // Destructuring necessary variables to send request
        const {
          token,
          username: loggedInUsername,
          userId: loggedInUserId,
          userEmail: loggedInUserEmail,
          ownerEmail: postOwnerEmail
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
        console.log(response)

        // Creating email body data to send to server
        const emailData = {
          userEmail:loggedInUserEmail,
          username:loggedInUsername,
          ownerEmail:postOwnerEmail
        }
        
        // Creating Email request
        const sendEmailRequest = await axios({
          method: "post",
          url: "http://localhost:5000/api/email",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": token,
          },
          data: emailData,
        });
        console.log(sendEmailRequest)

        // Setting state to force component re-render
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

  // Rescinds Volunteer request by:
  // 1. Sending a request to the API to delete the user's volunteer status from the DB
  // 2. Visually display change by changing component state of "acceptedBy" to null.
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

  // Handles the logic of whether to display text of who accepted the post or not.
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

  // Handles logic for displaying accept button, rescind button or nothing at all
  acceptRequestButton = () => {
    if (this.state.acceptedBy) {
      if (this.state.acceptedBy._id === this.props.userId) {
        return (
          <Fragment>
            <button
              className="btn btn-warning float-right"
              onClick={this.deleteVolunteerRequest}
            >
              Rescind Request
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
    const {
      _id,
      owner,
      createdAt,
      title,
      content,
      comments,
      isAuthenticated,
      userId,
      ownerId,
    } = this.props;

    const userIsTheSame = userId === ownerId;
    const deleteBtn = (
      <Fragment>
        <button
          type="submit"
          className="btn btn-danger float-right"
          onClick={this.submitDeleteCovidPost}
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
                {userIsTheSame ? deleteBtn : null}
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
