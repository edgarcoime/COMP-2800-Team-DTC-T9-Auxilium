import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import PostTile from './../components/PostTile'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="container">

                    <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
                        <Link to="/" className="mt-4">
                            <button type="button" className="btn btn-menu w-75 rounded btn-success" >Post</button>
                        </Link>
                    </Col>


                </div>
                <Card className="bg-info shadow mx-auto w-75">

                    <CardBody className="mx-auto w-50">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="post_title" placeholder="Post Titile" className="form-control  " />
                            <textarea type="text" name="caption" placeholder="Caption" className="form-control  mt-4" rows ="3"/>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                <label class="form-check-label" for="inlineCheckbox1">Related to COVID-19</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                <label class="form-check-label" for="inlineCheckbox2">Ask for Help</label>
                            </div>
                            <div>
                                    <button type="submit" className="btn btn-success mt-5">Send</button>
                            </div>
                    </form>
                            
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default CreatePost;