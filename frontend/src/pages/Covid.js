import React, { Component } from 'react'
import Header from '../components/Header/Header'
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink,CardTitle, CardSubtitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import PostTileCovid from './../components/PostTileCovid'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'


class Covid extends Component {
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
                        <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
                            <Link to="/createpost">
                                <button type="button" className="btn w-100 rounded btn-warning" > Create a Post</button>
                            </Link>
                        </Col>
                    </Row>
                    <PostTileCovid />
                    <PostTileCovid />
                </div>
            </div>
            
        );
    }

}

export default Covid;