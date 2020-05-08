import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink,CardTitle, CardSubtitle } from 'reactstrap'
import LikeComment from './LikeComment'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

class PostTileCovid extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        }
    }
    whenPosted(createdAt) {
        const created = Date.parse(createdAt);
        let now = Date.now();
        const differenceInMilliSecond = now - created;
        const h = differenceInMilliSecond/1000/60/60;
        console.log(h);
        if (h >= 24) {
            return Math.trunc(h / 24) + 'd ago';
        } else if (h < 1) {
            return Math.trunc(h * 60) + 'm ago';
        }
        return Math.trunc(h) + 'h ago';
    }

    render() {
        return(
            <Row>
                <Col className="mt-5">
                    <Card className="bg-light shadow-sm">
                        <CardTitle className="p-3">
                            <Row>
                                <Col className="col-8 col-sm-10">
                                    <p><strong>somethin</strong></p>
                                </Col>
                                <Col className="col-4 col-sm-2">
                                    <span className="float-right">2h ago</span>
                                </Col>
                            </Row>
                        </CardTitle>
                        <CardBody className="pt-0">
                            <h4>Somethin</h4>
                            <p>Something</p>
                            <p>34 Likes</p>
                            <LikeComment className="d-inline"/>
                            <button className="btn btn-info float-right">Accept</button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default PostTileCovid;