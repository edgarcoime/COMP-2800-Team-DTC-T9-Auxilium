import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "../LikeComment";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCovid: false
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

  render() {
    const {
      _id,
      owner,
      createdAt,
      title,
      content,
      likes,
      comments,
      isAuthenticated,
    } = this.props;
    return (
      <Fragment>
        <Row key={_id}>
          <Col className="mt-3">
            <Card className="bg- shadow-sm">
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
                <p>{likes.length} likes</p>
                <LikeComment
                  id={_id}
                  comments={comments}
                  isAuthenticated={isAuthenticated}
                  isCovid={ this.state.isCovid }
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
