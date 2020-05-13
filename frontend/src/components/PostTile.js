import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "./LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

class PostTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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

    return `Created: ${createdWhen}`;
  };

  postUpdated = (updatedAt) => {
    let updatedWhen = "";
    const created = Date.parse(updatedAt);
    let now = Date.now();
    const differenceInMilliSecond = now - created;
    const h = differenceInMilliSecond / 1000 / 60 / 60;
    if (h >= 24) {
      updatedWhen = Math.trunc(h / 24) + "d ago";
    } else if (h < 1) {
      updatedWhen = Math.trunc(h * 60) + "m ago";
    } else {
      updatedWhen = Math.trunc(h) + "h ago";
    }

    return `Updated: ${updatedWhen}`;
  };

  componentDidMount() {
    axios.get("/api/posts/getall").then((res) => {
      const posts = res.data;
      // console.log(posts)
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div>
        {this.state.posts.map((post) => (
          <Row key={post._id}>
            <Col className="mt-5">
              <Card className="bg-light shadow-sm">
                <CardTitle className="p-3">
                  <Row>
                    <Col className="col-8 col-sm-10">
                      <p>
                        <strong>{post.owner}</strong>
                      </p>
                    </Col>
                    {/* {console.log(Date.parse(post.createdAt))} */}
                    <Col className="col-4 col-sm-2">
                      <span className="float-right">
                        {this.postCreated(post.createdAt)}
                      </span>
                      <span className="float-right">
                        {this.postUpdated(post.updatedAt)}
                      </span>
                    </Col>
                  </Row>
                </CardTitle>
                <CardBody className="pt-0">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <p>{post.likes.length} likes</p>
                  <LikeComment id={post.id} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default PostTile;
