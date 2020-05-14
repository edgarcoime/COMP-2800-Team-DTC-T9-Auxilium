import React, { Component } from 'react'
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import LikeComment from "./LikeComment";
import DeleteBtn from './../components/DeleteBtn'
import "bootstrap/dist/css/bootstrap.min.css";
import './component.css'
import "font-awesome/css/font-awesome.min.css";


class CreatedPost extends Component { 
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
    
        return `${createdWhen}`;
      };

    render() {
        return(
            <div>
                <Row>
                    <Col className="mt-3">
                    <Card className="bg-light shadow-sm">
                        <CardTitle className="p-3">
                        <Row>
                            <Col className="col-8 col-sm-10">
                            <p>
                                <strong>{this.props.post.owner}</strong>
                            </p>
                            </Col>
                            {/* {console.log(Date.parse(post.createdAt))} */}
                            <Col className="col-4 col-sm-2">
                            <span className="float-right">
                                {this.postCreated(this.props.post.createdAt)}
                            </span>
                            </Col>
                        </Row>
                        </CardTitle>
                        <CardBody className="pt-0">
                            <h4>{this.props.post.title}</h4>
                            <p>{this.props.post.content}</p>
                            <p>{this.props.post.likes.length} likes</p>
                            <DeleteBtn />
                            <LikeComment />
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div> 
        )
    }
}

export default CreatedPost;