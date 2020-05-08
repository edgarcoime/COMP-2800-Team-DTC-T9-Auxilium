import React, { Component } from 'react'
import Header from './../components/Header/Header'
import { Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
 

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h1 className="text-center">Profile</h1>
                    <Row>
                        <Col className="col-12 col-sm-6">
                            <p className="text-center mt-3">First Name</p>
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <p className="text-center mt-3">last Name</p>
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <p className="text-center mt-3">UserName</p>
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <p className="text-center mt-3  ">Email@gmail.com</p>
                        </Col>
                    </Row>
                    <Row>
                        
                    </Row>
                </div>
            </div>
        );
    }

}

export default User;