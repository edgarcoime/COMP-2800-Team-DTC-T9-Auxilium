import React, { Component } from 'react'
import axios from 'axios'
import { Card, CardBody,CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Header from './../components/Header/Header'
import Select from 'react-select'
import logo from './../images/logo_transparent.png'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            firstname: "",
            lastname: "",
            password: "", 
            password2: "",
            userType: 0, 
            options: [
                {value: 'General', label: 'General'},
                {value: 'Volunteer', label: 'Volunteer'}
            ]
        }
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleName = (event) => {
        this.setState({name: event.target.value})
    }

    handleFirstname = (event) => {
        this.setState({firstname: event.target.value})
    }

    handleLastname = (event) => {
        this.setState({lastname: event.target.value})
    }

    handleUsertype = (event) => {
        if (event.target.value === "General") {
            this.setState({userType: 0});
        } else {
            this.setState({userType: 1});
        }
    }

    handlepassword = (event) => {
        this.setState({password : event.target.value})
    }
    handlepassword2 = (event) => {
        this.setState({password2 : event.target.value})
    }

    checkValidity = () => {
        if (this.state.password != this.state.password2) {
            alert("Passwords do not match !");
            return false;
        } 
    }

    handleSubmit = async (event) => {

        event.preventDefault();


        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const userType = this.state.userType;           
        axios.post('http://localhost:5000/api/users/', { name, email, password, firstname, lastname, userType})
        .then(res => {
            console.log(res.data);
        })
            
        
    }

    render() {
        return (
            <div>
                <Header />
                <Card className="bg-dark shadow">
                    <CardTitle className="text-center p-3">
                        <img src={logo} className="d-block mx-auto  " height="150" width="150" />
                    </CardTitle>
                    <CardBody className="mx-auto w-50">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="name" placeholder="Username" className="form-control mt-4" onChange={this.handleName} required/>
                            <input type="text" name="email" placeholder="Email" className="form-control mt-4" onChange={this.handleEmail} required/>
                            <input type="password" name="password" placeholder="Password" className="form-control mt-4" onChange={this.handlepassword} required/>
                            <input type="password" name="password2" placeholder="Confirm Password" className="form-control mt-4" onChange={this.handlepassword2} required/>
                            <input type="text" name="firstname" placeholder="First name" className="form-control mt-4" onChange={this.handleFirstname} required/>
                            <input type="text" name="lastname" placeholder="Last name" className="form-control mt-4" onChange={this.handleLastname} required/>
                            <select className="form-control mt-4" name="userType" placeholder="Select Type" onChange={this.handleUsertype}>
                                <option>General</option>
                                <option>Volunteer</option>
                            </select>
                            <button type="submit" className="btn btn-success mt-4">Register</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Register;