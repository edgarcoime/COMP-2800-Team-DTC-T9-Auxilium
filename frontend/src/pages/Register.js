import React, { Component } from 'react'
import { Card, CardBody,CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import logo from './../images/logo_transparent.png'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Card className="bg-dark shadow">
                    <CardTitle className="text-center p-3">
                        <img src={logo} className="d-block mx-auto  " height="150" width="150" />
                    </CardTitle>
                    <CardBody className="mx-auto w-50">
                        <form>
                            <input type="text" placeholder="Email" className="form-control" />
                            <input type="text" placeholder="First name" className="form-control mt-4" />
                            <input type="text" placeholder="Last name" className="form-control mt-4" />
                            <input type="text" placeholder="Username" className="form-control mt-4" />
                            <input type="password" placeholder="Password" className="form-control mt-4" />
                            <input type="password" placeholder="Confirm Password" className="form-control mt-4" />
                            <button type="submit" className="btn btn-success mt-4">Register</button>
                        </form>
                        
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default Register;