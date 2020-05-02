import React, { Component } from 'react'
import Popup from "reactjs-popup";
import Header from './Header/Header'
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink,CardTitle, CardSubtitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1 } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import {Link} from 'react-router-dom'
import Covid from './Covid'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div>   
                <div className="container">
                    <Row>
                        <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
                            <Link to="/" className="mt-4">
                                <button type="button" className="btn btn-menu w-100 rounded btn-warning" > General</button>
                            </Link>
                        </Col>
                        <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
                            <Link to="/covid">
                                <button type="button" className="btn w-100 rounded btn-warning" > COVID-19</button>
                            </Link>
                        </Col>
                    </Row>
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
                                    <h4>Post Title</h4>
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
                </div>
            </div>
            
        );
    }

}

export default Home;