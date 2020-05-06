import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink,CardTitle, CardSubtitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1 } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

class PostTile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Row>
                <Col className="mt-5">
                    <Card className="bg-light shadow-sm">
                        <CardTitle className="p-3">
                            <Row>
                                <Col className="col-8 col-sm-10">
                                    <p><strong>Username</strong></p>
                                </Col>
                                <Col className="col-4 col-sm-2">
                                    <span className="float-right">2h ago</span>
                                </Col>
                            </Row>
                        </CardTitle>
                        <CardBody className="pt-0">
                            <h4>Post Title {this.state.title}</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>34 Likes</p>
                            <div>
                                <span><FontAwesomeIcon icon={faHeart} size="2x"/></span>
                                <span className="ml-3"><FontAwesomeIcon icon={faComment} size="2x" /></span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default PostTile;