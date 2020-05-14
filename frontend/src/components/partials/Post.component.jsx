import React, { Fragment, Component } from "react";
import axios from 'axios'
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "../LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
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

  submitDeleteComment = (e) => {
    const {isAuthenticated, _id} = this.props;
    if (!isAuthenticated) {
      alert("Only the psit owenr has the right to delete");
    } else {
      const {username, userId, token} = this.props;
      const postData = {
        reqOwner: username,
        reqOwnerId: userId,
        postId:_id,
      };
      console.log(postData)
      console.log(token)
      axios({
        method: "delete",
        url: "http://localhost:5000/api/posts",
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
    const removeButton = document.getElementById("post"+_id);
    removeButton.parentNode.removeChild(removeButton);
  };

  render() {
    const { _id, owner, createdAt, title, content, likes, comments, isAuthenticated, username } = this.props;
    // console.log(_id)
    if(username == owner){
    return (
      <div id={"post"+_id}>
      <Fragment>
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
                  {/* {console.log(Date.parse(post.createdAt))} */}
                  <Col className="col-4 col-sm-2">
                  <button type="submit" className="btn close position-relative" onClick={this.submitDeleteComment}>x</button>  
                    <span className="float-right">
                      { this.postCreated(createdAt) }
                    </span>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody className="pt-0">
                <h4>{ title }</h4>
                <p>{ content }</p>
                <p>{ likes.length } likes</p>
                <LikeComment id={ _id } comments={ comments } isAuthenticated={ isAuthenticated }/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
      </div>
    );
  }else{
    return(
    <Fragment>
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
              {/* {console.log(Date.parse(post.createdAt))} */}
              <Col className="col-4 col-sm-2">
              <span className="float-right">
                  { this.postCreated(createdAt) }
                </span>
              </Col>
            </Row>
          </CardTitle>
          <CardBody className="pt-0">
            <h4>{ title }</h4>
            <p>{ content }</p>
            <p>{ likes.length } likes</p>
            <LikeComment id={ _id } comments={ comments } isAuthenticated={ isAuthenticated }/>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Fragment>
    )
  }
}
}
