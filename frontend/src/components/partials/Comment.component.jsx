import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentOwner: props.ownerId
    }
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
  render() {
    const { commentId, commentOwner, text, ownerId, createdAt } = this.props;
    return (
      <div className="mt-4">
        <Row>
          <Col className="col-12">
            <b className="d-inline"><i>{`${commentOwner} : `}</i></b>
            <span>{`${text}`}</span><br />
            <span className="float-right">{this.commentCreated(createdAt)}</span>
          </Col>
          
        </Row>
        <hr className="bg-info"/> 
      </div>
    )
  }
}

export default Comment
