import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import React, { Component } from 'react'
import tommy from './../images/me.jpg'
import alireza from './../images/alireza.jpg'
import edgar from './../images/edgar.jpg'
import fahad from './../images/fahad.jpg'
import logo from './../images/logo_transparent.png'
import Header from './../components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <h1 class="text-center page-header text-uppercase">About Us</h1>
                <div className="container h-100">
                    <h1 class="text-center page-header text-uppercase">About Us</h1>
                    <Row  className="h-100 justify-content-center align-items-center">
                        <Col className="col-12 col-sm-12  text-center">
                            <img src={logo} className="rounded-circle my-4" height="300" width="300" alt="..."></img>
                        </Col>
                        <Col className="col-12 col-sm  ">
                            <blockquote class ="blockquote text-center">
                                <p class="text-center">
                                We all have to live through this difficult time during the COVID-19 epidemic and many of us have lost our physical connection to our friends and relatives. It is tough being alone or having limited contact with people. We as a team realized this and have channeled our love for coding and technology through our app Auxilium. Our app will help re-establish the connection we all have lost by connecting you with others in a thread/post social media system! We all need to connect, depend and help each other!
                                    <footer class="blockquote-footer text-center">Auxilium</footer>
                                </p>
                            </blockquote>
                        </Col>
                    </Row>
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col className="col-12 col-sm-4 order-1 order-sm-1 text-center">
                            <img src={tommy} className="rounded-circle my-4 " height="200" width="200" alt="..." ></img>

                        </Col>
                        <Col className="col-12 col-sm order-12 order-sm-12">
                            <blockquote class ="blockquote">
                                <p class="text-center">
                                Hi! This is Tommy. I really enjoy working with a team as a program developer. I am also interested in science and technology as well. 
 
                                    <footer class="blockquote-footer text-center">Tommy , Back-end Developer</footer>
                                </p>
                            </blockquote>
                        </Col>
                    </Row>
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col className="col-12 col-sm-4 order-1 order-sm-12 text-center">
                            <img src={fahad} className="rounded-circle my-4" height="200" width="200" alt="..."></img>
                        </Col>
                        <Col className="col-12 col-sm order-12 order-sm-1">
                            <blockquote class ="blockquote text-center">
                                <p class="text-center">
                                    I Am Sayed Fahad, I describe myself as a developer who loves coding, open source, and the web platform.
                                    <footer class="blockquote-footer text-center">Sayed Fahad, Front-end Developer</footer>
                                </p>
                            </blockquote>
                        </Col>
                    </Row>
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col className="col-12 col-sm-4 order-1 order-sm-1 text-center">
                            <img src={alireza} className="rounded-circle my-4" height="200" width="200" alt="..."></img>
                        </Col>
                        <Col className="col-12 col-sm order-12 order-sm-12">
                            <blockquote class ="blockquote text-center">
                                <p class="text-center">
                                This is Alireza. I always try to design everything as simple as possible in order to make everything understandable for everyone. 
                                    <footer class="blockquote-footer text-center">Alireza Kakan, Front-end Developer</footer>
                                </p>
                            </blockquote>
                        </Col>
                    </Row>
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col className="col-12 col-sm-4 order-1 order-sm-12 text-center">
                            <img src={edgar} className="rounded-circle my-4" height="200" width="200" alt="..."></img>
                        </Col>
                        <Col className="col-12 col-sm order-12 order-sm-1">
                            <blockquote class ="blockquote text-center">
                                <p class="text-center">
                                    Hello! My name is Edgar. I'm an up and coming programmer and I’ve always been fascinated with computers, games, and technology in general!
                                    <footer class="blockquote-footer text-center">Edgar, Back-end Developer</footer>
                                </p>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                </div>
        );
    }

}

export default About;